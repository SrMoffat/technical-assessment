import cors from "cors";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from 'csv-parse';
import { normaliseData, sendRecordsForReconciliation } from "@/app/utils";

const BACKEND_SERVER_URL = "http://localhost:8000/api"

http://localhost:8000/api/reconcile

interface RequestContext { }

const handlePost = createEdgeRouter<NextRequest, RequestContext>();

handlePost
    .use(async (req, event, next) => {
        cors()
        return await next();
    })
    .post(async (req) => {
        // To Do: make call to DRF upload endpoint
        const data = await req.json()

        const { source, target } = data

        if (!source || !target) {
            return new NextResponse(JSON.stringify({ error: 'Both source and target files are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Normalise data i.e lowecase all keys, parse dates into ISO dates, trim leading and trailing whitespaces
        const normalisedSource = normaliseData(source)
        const normalisedTarget = normaliseData(target)

        return {
            success: true,
            source: normalisedSource,
            target: normalisedTarget,
        }
    })

export async function POST(request: NextRequest, ctx: RequestContext) {
    try {
        const { source, target }: any = await handlePost.run(request, ctx);

        const response = await sendRecordsForReconciliation({
            source,
            target,
        })

        if (response.success) {

            const backendResponse = await fetch(`${BACKEND_SERVER_URL}/reconcile`, {
                method: 'POST',
                body: JSON.stringify({

                })
            })

            const backendData = await backendResponse.json()

            console.log("👽 Python Response 👽", backendData)

            return NextResponse.json({
                message: 'To Do: Send to python backend'
            });
        } else {
            return NextResponse.json({
                message: 'Failed to normalize or validate?'
            });
        }
    } catch (error: any) {
        // TODO: Better error handling
        console.log("Error here ❌", error)
        return Response.json({ error })
    }
}