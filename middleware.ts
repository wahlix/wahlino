import {clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher([
    "/",
    "/status(.*)",
    "/api/webhooks/clerk",
    "/sign-in(.*)",
    "/sign-up(.*)",
])

export default clerkMiddleware((auth, req) => {
    if(!isPublic(req)) auth.protect()
})

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
}