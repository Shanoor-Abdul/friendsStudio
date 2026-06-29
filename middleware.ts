// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const auth = request.headers.get("authorization");

//   if (request.nextUrl.pathname.startsWith("/admin")) {
//     if (auth !== "Basic " + btoa("admin:1234")) {
//       return new NextResponse("Unauthorized", {
//         status: 401,
//         headers: {
//           "WWW-Authenticate": "Basic realm='Secure Area'",
//         },
//       });
//     }
//   }

//   return NextResponse.next();
// }

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