import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 10;
export async function GET(){
    return   new NextResponse(new Date().toLocaleTimeString())
}