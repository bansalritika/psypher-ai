// src/app/page.tsx
'use client';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800 via-purple-600 to-purple-400 text-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full space-y-12 md:space-y-0 md:space-x-12 py-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm font-medium shadow backdrop-blur">
            🎉 Tier-Based Access Events
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            <span className="block">Tier Events</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-100">
              Redefined
            </span>
          </h1>

          <p className="text-white/90 text-lg leading-relaxed">
            Unlock exclusive experiences tailored to your membership tier:
            <span className="font-semibold ml-2">Free</span>,{' '}
            <span className="font-semibold">Silver</span>,{' '}
            <span className="font-semibold">Gold</span>, and{' '}
            <span className="font-semibold">Platinum</span>.
          </p>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl text-lg backdrop-blur-md transition">
                Sign In to Explore →
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/events"
              className="bg-white text-purple-800 px-6 py-3 rounded-xl text-lg font-semibold shadow hover:bg-purple-100 transition inline-block"
            >
              🎟️ View Events
            </Link>
            <div className="mt-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>

        {/* Right Ticket Image */}
        <div className="flex-1 max-w-md w-full">
          <Image 
            src="/ticket.png" 
            alt="Ticket"
            width={500} 
            height={500} 
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}