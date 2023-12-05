import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./services/auth.service";

const privateRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAccessToken = request.cookies.has("access_token");

  const token = request.cookies.get("access_token")?.value as string;
  const isValidToken = await verifyToken(token);

  if (
    (!hasAccessToken || !isValidToken) &&
    privateRoutes.includes(pathname) &&
    pathname !== "/login"
  ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}
