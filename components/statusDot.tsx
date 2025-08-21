"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

function dotClass(indicator: string) {
    // "none" | "minor" | "major" | "critical" | "maintenance"
    if (indicator === "none") return "bg-emerald-500"
    if (indicator === "maintenance" || indicator === "minor" ) return "bg-amber-500"
}

export default function StatusDot() {
    const [indicator, setIndicator] = useState<string>("none")
    const [desc, setDesc] = useState<string>("Allt fungerar")

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>

        const load = async () => {
            try {
                const res = await fetch("/api/status", { cache: "no-store" })
                const data =await res.json()
                setIndicator(data?.status?.indicator ?? "none")
                setDesc(data?.status?.description ?? "Allt fungerar")
            } catch {
                setIndicator("major")
                setDesc("Kunde inte hämta status")
            }
            timer = setTimeout(load, 60_000)
        }

        load()
    }, [])

    const statusHref: string =
      process.env.NEXT_PUBLIC_STATUSPAGE_SUMMARY_URL?.replace("/api/v2/summary.json", "") ?? "#"

    return (
        <Link href={statusHref} target='_blank' rel='noreferrer' className='flex items-center gap-2 text-xs text-stone-200 hover:text-white' title={desc}>
            <span className={`inline-block size-2 rounded-full ${dotClass(indicator)}`} />
            <span className='hidden sm:inline'></span>
        </Link>
    )
}