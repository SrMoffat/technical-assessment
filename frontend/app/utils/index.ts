import { parse } from 'csv-parse';
import { message } from 'antd';

const BACKEND_SERVER_URL = 'http://localhost:8000/api'

export function capitalizeFirstLetter(value: string) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

export async function parseCsvToJson(fileContent: any) {
    const parsed = await new Promise((resolve, reject) => {
        parse(fileContent, { columns: true, trim: true }, (err, data) => {
            if (err) {
                message.error('Error parsing file!');
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

            console.log("Date Regex", isDateString)

            result = {
                // To Do: Make more robust by checking formating e.g. DD/MM/YYYY vs YYYY/MM/DD or MM/DD/YY
                [newKey]: new Date(entry[key])
            }
        } else {
            const value = entry[key]
            const intOrFloatRegex = /^-?\d{1,3}(,\d{3})*(\.\d+)?$/ // Checks for commas e.g 1,000  // ^-?\d+(\.\d+)?$ 
            const isIntOrFloat = intOrFloatRegex.test(value)

            console.log("Number Regex", isIntOrFloat)

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
    const response = await fetch(BACKEND_SERVER_URL, {
        method: 'POST',
        body: JSON.stringify({ source, target })
    })

    const data = await response.json()

    console.log("python responded with", data)

    return data
}