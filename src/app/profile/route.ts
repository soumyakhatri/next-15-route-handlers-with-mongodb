import { NextResponse } from "next/server"

export async function GET() {
    try {
        const data = "<h1> Profile Page </h1>"
        return new NextResponse(data, {
            headers: {
                "Content-Type": "text/html" 
            }
        })
    } catch (error) {

        return NextResponse.json({
            error: error instanceof Error ? error.message : error
        })
    }
}
