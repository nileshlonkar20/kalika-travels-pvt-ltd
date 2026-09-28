import { NextResponse } from "next/server"
import { getSupabaseAdminClient, getSupabaseErrorMessage } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("ratings")
      .select("id, name, rating, feedback, created_at")
      .neq("feedback", "No written feedback")
      .order("created_at", { ascending: false })
      .limit(6)

    if (error) throw error
    return NextResponse.json({ success: true, ratings: data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch customer reviews", error: getSupabaseErrorMessage(error), ratings: [] },
      { status: 500 },
    )
  }
}