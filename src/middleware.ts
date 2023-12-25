import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  const userDetails: any = request.cookies.get("user")?.value;

  const userParseDet = userDetails ? JSON.parse(userDetails) : {};
  if (isPublicPath && token) {
    if (userParseDet?.isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
  if (!isPublicPath && !token) {
    // return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (userParseDet?.isAdmin) {
    // If user is admin, redirect away from the user page
    if (path === "/") {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
  } else {
    // If user is not admin, redirect away from the admin page
    if (path === "/admin") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin", "/signup", "/", "/admin"],
};
