// src/components/EventCard.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge'; 
import Image from 'next/image';
import { Event } from '@/types/index'; 

const tierColors: Record<string, string> = {
  free: 'bg-purple-200 text-purple-800',
  silver: 'bg-gray-200 text-gray-800',
  gold: 'bg-yellow-300 text-yellow-800',
  platinum: 'bg-blue-200 text-blue-800',
};

// Update the props to include userTier and tierOrder
export default function EventCard({
  event,
  userTier,
  tierOrder,
}: {
  event: Event;
  userTier: string;
  tierOrder: string[];
}) {
  const userTierIndex = tierOrder.indexOf(userTier);
  const eventTierIndex = tierOrder.indexOf(event.tier);

  const isLocked = eventTierIndex > userTierIndex;

  const getTierColor = (tier: string) => {
    return tierColors[tier] || 'bg-gray-200 text-gray-800';
  };

  return (
    <div className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 border border-gray-200">
      {isLocked && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white p-4 z-10">
          <h3 className="text-2xl font-bold mb-2">Locked</h3>
          <p className="text-center text-lg">
            Upgrade to <span className="font-bold capitalize">{event.tier}</span> to access this event.
          </p>
          <a
            href="/upgrade" // 👈 Change this to your upgrade/pricing page URL
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
          >
            Upgrade Now
          </a>
        </div>
      )}
      <Image // 👈 Replace <img> with <Image>
        src={event.image_url || 'https://via.placeholder.com/400x200.png?text=Event+Image'}
        alt={event.title}
        width={400} 
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className={`p-4 space-y-2 ${isLocked ? 'opacity-20' : ''}`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
          
          <span className={`badge uppercase inline-block px-3 py-1 text-sm font-semibold rounded-full ${getTierColor(event.tier)}`}>
            {event.tier}
          </span>
        </div>
        <p className="text-gray-600">{event.description}</p>
        <p className="text-sm text-gray-500">📅 {new Date(event.event_date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}