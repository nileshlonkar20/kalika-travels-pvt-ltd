import mysql from "mysql2/promise"

const requiredDatabaseEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]

export function assertDatabaseConfig() {
  if (process.env.NODE_ENV === "production") {
  const missing = requiredDatabaseEnv.filter((name) => !process.env[name])
  if (missing.length > 0) {
    throw new Error(`Missing production database environment variables: ${missing.join(", ")}`)
  }
  }
}

const sslEnabled = process.env.DB_SSL === "true"

export const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "kalika_db",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 5),
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  ...(sslEnabled ? { ssl: { rejectUnauthorized: true } } : {}),
})
