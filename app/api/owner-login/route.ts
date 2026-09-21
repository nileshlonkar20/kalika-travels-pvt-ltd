import { NextResponse } from "next/server"
import { createOwnerSession, getOwnerSession, isOwnerSessionValid, ownerPassword, ownerUsername } from "@/lib/owner-auth"

const SESSION_COOKIE = "kalika_owner_session"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!ownerUsername || !ownerPassword || !process.env.OWNER_SESSION_SECRET) {
      return NextResponse.json({ success: false, message: "Owner login is not configured on the server." }, { status: 503 })
    }

    if (username === ownerUsername && password === ownerPassword) {
      const response = NextResponse.json({ success: true, message: "Login successful" })
      response.cookies.set(SESSION_COOKIE, createOwnerSession(), {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 8,
        path: "/",
      })
      return response
    }

    return NextResponse.json({ success: false, message: "Invalid username or password." }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 })
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ authenticated: isOwnerSessionValid(getOwnerSession(request)) })
}

export async function DELETE(request: Request) {
  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, "", { expires: new Date(0), path: "/" })
  return response
}
