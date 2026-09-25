import { NextResponse } from "next/server"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"
import { getSupabaseAdminClient, getSupabaseErrorMessage, getSupabasePublicClient } from "@/lib/supabase"

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", messages: [] }, { status: 401 })
  }

  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("enquiries")
      .select("id, name, phone, email, message, vehicle, travel_date, destination, passengers, source, created_at")
      .eq("source", "message")
      .order("created_at", { ascending: false })

    if (error) throw error

    const messages = data.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      message: item.message,
      trip: item.vehicle,
      travelDate: item.travel_date,
      destination: item.destination,
      passengers: item.passengers,
      source: item.source,
      createdAt: item.created_at,
    }))

    return NextResponse.json({ success: true, messages })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch messages", error: getSupabaseErrorMessage(error), messages: [] },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, email, message, trip, travelDate, destination, passengers } = await request.json()

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 })
    }

    const normalizedPhone = String(phone).replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    const { error } = await getSupabasePublicClient().from("enquiries").insert({
      name,
      phone,
      email,
      message,
      vehicle: trip || null,
      travel_date: travelDate || null,
      destination: destination || null,
      passengers: passengers ? Number(passengers) : null,
      source: "message",
    })

    if (error) throw error
    return NextResponse.json({ success: true, message: "Message saved successfully." })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to save message", error: getSupabaseErrorMessage(error) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const messageId = Number(id)
    if (!Number.isSafeInteger(messageId) || messageId < 1) {
      return NextResponse.json({ success: false, message: "A valid message id is required." }, { status: 400 })
    }

    const { error, count } = await getSupabaseAdminClient()
      .from("enquiries")
      .delete({ count: "exact" })
      .eq("id", messageId)
      .eq("source", "message")

    if (error) throw error
    return NextResponse.json({ success: count === 1, affectedRows: count || 0 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete message", error: getSupabaseErrorMessage(error) },
      { status: 500 },
    )
  }
}