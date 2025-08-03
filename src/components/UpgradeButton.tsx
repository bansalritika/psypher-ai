// src/components/UpgradeButton.tsx
'use client';
import { useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';

const tierOrder = ['free', 'silver', 'gold', 'platinum'];

export default function UpgradeButton() {
  const { user, isLoaded } = useUser(); 
  const { userId } = useAuth(); 
  const [isUpdating, setIsUpdating] = useState(false);

  const currentTier = (user?.publicMetadata?.tier as string) || 'free';
  const currentTierIndex = tierOrder.indexOf(currentTier);
  const nextTier = tierOrder[currentTierIndex + 1];
  const isMaxTier = !nextTier;

  const isDisabled = !isLoaded || isUpdating || isMaxTier;


  const handleUpgrade = async () => {
    if (!user || !user.publicMetadata?.tier) {
      console.error("User or user tier not available, this should not happen if the button is disabled correctly.");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch('/api/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, newTier: nextTier }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade tier via API.');
      }

      alert(`🎉 Successfully upgraded to ${nextTier} tier!`);
    } catch (error) {
      console.error("Failed to upgrade tier:", error);
      alert("Failed to upgrade tier. Check console for details.");
    } finally {
      setIsUpdating(false);
    }
  };


  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleUpgrade}
        disabled={isDisabled} 
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors duration-200
          ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
          ${isUpdating && 'opacity-70 cursor-wait'}
        `}
      >
        {isUpdating ? 'Upgrading...' : isMaxTier ? 'Maximum Tier Reached' : `Upgrade to ${nextTier}`}
      </button>
    </div>
  );
}