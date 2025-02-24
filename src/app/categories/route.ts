import { NextResponse } from "next/server";

export const dynamic = "force-static"

export function GET(){
    const categories = [
        {"Rekha": "Hema"},
        {"Jaya": "Sushma"}
    ]
    return NextResponse.json(categories)
}