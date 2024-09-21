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
        const data = req.body
        console.log("Request Body", req.body)
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
        return Response.json({ error })
    }
}