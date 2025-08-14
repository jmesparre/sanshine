import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin'; // We will create this file

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const decodedToken = await auth.verifyIdToken(token);
      const adminUid = process.env.ADMIN_UID; // Notice no NEXT_PUBLIC_

      if (decodedToken.uid !== adminUid) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
