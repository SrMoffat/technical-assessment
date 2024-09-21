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

    const sendFiles = async ({ target, source }: { target: any; source: any }) => {
        try {
            const sourceFile = source.originFileObj
            const targetFile = target.originFileObj

            const sourceFileContent = await sourceFile.text()
            const targetFileContent = await targetFile.text()

            const parsedSource = await parseCsvToJson(sourceFileContent)
            const parsedTarget = await parseCsvToJson(targetFileContent)

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
