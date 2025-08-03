// src/app/api/upgrade/route.ts
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server'; // 👈 Import NextRequest

// Type the 'req' parameter as NextRequest
export async function POST(req: NextRequest) {
  try {
    const { userId, newTier } = await req.json();

    if (!userId || !newTier) {
      return NextResponse.json({ error: 'User ID and new tier are required.' }, { status: 400 });
    }

    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        tier: newTier,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Failed to upgrade tier from API:', error);
    return NextResponse.json({ error: 'Failed to update tier.' }, { status: 500 });
  }
}