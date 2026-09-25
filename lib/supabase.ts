import { createClient } from "@supabase/supabase-js"

export function getSupabaseErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message)
  }
  return "Unknown error"
}

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  return url
}

export function getSupabasePublicClient() {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!anonKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY")
  return createClient(getSupabaseUrl(), anonKey)
}

export function getSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
  return createClient(getSupabaseUrl(), serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}