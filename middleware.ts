import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const user = req.auth?.user;
  const role = user?.role;
  const isLoggedIn = !!user;

  // Public routes (no authentication required)
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If OAuth user has no role yet
  if (!role) {
    return NextResponse.redirect(
      new URL("/employee/dashboard", req.url)
    );
  }

  // Prevent employees from accessing admin pages
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(
      new URL("/employee/dashboard", req.url)
    );
  }

  // Prevent admins from accessing employee pages
  if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {
    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};