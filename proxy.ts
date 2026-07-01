import { NextRequest, NextResponse } from "next/server";

/**
 * Protects the /admin CMS UI with HTTP Basic auth when ADMIN_PASSWORD is set
 * (username "admin"). Without the env var the admin stays open — matching
 * previous behaviour so local development and initial setup keep working.
 * Set ADMIN_PASSWORD in Vercel before connecting Tina Cloud in production.
 */
export function proxy(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return NextResponse.next();

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const [user, pass] = atob(auth.slice(6)).split(":");
      if (user === "admin" && pass === password) {
        return NextResponse.next();
      }
    } catch {
      // fall through to the 401 below
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Somlioya admin"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
