import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = getSessionCookie(request);

  const isPublic = publicRoutes.includes(pathname);
  const isLoggedIn = !!session;

  if (!isLoggedIn && !isPublic && pathname !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",           
    "/login",
    "/signup",
    "/forgot-password",
    "/((?!_next|api|static|favicon.ico).*)", 
  ],
};