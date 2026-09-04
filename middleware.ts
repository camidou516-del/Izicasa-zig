import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session || session.role !== "ADMIN") {
    return NextResponse.redirect(new URL(session ? "/" : "/login?callbackUrl=/admin", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
