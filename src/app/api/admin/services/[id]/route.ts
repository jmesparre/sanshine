import { NextResponse } from 'next/server';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin SDK
const apps = getApps();
if (!apps.length) {
  initializeApp();
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const serviceId = params.id;
  const body = await request.json();

  // Basic Authentication Check (replace with your actual admin auth logic)
  const authToken = request.headers.get('Authorization');
  if (!authToken) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // Verify the token and check if the user is an admin
    // This is a placeholder. You should implement proper admin verification.
    // const decodedToken = await getAuth().verifyIdToken(authToken.replace('Bearer ', ''));
    // const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID;
    // if (decodedToken.uid !== adminUid) {
    //   return new NextResponse('Forbidden', { status: 403 });
    // }

    if (!serviceId) {
      return new NextResponse('Service ID is required', { status: 400 });
    }

    const serviceRef = doc(db, 'services', serviceId);

    await updateDoc(serviceRef, {
      ...body,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Service updated successfully' });
  } catch (error) {
    console.error('Error updating service:', error);
    if (error instanceof Error) {
        return new NextResponse(error.message, { status: 500 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
