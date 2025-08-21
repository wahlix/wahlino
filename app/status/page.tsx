import { redirect } from 'next/navigation'

export default function StatusPage() {
    redirect(process.env.NEXT_PUBLIC_STATUSPAGE_URL || "/")
}