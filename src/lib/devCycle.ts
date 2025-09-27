import { setupDevCycle } from '@devcycle/nextjs-sdk/server'

// TODO: Dummy user detektering - implementera Clerk senare
const getUserIdentity = async () => {
    return {
        user_id: "anonymous",
    }
}

// Säkra så env-nycklar finns så inget runtime-error erhålls
const serverSDKKey = process.env.DEVCYCLE_SERVER_SDK_KEY ?? ''
const clientSDKKey = process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? ''
const mobileSDKKey = process.env.DEVCYCLE_MOBILE_SDK_KEY ?? ''


if (!serverSDKKey) {
    console.warn("DevCycle: Saknar serverSDKKey! Lägg till DEVCYCLE_SERVER_SDK_KEY i env-vars.")
}

if (!clientSDKKey) {
    console.warn("DevCycle: Saknar clientSDKKey! Lägg till NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY i env-vars.")
}

if (!mobileSDKKey) {
    console.warn("DevCycle: Saknar mobileSDKKey! Lägg till DEVCYCLE_MOBILE_SDK_KEY i env-vars.")
}


export const { getVariableValue, getClientContext, getAllVariables, getAllFeatures } = setupDevCycle({
    serverSDKKey,
    clientSDKKey,
    userGetter: getUserIdentity,
})