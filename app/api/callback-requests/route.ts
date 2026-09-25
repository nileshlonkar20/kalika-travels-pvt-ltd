import { NextResponse } from "next/server"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"
import { getSupabaseAdminClient, getSupabasePublicClient } from "@/lib/supabase"

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  if (typeof error === "object" && error !== null && "message" in error) {
    return String(error.message)
  }
  return "Unknown error"
}

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", callbackRequests: [] }, { status: 401 })
  }

  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("enquiries")
      .select("id, name, phone, vehicle, travel_date, passengers, destination, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    const rows = data.map((enquiry) => ({
      id: enquiry.id,
      name: enquiry.name,
      phone: enquiry.phone,
      trip: enquiry.vehicle,
      travelDate: enquiry.travel_date,
      passengers: enquiry.passengers,
      destination: enquiry.destination,
      source: "callback",
      createdAt: enquiry.created_at,
    }))

    return NextResponse.json({ success: true, callbackRequests: rows })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch callback requests",
        error: getErrorMessage(error),
        callbackRequests: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, trip, travelDate, destination, passengers } = await request.json()

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "Name and phone are required." }, { status: 400 })
    }

    const normalizedPhone = String(phone).replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    const { error } = await getSupabasePublicClient().from("enquiries").insert({
      name,
      phone,
      vehicle: trip || null,
      travel_date: travelDate || null,
      destination: destination || null,
      passengers: passengers ? Number(passengers) : null,
    })

    if (error) throw error

    return NextResponse.json({ success: true, message: "Callback request saved successfully." })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to save callback request",
        error: getErrorMessage(error),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    const requestId = Number(id)
    if (!Number.isSafeInteger(requestId) || requestId < 1) {
      return NextResponse.json({ success: false, message: "A valid request id is required." }, { status: 400 })
    }

    const { error, count } = await getSupabaseAdminClient()
      .from("enquiries")
      .delete({ count: "exact" })
      .eq("id", requestId)

    if (error) throw error
    return NextResponse.json({ success: count === 1, affectedRows: count || 0 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete callback request", error: getErrorMessage(error) },
      { status: 500 },
    )
  }
}
