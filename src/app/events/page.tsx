'use client';
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import EventCard from '@/components/EventCard';
import { Loader2 } from 'lucide-react';
import UpgradeButton from '@/components/UpgradeButton';

const tierOrder = ['free', 'silver', 'gold', 'platinum'];

export default function EventsPage() {
  const { user } = useUser();
  const userTier = user?.publicMetadata?.tier || 'free'; 
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [allowedTiers, setAllowedTiers] = useState<string[]>([]); // ✅ New state

  const fetchEvents = async (userTier: string) => {
  console.log("✅ fetchEvents() called with tier:", userTier);

  if (!tierOrder.includes(userTier)) return;

  const allowed = tierOrder.slice(0, tierOrder.indexOf(userTier) + 1);
  console.log("Allowed Tiers:", allowed);
  setAllowedTiers(allowed); // 👈 save to state

 const { data, error } = await supabase
  .from('events')
  .select('id, title, description, event_date, image_url, tier');
  


  if (error) {
    console.error("❌ Supabase error:", error.message);
  } else {
    console.log("✅ Setting events:", data);
    setEvents(data ?? []);
  }

  setLoading(false);
};

useEffect(() => {
  console.log("👤 user tier in useEffect:", user?.publicMetadata?.tier);
  if (user && user.publicMetadata?.tier) {
    fetchEvents(user.publicMetadata.tier as string);
  } else if (user === null) {
    // Handle signed out state explicitly if needed
    setLoading(false);
    setEvents([]);
    setAllowedTiers([]);
  }
}, [user?.publicMetadata?.tier, user]); // Added 'user'


  console.log("🔄 Rendered EventsPage. Events length:", events.length);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-10 px-6">
      <SignedOut>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 text-center border border-gray-200">
          <h2 className="text-xl font-semibold text-purple-700">Please sign in to view events.</h2>
        </div>
      </SignedOut>

      <SignedIn>
        <section className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
            Explore Your Tier Events
          </h1>
 <UpgradeButton />
         {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin h-10 w-10 text-purple-600" />
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.length === 0 && !loading ? (
                <p className="col-span-full text-center text-gray-600">No events found.</p>
              ) : (
                events
                  // We sort the events by tier so locked events appear last
                  .sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier))
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      userTier={userTier as string} 
                      tierOrder={tierOrder} 
                    />
                  ))
              )}
                 </div>
          )}
        </section>
      </SignedIn>
    </main>
  );
}
