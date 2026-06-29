import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 🟢 PASTE THE CONFIG BLOCK RIGHT HERE AT THE BOTTOM
// export const config = {
//   runtime: 'nodejs', 
//   matcher: ['/admin/:path*'], 
// };
