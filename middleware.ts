import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);


export default auth((req) => {

  const { pathname } = req.nextUrl;

  const user = req.auth?.user;

  const role = user?.role;

  const isLoggedIn = !!user;


  if (pathname === "/login" || pathname === "/") {
    return NextResponse.next();
  }


  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }


  // If Google user has no role yet
  // send them to employee dashboard by default
  if (!role) {
    return NextResponse.redirect(
      new URL("/employee/dashboard", req.url)
    );
  }


  if (pathname.startsWith("/admin") && role !== "ADMIN") {

    return NextResponse.redirect(
      new URL("/employee/dashboard", req.url)
    );

  }


  if (pathname.startsWith("/employee") && role !== "EMPLOYEE") {

    return NextResponse.redirect(
      new URL("/admin/dashboard", req.url)
    );

  }


  return NextResponse.next();

});


export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};