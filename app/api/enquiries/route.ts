import { NextResponse } from "next/server"
import { db } from "@/lib/db"

async function ensureTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      trip VARCHAR(255) DEFAULT NULL,
      source VARCHAR(50) NOT NULL DEFAULT 'contact',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  try {
    await db.execute(`ALTER TABLE enquiries ADD COLUMN trip VARCHAR(255) DEFAULT NULL`)
  } catch {}

  try {
    await db.execute(`ALTER TABLE enquiries ADD COLUMN source VARCHAR(50) NOT NULL DEFAULT 'contact'`)
  } catch {}
}

export async function GET() {
  try {
    await ensureTable()

    const [rows] = await db.execute(
      `SELECT id, name, phone, email, message, trip, source, created_at as createdAt
       FROM enquiries
       ORDER BY created_at DESC`
    )

    return NextResponse.json({ success: true, enquiries: rows })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch enquiries",
        error: error instanceof Error ? error.message : "Unknown error",
        enquiries: [],
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await ensureTable()

    const { name, phone, email, message, trip, source, createdAt } = await request.json()

    const finalEmail = email || "noreply@example.com"
    const finalName = name || "Guest"
    const finalPhone = phone || "Not provided"
    const finalMessage = message || `Callback request${trip ? ` for ${trip}` : ""}`
    const finalSource = source || "contact"

    await db.execute(
      `INSERT INTO enquiries (name, phone, email, message, trip, source, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [finalName, finalPhone, finalEmail, finalMessage, trip || null, finalSource, createdAt || new Date().toISOString()]
    )

    return NextResponse.json({ success: true, message: "Enquiry saved successfully." })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to save enquiry",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
