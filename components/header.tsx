'use client'

import Link from "next/link"
import Image from 'next/image'

import StatusDot from "@/components/statusDot"

export default function Header() {
    return (
        <header className="w-full">
            <div className="flex items-center justify-between px-6 py-3 shadow bg-[#3a3829]">
                {/* Logotyp - hem */}
                <Link href={"/"} className="flex items-center gap-2">
                    <Image 
                        src={"/wahlino-logo.png"}
                        alt="Wahlino"
                        width={140}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Enkel nav - fylls på senare */}
                <nav className="hidden sm:flex items-center gap-6 text-stone-100 text-sm">
                    <Link href={"/blackjack"}>Blackjack</Link>
                    <Link href={"/status"}>Status</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <StatusDot />
                </div>
            </div>
        </header>
    )
}