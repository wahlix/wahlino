import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

export const runtime = "nodejs"        
export const dynamic = "force-dynamic" 

const API_KEY = process.env.STATUSPAGE_API_KEY ?? ""
const PAGE_ID = process.env.STATUSPAGE_PAGE_ID ?? ""
const CLERK_COMPONENT_ID = process.env.STATUSPAGE_COMPONENT_ID_CLERK ?? ""

const DEGRADED_EVENTS = new Set<string>([
    "email.created", 
    "organization.created", 
    "organization.deleted", 
    "organization.updated", 
    "organizationDomain.created",
    "organizationDomain.deleted", 
    "organizationDomain.updated", 
    "organizationInvitation.accepted",
    "organizationInvitation.created", 
    "organizationInvitation.revoked", 
    "organizationMembership.created", 
    "organizationMembership.deleted",
    "organizationMembership.updated", 
    "paymentAttempt.created", 
    "paymentAttempt.updated",
    "permission.created",
    "permission.deleted", 
    "permission.updated",
    "role.created", 
    "role.deleted", 
    "role.updated", 
    "session.created", 
    "session.ended", 
    "session.pending", 
    "session.removed",
    "session.revoked", 
    "sms.created", 
    "subscription.active", 
    "subscription.created", 
    "subscription.past_due", 
    "subscription.updated", 
    "subscriptionItem.abandoned",
    "subscriptionItem.active", 
    "subscriptionItem.canceled", 
    "subscriptionItem.created", 
    "subscriptionItem.ended", 
    "subscriptionItem.incomplete",
    "subscriptionItem.past_due", 
    "subscriptionItem.upcoming",
    "subscriptionItem.updated", 
    "user.created", 
    "user.deleted", 
    "user.updated", 
    "waitlistEntry.created", 
    "waitlistEntry.updated",
])

type ComponentStatus =
   | "operational"
   | "under_maintenance"
   | "degraded_performance"
   | "partial_outage"
   | "major_outage"

async function updateComponentStatus(componentId: string, status: ComponentStatus) {
  if (!API_KEY || !PAGE_ID) throw new Error("Missing STATUSPAGE_API_KEY or STATUSPAGE_PAGE_ID")
  const url = `https://api.statuspage.io/v1/pages/${PAGE_ID}/components/${componentId}.json`
  const payload = { component: { status } }

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `OAuth ${API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Statuspage component update failed ${res.status}: ${text}`)
  }
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: "Missing CLERK_WEBHOOK_SECRET" }, { status: 500 })

  const id = req.headers.get("svix-id")
  const ts = req.headers.get("svix-timestamp")
  const sig = req.headers.get("svix-signature")
  if (!id || !ts || !sig) return NextResponse.json({ error: "Missing Svix headers" }, { status: 400 })

  const raw = await req.text()
  let event: any
  try {
    event = new Webhook(secret).verify(raw, { "svix-id": id, "svix-timestamp": ts, "svix-signature": sig })
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const type: string = event?.type ?? "unknown"
  const status: ComponentStatus = DEGRADED_EVENTS.has(type) ? "degraded_performance" : "operational"

  try {
    if (CLERK_COMPONENT_ID) {
      await updateComponentStatus(CLERK_COMPONENT_ID, status)
    }
  } catch (e: any) {
    console.error("Statuspage update error:", e?.message ?? e)
  }

  return NextResponse.json({ ok: true })
}
