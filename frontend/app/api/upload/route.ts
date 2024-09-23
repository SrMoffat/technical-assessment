import { normaliseData, sendRecordsForReconciliation } from "@/app/utils";
import cors from "cors";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface RequestContext { }

const handlePost = createEdgeRouter<NextRequest, RequestContext>();

handlePost
    .use(async (req, event, next) => {
        cors()
        return await next();
    })
    .post(async (req) => {
        // To Do: make call to DRF upload endpoint
        const { source, target } = await req.json()

        if (!source || !target) {
            return new NextResponse(JSON.stringify({ error: 'Both source and target files are required.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Normalise data i.e lowecase all keys, parse dates into ISO dates, trim leading and trailing whitespaces
        const normalisedSource = normaliseData(source?.data)
        const normalisedTarget = normaliseData(target?.data)

        return {
            success: true,
            source: {
                ...source,
                data: normalisedSource
            },
            target: {
                ...target,
                data: normalisedTarget
            },
        }
    })

export async function POST(request: NextRequest, ctx: RequestContext) {
    try {
        const { source, target }: any = await handlePost.run(request, ctx);

        const response = await sendRecordsForReconciliation({
            source,
            target,
        })

        const data = response.results

        return Response.json(data)
    } catch (error: any) {
        // TODO: Better error handling
        console.log("Error here ❌", error)
        return Response.json({ error })
    }
}