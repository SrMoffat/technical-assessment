import { parse } from 'csv-parse';
import { message } from 'antd';

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
            result = {
                [newKey]: new Date(entry[key])
            }
        } else {
            result = {
                [newKey]: entry[key]
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