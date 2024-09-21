import cors from "cors";
import { createEdgeRouter } from "next-connect";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from 'csv-parse';
import { normaliseData } from "@/app/utils";

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

        // Step 1: Normalise data i.e lowecase all keys, parse dates into ISO dates
        const normalisedSource = normaliseData(source)
        const normalisedTarget = normaliseData(target)

        console.log("👽 File Here", {
            normalisedSource,
            normalisedTarget
        })
        return {
            success: true,
            message: 'To Do: Implement this endpoint'
        }
    })

export async function POST(request: NextRequest, ctx: RequestContext) {
    try {
        const uploadResult: any = await handlePost.run(request, ctx);
        return NextResponse.json(uploadResult);
    } catch (error: any) {
        // TODO: Better error handling
        console.log("Error here ❌", error)
        return Response.json({ error })
    }
}