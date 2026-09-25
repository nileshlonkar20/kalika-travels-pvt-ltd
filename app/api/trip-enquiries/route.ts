import { NextResponse } from "next/server"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"
import { getSupabaseAdminClient, getSupabaseErrorMessage, getSupabasePublicClient } from "@/lib/supabase"

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", tripEnquiries: [] }, { status: 401 })
  }

  try {
    const { data, error } = await getSupabaseAdminClient()
      .from("trip_quotes")
      .select("id, name, phone, vehicle, from_location, to_location, travel_date, passengers, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    const tripEnquiries = data.map((item) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      vehicle: item.vehicle,
      fromLocation: item.from_location,
      toLocation: item.to_location,
      travelDate: item.travel_date,
      passengers: item.passengers,
      createdAt: item.created_at,
    }))

    return NextResponse.json({ success: true, tripEnquiries })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch trip enquiries", tripEnquiries: [], error: getSupabaseErrorMessage(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, phone, vehicle, fromLocation, toLocation, travelDate, passengers } = await request.json()
    const normalizedPhone = String(phone || "").replace(/\D/g, "")

    if (!name || !phone || !vehicle || !fromLocation || !toLocation || !travelDate || !passengers) {
      return NextResponse.json(
        { success: false, message: "Name, phone, vehicle, route, travel date and passengers are required." },
        { status: 400 },
      )
    }
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    const { error } = await getSupabasePublicClient().from("trip_quotes").insert({
      name,
      phone,
      vehicle,
      from_location: fromLocation,
      to_location: toLocation,
      travel_date: travelDate,
      passengers: Number(passengers),
    })

    if (error) throw error
    return NextResponse.json({ success: true, message: "Trip enquiry saved successfully." })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to save trip enquiry", error: getSupabaseErrorMessage(error) },
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
    const enquiryId = Number(id)
    if (!Number.isSafeInteger(enquiryId) || enquiryId < 1) {
      return NextResponse.json({ success: false, message: "A valid trip enquiry id is required." }, { status: 400 })
    }

    const { error, count } = await getSupabaseAdminClient()
      .from("trip_quotes")
      .delete({ count: "exact" })
      .eq("id", enquiryId)

    if (error) throw error
    return NextResponse.json({ success: count === 1, affectedRows: count || 0 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete trip enquiry", error: getSupabaseErrorMessage(error) },
      { status: 500 },
    )
  }
}