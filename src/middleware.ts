// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //const token = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // Allow if refresh token is present (i.e., app might still be refreshing)
  if (!refreshToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
