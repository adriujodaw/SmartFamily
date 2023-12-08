export { default } from "next-auth/middleware";
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'





export const config = {
  matcher: ["/dashboard/:path*"],
};
