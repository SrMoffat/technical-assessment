"use client"
import { CustomTransfer } from '@/app/components/shared/atoms';
import { FileUploader, NavigationTabs } from '@/app/components/specific/dashboard';
import { ProfileForm } from '@/app/components/specific/profile';
import { PAGES, useNavigationContext } from '@/app/providers/NavigationProvider';
import { Alert, Avatar, Button, Flex, Layout, Typography, Spin, message } from 'antd';
import { useState, useEffect } from 'react';
import { parse } from 'csv-parse';
import { parseCsvToJson } from '../utils';

const { Content } = Layout;

function ProfileDetails() {
    return (
        <Flex className="flex-col gap-2">
            <Flex className="flex-col">
                <Typography.Text>Profile Avatar</Typography.Text>
                <Flex className="items-center gap-4">
                    <Avatar style={{ width: 60, height: 60 }}>
                        A
                    </Avatar>
                    <Button>Change Avatar</Button>
                </Flex>
            </Flex>
            <Flex className="w-full">
                <ProfileForm />
            </Flex>
        </Flex>
    )
}

function Dashboard() {
    const [sourceFile, setSourceFile] = useState<any>()
    const [targetFile, setTargetFile] = useState<any>()
    const [isReconciling, setIsReconcilling] = useState<boolean>(false)

    const [sourceData, setSourceData] = useState<any[]>([])
    const [targetData, setTargetData] = useState<any[]>([])


    const handleSourceFile = async (details: any) => {
        try {
            const file = details?.file

            setSourceFile(file)
            const fileStatus = file?.status

        } catch (error: any) {
            console.log("Error Uploading file source", error)

        }
    }
    const handleTargetFile = async (details: any) => {
        try {
            const file = details?.file
            const fileStatus = file?.status

            setTargetFile(file)

        } catch (error: any) {
            console.log("Error Uploading file target", error)

        }
    }

    const checkHeadersMatch = ({ source, target }: { source: any; target: any }) => {
        const normalisedSourceColumns = source.map((entry: any) => entry?.toLowerCase()).slice().sort()
        const normalisedTargetColumns = target.map((entry: any) => entry?.toLowerCase()).slice().sort()

        const sameLength = source.length === target.length
        const sameContent = normalisedSourceColumns.every((key: any) => normalisedTargetColumns.includes(key));

        return {
            result: sameContent && sameLength,
            sameContent,
            sameLength
        }
    }

    const checkFilesHaveIdColumn = ({ source, target }: { source: any; target: any }) => {
        const sourceHasId = source?.find((entry: any) => entry.toLowerCase() === 'id')
        const targetHasId = target?.find((entry: any) => entry.toLowerCase() === 'id')

        const hasIds = sourceHasId && targetHasId

        return {
            result: hasIds,
            sourceHasId,
            targetHasId
        }
    }

    const getFileHeaders = ({ source, target }: { source: any; target: any }) => {
        const sourceSegments = source?.split("\n")
        const targetSegments = target?.split("\n")

        const sourceHeaders = sourceSegments[0]
        const targetHeaders = targetSegments[0]

        const sourceColumns = sourceHeaders?.split(",")
        const targetColumns = targetHeaders?.split(",")

        return {
            sourceColumns,
            targetColumns
        }
    }

    const sendFiles = async ({ target, source }: { target: any; source: any }) => {
        try {
            const sourceFile = source.originFileObj
            const targetFile = target.originFileObj

            const sourceFileContent = await sourceFile.text()
            const targetFileContent = await targetFile.text()

            // Get file headers/columns
            const { sourceColumns, targetColumns } = getFileHeaders({
                source: sourceFileContent,
                target: targetFileContent
            })

            // Validate each file has an ID column
            const { result: hasIds, sourceHasId, targetHasId } = checkFilesHaveIdColumn({
                source: sourceColumns,
                target: targetColumns
            })

            // Validate each file has similar headers/columns
            if (hasIds) {
                console.log("📭 IDs Included 📭", {
                    sourceHasId,
                    targetHasId
                })

                // Check if columns match
                const { result: headersMatch, sameContent, sameLength } = checkHeadersMatch({
                    source: sourceColumns,
                    target: targetColumns
                })

                if (headersMatch){
                    // Process the files i.e. send them to Next backend to sent to DRF backend
                    const parsedSource = await parseCsvToJson(sourceFileContent)
                    const parsedTarget = await parseCsvToJson(targetFileContent)


                    // Ensure both source and target have the same kind of data i.e. same columns

                    const details = {
                        source: parsedSource,
                        target: parsedTarget
                    }

                    const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: JSON.stringify(details)
                    })

                    const data = await response.json()

                    console.log("✅ Detials Here ✅", {
                        data
                    })
                } else {
                    // Throw an error: Columns do not match maybe ignore some of them? Show differences?
                    message.error('Mismatched columns! Records have irreconcilable data sets.')

                }
            } else {
                // Throw an error: One or both files is missing an ID column and we rely on that as a unique identifier
                const onlySourceHasId = sourceHasId && !targetHasId
                const onlyTargetHasId = targetHasId && !sourceHasId

                console.log("Files are different so fail validation", {
                    hasIds,
                    onlySourceHasId,
                    onlyTargetHasId,
                    sourceHasId,
                    targetHasId
                })
                message.error('Uploaded records missing a required column "ID"')
            }
        } catch (error: any) {
            console.error("Hanldle error here", error)
        }
    }


    useEffect(() => {
        if (sourceFile && targetFile) {
            setIsReconcilling(true)

            sendFiles({
                source: sourceFile,
                target: targetFile
            })
        }
    }, [sourceFile, targetFile])


    const sourceEmpty = !Boolean(sourceData?.length)
    const targetEmpty = !Boolean(targetData?.length)

    const title = !sourceFile && targetFile
        ? "Upload Source Records"
        : !targetFile && sourceFile
            ? "Upload Target Records"
            : "Upload Records"
    const description = !sourceFile && targetFile
        ? "Kindly upload source records to start the reconciliation process."
        : !targetFile && sourceFile
            ? "Kindly upload target records to start the reconciliation process."
            : "Kindly upload source and target records to start the reconciliation process."

    const hasData = sourceFile && targetFile //!sourceEmpty && !targetEmpty
    return (
        <Flex className="flex-col">
            <NavigationTabs />
            <Flex className="justify-between mt-6 gap-6">
                <FileUploader
                    title="Source Records"
                    onChange={handleSourceFile}
                    ctaText="Click or drag file to this area to upload"
                    ctaDescription="Upload your source records file."
                />
                <FileUploader
                    title="Target Records"
                    onChange={handleTargetFile}
                    ctaText="Click or drag file to this area to upload"
                    ctaDescription="Upload your target records file."
                />
            </Flex>
            {hasData ? (
                <Spin spinning={isReconciling} tip="Reconciling records ...">
                    <Flex className="mt-6">
                        <CustomTransfer
                            showSearch
                            data={[]}
                            showSelectAll={false}
                        />
                    </Flex>
                </Spin>
            ) : <Flex className="justify-center mt-6">
                <Alert
                    message={title}
                    description={description}
                    type="info"
                    showIcon
                />
            </Flex>}
        </Flex>
    )
}

export default function ReconcilePage() {
    const { current } = useNavigationContext()

    const isDashboard = current === PAGES.DASHBOARD
    const isProfile = current === PAGES.PROFILE

    return (
        <Content>
            {isDashboard && (
                <Dashboard />
            )}
            {isProfile && (
                <ProfileDetails />
            )}
        </Content>
    )
}
