import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        // const headers = new Headers(request.headers)
        // const authorization = headers.get("Authorization")
        const headersList = await headers()
        const authorization = headersList.get("authorization")
        console.log("=============authorization", authorization)

        // const theme = request.cookies.get("theme")
        const cookieList = await cookies()
        const theme = cookieList.get("theme")
        // cookieList.set("itemsPerPage", "20")
        console.log("theme========", theme)

        const data = "<h)1> Profile Page </h1>"

        return new NextResponse(data, {
            headers: {
                "Content-Type": "text/html" ,
                "Set-Cookie": "theme=dark, color=orange"
            }, 
        })
    } catch (error) {

        return NextResponse.json({
            error: error instanceof Error ? error.message : error
        })
    }
}
