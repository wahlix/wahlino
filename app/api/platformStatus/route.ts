import { NextResponse } from 'next/server'

export const runtime = "edge"
export const revalidate = 60

export async function GET() {
    const url = process.env.NEXT_PUBLIC_STATUSPAGE_SUMMARY_URL
    if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 500 })
    
    const r = await fetch(url, { next: { revalidate } })
    if (!r.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 })
    
    const data = await r.json()
    return NextResponse.json(data)
}