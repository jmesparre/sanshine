import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  if (!auth) {
    return NextResponse.json({ error: 'Firebase Admin SDK not initialized' }, { status: 500 });
  }

  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'Token not provided' }, { status: 400 });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const adminUid = process.env.ADMIN_UID;

    if (decodedToken.uid === adminUid) {
      return NextResponse.json({ isAdmin: true });
    } else {
      return NextResponse.json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
