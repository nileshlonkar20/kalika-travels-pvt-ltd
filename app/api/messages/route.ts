import { NextResponse } from "next/server"
import { assertDatabaseConfig, db } from "@/lib/db"
import { getOwnerSession, isOwnerSessionValid } from "@/lib/owner-auth"

async function ensureTable() {
  assertDatabaseConfig()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      trip VARCHAR(255) DEFAULT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'message',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  for (const column of [
    "ALTER TABLE messages ADD COLUMN travel_date DATE DEFAULT NULL",
    "ALTER TABLE messages ADD COLUMN destination VARCHAR(255) DEFAULT NULL",
    "ALTER TABLE messages ADD COLUMN passengers INT DEFAULT NULL",
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
    return NextResponse.json({ success: false, message: "Unauthorized", messages: [] }, { status: 401 })
  }

  try {
    await ensureTable()

    const [rows] = await db.execute(
      `SELECT id, name, phone, email, message, trip, travel_date as travelDate, destination, passengers, source, created_at as createdAt
       FROM messages
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ success: true, messages: rows })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch messages",
        error: error instanceof Error ? error.message : "Unknown error",
        messages: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable()

    const { name, phone, email, message, trip, travelDate, destination, passengers, source, createdAt } = await request.json()

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 })
    }

    const normalizedPhone = String(phone).replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json({ success: false, message: "Enter a valid 10-digit mobile number." }, { status: 400 })
    }

    await db.execute(
      `INSERT INTO messages (name, phone, email, message, trip, travel_date, destination, passengers, source, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, email, message, trip || null, travelDate || null, destination || null, passengers ? Number(passengers) : null, source || "message", createdAt || new Date().toISOString()]
    )

    return NextResponse.json({ success: true, message: "Message saved successfully." })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to save message",
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
    const messageId = Number(id)
    if (!Number.isSafeInteger(messageId) || messageId < 1) {
      return NextResponse.json({ success: false, message: "A valid message id is required." }, { status: 400 })
    }

    const [result] = await db.execute("DELETE FROM messages WHERE id = ?", [messageId])
    const affectedRows = "affectedRows" in result ? result.affectedRows : 0
    return NextResponse.json({ success: affectedRows === 1, affectedRows })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to delete message", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
