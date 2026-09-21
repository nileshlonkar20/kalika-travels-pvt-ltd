import { NextResponse } from "next/server"
import { assertDatabaseConfig, db } from "@/lib/db"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"

async function ensureTable() {
  assertDatabaseConfig()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS callback_requests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      trip VARCHAR(255) DEFAULT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'callback',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  for (const column of [
    "ALTER TABLE callback_requests ADD COLUMN travel_date DATE DEFAULT NULL",
    "ALTER TABLE callback_requests ADD COLUMN destination VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE callback_requests ADD COLUMN passengers INT DEFAULT NULL",
  ]) {
    try {
      await db.execute(column)
    } catch {
      // Existing deployments already have the column.
    }
  }
}

export async function GET(request: Request) {
  if (!isOwnerSessionValid(getOwnerSession(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized", callbackRequests: [] }, { status: 401 })
  }

  try {
    await ensureTable()

    const [rows] = await db.execute(
      `SELECT id, name, phone, trip, travel_date as travelDate, destination, passengers, source, created_at as createdAt
       FROM callback_requests
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ success: true, callbackRequests: rows })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch callback requests",
        error: error instanceof Error ? error.message : "Unknown error",
        callbackRequests: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable()

    const { name, phone, trip, travelDate, destination, passengers, source, createdAt } = await request.json()

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "Name and phone are required." }, { status: 400 })
    }

    const normalizedPhone = String(phone).replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    await db.execute(
      `INSERT INTO callback_requests (name, phone, trip, travel_date, destination, passengers, source, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, trip || null, travelDate || null, destination || null, passengers ? Number(passengers) : null, source || "callback", createdAt || new Date().toISOString()]
    )

    return NextResponse.json({ success: true, message: "Callback request saved successfully." })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to save callback request",
        error: error instanceof Error ? error.message : "Unknown error",
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
    assertDatabaseConfig()
    const { id } = await request.json()
    const requestId = Number(id)
    if (!Number.isSafeInteger(requestId) || requestId < 1) {
      return NextResponse.json({ success: false, message: "A valid request id is required." }, { status: 400 })
    }

    const [result] = await db.execute("DELETE FROM callback_requests WHERE id = ?", [requestId])
    const affectedRows = "affectedRows" in result ? result.affectedRows : 0
    return NextResponse.json({ success: affectedRows === 1, affectedRows })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete callback request", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
