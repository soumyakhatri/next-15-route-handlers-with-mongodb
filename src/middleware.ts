import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest){
    console.log("========request.url", request.url)
    console.log("========request.nextUrl", request.nextUrl)
}