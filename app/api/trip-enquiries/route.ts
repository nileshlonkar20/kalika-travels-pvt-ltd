import { NextResponse } from "next/server"
import { assertDatabaseConfig, db } from "@/lib/db"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"

async function ensureTable() {
  assertDatabaseConfig()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS trip_enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      vehicle VARCHAR(255) DEFAULT NULL,
      from_location VARCHAR(255) NOT NULL,
      to_location VARCHAR(255) NOT NULL,
      travel_date DATE DEFAULT NULL,
      passengers INT DEFAULT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", tripEnquiries: [] }, { status: 401 })
  }

  try {
    await ensureTable()
    const [rows] = await db.execute(
      `SELECT id, name, phone, vehicle, from_location as fromLocation,
        to_location as toLocation, travel_date as travelDate, passengers, created_at as createdAt
       FROM trip_enquiries ORDER BY created_at DESC`,
    )
    return NextResponse.json({ success: true, tripEnquiries: rows })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch trip enquiries", tripEnquiries: [], error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable()
    const { name, phone, vehicle, fromLocation, toLocation, travelDate, passengers } = await request.json()
    const normalizedPhone = String(phone || "").replace(/\D/g, "")

    if (!name || !phone || !fromLocation || !toLocation) {
      return NextResponse.json({ success: false, message: "Name, phone, from and destination are required." }, { status: 400 })
    }
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    await db.execute(
      `INSERT INTO trip_enquiries (name, phone, vehicle, from_location, to_location, travel_date, passengers)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, vehicle || null, fromLocation, toLocation, travelDate || null, passengers ? Number(passengers) : null],
    )
    return NextResponse.json({ success: true, message: "Trip enquiry saved successfully." })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to save trip enquiry", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    assertDatabaseConfig()
    const { id } = await request.json()
    const enquiryId = Number(id)
    if (!Number.isSafeInteger(enquiryId) || enquiryId < 1) {
      return NextResponse.json({ success: false, message: "A valid trip enquiry id is required." }, { status: 400 })
    }
    const [result] = await db.execute("DELETE FROM trip_enquiries WHERE id = ?", [enquiryId])
    const affectedRows = "affectedRows" in result ? result.affectedRows : 0
    return NextResponse.json({ success: affectedRows === 1, affectedRows })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete trip enquiry", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
