import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "izicasa_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-change-this-secret");

export type SessionUser = { id: string; name: string; email: string; role: "USER" | "ADMIN" };

export async function createSession(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string | undefined): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload.id || !payload.email || (payload.role !== "USER" && payload.role !== "ADMIN")) return null;
    return { id: String(payload.id), name: String(payload.name || ""), email: String(payload.email), role: payload.role };
  } catch {
    return null;
  }
}

export async function getSession() {
  return verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
}
