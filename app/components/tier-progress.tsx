"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";

interface TierProgressProps {
  currentXP: number;
}

export function TierProgress({ currentXP }: TierProgressProps) {
  // Define tier thresholds
  const tiers = [
    { name: "Bronze III", threshold: 0, icon: "🥉" },
    { name: "Bronze II", threshold: 500, icon: "🥉" },
    { name: "Bronze I", threshold: 1000, icon: "🥉" },
    { name: "Silver", threshold: 1500, icon: "🥈" },
    { name: "Gold", threshold: 2000, icon: "🥇" },
    { name: "Platinum", threshold: 2500, icon: "💎" },
    { name: "Diamond", threshold: 3000, icon: "💠" },
    { name: "Crown", threshold: 3500, icon: "👑" },
  ];

  // Find current tier and next tier
  const currentTierIndex = tiers.findIndex(
    (tier, index) =>
      currentXP >= tier.threshold &&
      (index === tiers.length - 1 || currentXP < tiers[index + 1].threshold)
  );

  const currentTier = tiers[currentTierIndex];
  const nextTier =
    currentTierIndex < tiers.length - 1
      ? tiers[currentTierIndex + 1]
      : null;

  // Calculate progress to next tier
  const progressToNextTier = nextTier
    ? ((currentXP - currentTier.threshold) /
        (nextTier.threshold - currentTier.threshold)) *
      100
    : 100;

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Driver Tier</h3>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentXP} XP
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 mb-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`flex flex-col items-center ${
              index === currentTierIndex
                ? "tier-glow p-2 rounded-lg"
                : "p-2 rounded-lg"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className={`text-2xl ${
                index <= currentTierIndex ? "" : "opacity-40"
              }`}
            >
              {tier.icon}
            </div>
            <p
              className={`text-xs mt-1 ${
                index <= currentTierIndex
                  ? "font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {tier.name}
            </p>
          </motion.div>
        ))}
      </div>

      {nextTier && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{currentTier.name}</span>
            <span>{nextTier.name}</span>
          </div>
          <Progress value={progressToNextTier} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentXP} XP</span>
            <span>{nextTier.threshold} XP</span>
          </div>
        </div>
      )}
    </Card>
  );
}