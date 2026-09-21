import { createHmac, timingSafeEqual } from "node:crypto"

const sessionDurationMs = 8 * 60 * 60 * 1000

export const ownerUsername = process.env.OWNER_USERNAME || ""
export const ownerPassword = process.env.OWNER_PASSWORD || ""

function signature(value: string) {
  const secret = process.env.OWNER_SESSION_SECRET
  if (!secret) throw new Error("OWNER_SESSION_SECRET is not configured")
  return createHmac("sha256", secret).update(value).digest("hex")
}

export function createOwnerSession() {
  const value = `${ownerUsername}:${Date.now()}`
  return `${value}.${signature(value)}`
}

export function isOwnerSessionValid(session: string | undefined) {
  if (!session) return false
  if (!process.env.OWNER_SESSION_SECRET) return false

  const separator = session.lastIndexOf(".")
  if (separator < 1) return false

  const value = session.slice(0, separator)
  const receivedSignature = session.slice(separator + 1)
  const timestamp = Number(value.slice(value.lastIndexOf(":") + 1))
  if (!Number.isFinite(timestamp) || Date.now() - timestamp > sessionDurationMs || Date.now() < timestamp) return false
  const expectedSignature = signature(value)

  if (receivedSignature.length !== expectedSignature.length) return false

  return timingSafeEqual(Buffer.from(receivedSignature), Buffer.from(expectedSignature))
}

export function getOwnerSession(request: Request) {
  const rawSession = request.headers.get("cookie")?.match(/(?:^|;\s*)kalika_owner_session=([^;]+)/)?.[1]
  if (!rawSession) return undefined
  try {
    return decodeURIComponent(rawSession)
  } catch {
    return undefined
  }
}