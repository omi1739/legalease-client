import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // Protect lawyer details page: /browse/[name] (but let /browse be public)
  if (pathname.startsWith("/browse/") && pathname !== "/browse") {
    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackURL", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/browse/:path+"],
};
