"use client"
import { CustomTransfer } from '@/app/components/shared/atoms';
import { FileUploader, NavigationTabs } from '@/app/components/specific/dashboard';
import { useReconciliationContext } from '@/app/providers/ReconciliationProvider';
import { getFileHeaders, mergeDataWithReconciliationResults, parseFiles, validateHeaders } from '@/app/utils';
import { WarningFilled, InfoCircleFilled } from "@ant-design/icons";
import { Alert, Flex, Spin, Tooltip, Tag, message, theme } from 'antd';
import { useEffect, useState } from 'react';


message.config({
    maxCount: 1,
    duration: 8
})

export default function Dashboard() {
    const { token: {
        colorError,
        colorInfo
    } } = theme.useToken()

    const [sourceFile, setSourceFile] = useState<any>()
    const [targetFile, setTargetFile] = useState<any>()
    const [tableColumns, setTableColumns] = useState<any[]>([
        {
            dataIndex: 'id',
            title: 'ID',
        },
        {
            dataIndex: 'name',
            title: 'Name',
        },
        {
            dataIndex: 'date',
            title: 'Date',
        },
        {
            dataIndex: 'amount',
            title: 'Amount',
            render: (amount: string) => (

                <Tag style={{ marginInlineEnd: 0, }} color="cyan">
                    {amount}
                </Tag>
            ),
        },
        {
            dataIndex: 'isMissing',
            title: '',
            render: (isMissing: boolean) => {
                return isMissing
                    ? (
                        <Tooltip title="This entry is not found in the other records" color={colorError} key="isMissing">
                            <WarningFilled style={{ color: colorError }} />
                        </Tooltip>
                    )
                    : undefined
            }
        },
        {
            dataIndex: 'hasDiscrepancy',
            title: '',
            render: (hasDiscrepancy: boolean) => {
                return hasDiscrepancy
                    ? (
                        <Tooltip title="There is data mismatch on this entry." color={colorInfo} key="hasDiscrepancy">
                            <InfoCircleFilled style={{ color: colorInfo }} />
                        </Tooltip>
                    )
                    : undefined
            }
        },
    ])
    const [sourceRenderData, setSourceRenderData] = useState<any>([])
    const [isReconciling, setIsReconcilling] = useState<boolean>(false)
    const [disableFileInputs, setDisableFileInputs] = useState<boolean>(false)

    const {
        leftColumnData,
        rightColumnData,
        dataColumnLabels,
        setLeftColumnData,
        setRightColumnData,
        setDataColumnLabels,
        reconciliationDetails,
        reconciliationResults,
        setReconciliationDetails,
        setReconciliationResults,
    } = useReconciliationContext()

    const handleSourceFile = async (details: any) => {
        try {
            const file = details?.file

            setSourceFile(file)
            const fileStatus = file?.status

            console.log("aaafileStatus", fileStatus)


        } catch (error: any) {
            console.log("Error Uploading file source", error)

        }
    }

    const handleTargetFile = async (details: any) => {
        try {
            const file = details?.file
            const fileStatus = file?.status

            setTargetFile(file)
            console.log("ddddfileStatus", fileStatus)


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

            // Get file headers/columns
            const { sourceColumns, targetColumns } = getFileHeaders({
                source: sourceFileContent,
                target: targetFileContent
            })

            // Validate headers (are same and have ID)
            const hasValidHeaders = validateHeaders({
                source: sourceColumns,
                target: targetColumns
            })

            if (hasValidHeaders) {
                // Use source since we know it matches target at this point
                setDataColumnLabels?.(sourceColumns)

                const {
                    source: parsedSource,
                    target: parsedTarget
                } = await parseFiles({
                    source: sourceFileContent,
                    target: targetFileContent
                })

                const details = {
                    source: {
                        fileName: sourceFile?.name,
                        data: parsedSource
                    },
                    target: {
                        fileName: targetFile?.name,
                        data: parsedTarget
                    }
                }

                setReconciliationDetails?.(details)

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: JSON.stringify(details)
                })

                const data = await response.json()

                setReconciliationResults?.(data)
                setIsReconcilling(false)
                setDisableFileInputs(true)
            }

        } catch (error: any) {
            console.error("Hanldle error here", error)
            message.error(error?.message)
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

    useEffect(() => {
        let results: any[] = []

        if (reconciliationDetails) {
            const source = reconciliationDetails?.source
            const target = reconciliationDetails?.target

            const sourceData = source?.data
            const targetData = target?.data

            const missing_in_source = reconciliationResults?.missing_in_source
            const missing_in_target = reconciliationResults?.missing_in_target
            const discrepancies = reconciliationResults?.discrepancies

            if (sourceData) {
                const sourceEntries = mergeDataWithReconciliationResults(sourceData, missing_in_target, discrepancies, "source")
                results.push(sourceEntries)
            }

            if (targetData) {
                const targetEntries = mergeDataWithReconciliationResults(targetData, missing_in_source, discrepancies, "target")
                results.push(targetEntries)
            }
        }

        const reconciledData = results.flat()

        // setTableColumns(tableHeaders)

        setLeftColumnData?.(results[0])
        setRightColumnData?.(results[1])
        setSourceRenderData?.(reconciledData)
    }, [reconciliationResults])

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
                    disable={disableFileInputs}
                    title="Source Records"
                    onChange={handleSourceFile}
                    ctaText="Click or drag file to this area to upload"
                    ctaDescription="Upload your source records file."
                />
                <FileUploader
                    disable={disableFileInputs}
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
                            showSelectAll={false}
                            headers={tableColumns}
                            dataSource={sourceRenderData}
                            rightColumns={rightColumnData}
                            leftColumns={leftColumnData}
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
