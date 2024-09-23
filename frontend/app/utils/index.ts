import { parse } from 'csv-parse';
import { message } from 'antd';

const BACKEND_SERVER_URL = 'http://localhost:8000/api'

export function capitalizeFirstLetter(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

export async function parseCsvToJson(fileContent: any) {
    const sanitisedData = fileContent
        .split("\n")
        .filter((n: string) => n)
        .join("\n")

    const parsed = await new Promise((resolve, reject) => {
        parse(sanitisedData, { columns: true, trim: true }, (err, data) => {
            if (err) {
                message.error({
                    content: 'Error parsing file!',
                    duration: 8
                });
                return reject(err);
            }
            resolve(data);
        });
    });

    return parsed
}

export function lowerCaseKeysAndIsoDates(entry: any) {
    let newObj = {}

    const keys = Object.keys(entry)

    for (const key of keys) {
        let result = {}
        const newKey = key.toLowerCase()
        const isDate = newKey?.includes('date')
        if (isDate) {
            const value = entry[key]
            const dateRegex = /^(0[1-9]|1[0-2])[\/\-\.\s](0[1-9]|[12][0-9]|3[01])[\/\-\.\s](\d{2}|\d{4})$/

            const isDateString = dateRegex.test(value)

            result = {
                // To Do: Make more robust by checking formating e.g. DD/MM/YYYY vs YYYY/MM/DD or MM/DD/YY
                [newKey]: new Date(entry[key])
            }
        } else {
            const value = entry[key]
            const intOrFloatRegex = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/ // Checks for commas e.g 1,000  // ^-?\d+(\.\d+)?$ 
            const isIntOrFloat = intOrFloatRegex.test(value)

            result = {
                // Also trim white spaces
                [newKey]: `${entry[key]}`.trim().toLowerCase()
            }
        }

        newObj = {
            ...newObj,
            ...result
        }
    }
    return newObj
}

export function normaliseData(entries: any) {
    const results = []

    for (const entry of entries) {
        const result = lowerCaseKeysAndIsoDates(entry)
        results.push(result)
    }

    return results
}

export async function sendRecordsForReconciliation({ source, target }: { source: any; target: any }) {
    const response = await fetch(`${BACKEND_SERVER_URL}/reconcile`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source, target })
    })

    const data = await response.json()

    return data
}

export async function parseFiles({ source, target }: { source: any; target: any }) {
    const parsedSource = await parseCsvToJson(source)
    const parsedTarget = await parseCsvToJson(target)
    return {
        source: parsedSource,
        target: parsedTarget
    }
}

export function checkHeadersMatch({ source, target }: { source: any; target: any }) {
    try {
        const normalisedSourceColumns = source.map((entry: any) => entry?.toLowerCase()).slice().sort()
        const normalisedTargetColumns = target.map((entry: any) => entry?.toLowerCase()).slice().sort()

        const sameLength = normalisedSourceColumns.length === normalisedTargetColumns.length

        if (!sameLength) {
            const message = `Source file has ${normalisedSourceColumns.length} columns but Target file has ${normalisedTargetColumns.length} columns.`
            throw new Error(message)
        }
        const sameContent = normalisedSourceColumns.every((key: any) => normalisedTargetColumns.includes(key));

        if (!sameContent) {
            const message = 'Source columns and Target columns are irreconcilable.'
            throw new Error(message)
        }

        return true
    } catch (error: any) {
        message.error({
            content: error?.message,
        })
    }
}

export function checkFilesHaveIdColumn({ source, target }: { source: any; target: any }) {
    try {
        const searchField = 'id'

        const sourceHasId = source?.find((entry: any) => entry.toLowerCase() === searchField)
        const targetHasId = target?.find((entry: any) => entry.toLowerCase() === searchField)

        const hasIds = sourceHasId && targetHasId

        if (!hasIds) {
            const type = sourceHasId
                ? 'target'
                : targetHasId
                    ? 'source'
                    : 'uploaded'
            const errorMessage = `No "ID" column found in ${type} records`
            throw new Error(errorMessage)
        }
        return hasIds
    } catch (error: any) {
        message.error({
            content: error?.message,
        })
    }
}

export function getFileHeaders({ source, target }: { source: any; target: any }) {
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

export function validateHeaders({ source, target }: { source: any; target: any }) {
    // Validate each file has an ID column
    const hasIds = checkFilesHaveIdColumn({
        source,
        target
    })

    if (hasIds) {
        // Validate each file has similar headers/columns
        const columnsAreValid = checkHeadersMatch({
            source,
            target
        })

        return columnsAreValid
    }

    return false
}

export function mergeDataWithReconciliationResults(data: any, missing_in_target: any, discrepancies: any, type: string) {
    let results = []

    for (const entry of data) {
        const id = entry?.ID
        const isMissing = missing_in_target?.includes(id)

        let sourceResult = {}

        for (const discrepancy of discrepancies) {
            const rowId = discrepancy?.[0]
            const rowHeader = discrepancy?.[1]
            const sourceData = discrepancy?.[2]
            const targetData = discrepancy?.[3]

            const hasDiscrepancy = rowId === id

            sourceResult = {
                key: `${id}-${type}`,
                id: id,
                name: entry?.Name,
                amount: entry?.Amount,
                date: entry?.Date,
                isMissing,
                type,
                hasDiscrepancy,
            }

            if (hasDiscrepancy) {
                sourceResult = {
                    ...sourceResult,
                    discrepancy: {
                        rowHeader,
                        sourceData,
                        targetData
                    }
                }
            }

            results.push(sourceResult)
        }
    }
    return results

}

