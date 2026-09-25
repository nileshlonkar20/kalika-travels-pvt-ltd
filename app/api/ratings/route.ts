import { NextResponse } from "next/server"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"
import { getSupabaseAdminClient, getSupabaseErrorMessage, getSupabasePublicClient } from "@/lib/supabase"

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", ratings: [] }, { status: 401 })
  }

  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("ratings")
      .select("id, name, rating, feedback, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json({ success: true, ratings: data })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch ratings", error: getSupabaseErrorMessage(error), ratings: [] },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, rating, feedback } = await request.json()
    const numericRating = Number(rating)

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ success: false, message: "Choose a rating from 1 to 5 stars." }, { status: 400 })
    }

    const { error } = await getSupabasePublicClient().from("ratings").insert({
      name: name ? String(name).trim().slice(0, 120) : null,
      rating: numericRating,
      feedback: feedback ? String(feedback).trim().slice(0, 1000) : null,
    })

    if (error) throw error
    return NextResponse.json({ success: true, message: "Thank you for your response." })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to save rating", error: getSupabaseErrorMessage(error) },
      { status: 500 },
    )
  }
}