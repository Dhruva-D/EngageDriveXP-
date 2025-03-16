"use client";

import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Trophy, Download, Medal, Newspaper, Share2, Target, Gift, Star, Crown, Award, TrendingUp, Plus, CheckCircle, Coins, Zap, BadgeCheck
} from "lucide-react";
import { Car } from "lucide-react"; 
import html2canvas from 'html2canvas';
import { useUserStore } from "../store/userStore";

// Create a simple toast implementation if the component is missing
const useToast = () => {
  return {
    toast: ({ title, description, duration }: { title: string; description: string; duration: number }) => {
      console.log(`Toast: ${title} - ${description}`);
      // Create a simple toast element
      const toastElement = document.createElement('div');
      toastElement.className = 'fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-md shadow-lg z-50';
      toastElement.innerHTML = `
        <h3 class="font-bold text-sm">${title}</h3>
        <p class="text-sm">${description}</p>
      `;
      document.body.appendChild(toastElement);
      
      // Remove toast after duration
      setTimeout(() => {
        document.body.removeChild(toastElement);
      }, duration);
    }
  };
};

// Create a simple HTML to image function if html2canvas is missing
const createImageFromElement = async (element: HTMLElement): Promise<string> => {
  // Return a placeholder if we don't have html2canvas
  console.log('Creating image from element');
  return new Promise((resolve) => {
    try {
      // Try to use the browser's built-in features as a fallback
      const rect = element.getBoundingClientRect();
      const canvas = document.createElement('canvas');
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Draw a simple background
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate Generated', canvas.width / 2, canvas.height / 2);
      }
      
      resolve(canvas.toDataURL('image/png'));
    } catch (e) {
      // Fallback to a simple image
      console.error('Error creating image:', e);
      resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI3QrUlMAAAAABJRU5ErkJggg==');
    }
  });
};

// Mock data for leaderboards
const overallLeaderboard = [
  {
    name: "Vaibhav P R",
    image: "https://i.ibb.co/Zzjqq0rk/d.png",
    tier: "Gold",
    level: 47,
    badge: "🏆"
  },
  {
    name: "Rajesh Kumar",
    image: "https://i.pravatar.cc/150?img=1",
    tier: "Gold",
    level: 42,
    badge: "🥈"
  },
  {
    name: "Priya Singh",
    image: "https://i.pravatar.cc/150?img=2",
    tier: "Silver",
    level: 38,
    badge: "🥉"
  }
  // Add more drivers as needed
];

const weeklyLeaderboard = [
  {
    name: "Vaibhav P R",
    image: "https://i.ibb.co/Zzjqq0rk/d.png",
    rides: 85,
    tier: "Gold",
    level: 47
  },
  {
    name: "Suresh Verma",
    image: "https://i.pravatar.cc/150?img=4",
    rides: 72,
    tier: "Gold",
    level: 32
  },
  {
    name: "Meera Reddy",
    image: "https://i.pravatar.cc/150?img=5",
    rides: 65,
    tier: "Silver",
    level: 28
  }
  // Add more drivers as needed
];

const topDriver = {
  name: "Vaibhav P R",
  image: "https://i.ibb.co/Zzjqq0rk/d.png",
  achievement: "Completed 619 rides with perfect 4.8star rating in last Month",
  story: "Started his journey with Namma Yatri 1 years ago. Known for his exceptional service and friendly nature.",
  stats: {
    rides: 547,
    rating: 4.8,
    earnings: "₹32,500"
  }
};

const LeaderboardCard = ({ rank, name, image, tier, level, badge, rides }: any) => {
  // Get tier color
  const getTierColor = (tier: string) => {
    const tierColors: Record<string, string> = {
      'Bronze': 'text-amber-700',
      'Silver': 'text-slate-500',
      'Gold': 'text-yellow-500',
      'Platinum': 'text-emerald-500',
      'Diamond': 'text-blue-500',
      'Crown': 'text-purple-600'
    };
    return tierColors[tier] || 'text-gray-700';
  };

  // Calculate tier based on level (50 levels per tier)
  const calculateTier = (level: number) => {
    if (level < 50) return 'Bronze';
    if (level < 100) return 'Silver';
    if (level < 150) return 'Gold';
    if (level < 200) return 'Platinum';
    if (level < 250) return 'Diamond';
    return 'Crown';
  };

  return (
    <div className={`
      flex items-center justify-between p-3 rounded-lg transition-all duration-300
      ${rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-amber-200' : 
        rank === 2 ? 'bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200' :
        rank === 3 ? 'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200' :
        'glass-effect hover:bg-purple-50/50'}
    `}>
      <div className="flex items-center gap-4">
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
          ${rank === 1 ? 'bg-yellow-500 text-white' : 
            rank === 2 ? 'bg-slate-400 text-white' :
            rank === 3 ? 'bg-amber-600 text-white' :
            'bg-purple-100 text-purple-800'}
        `}>
          {rank}
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-white shadow-sm h-10 w-10">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm flex items-center gap-1">
              {name}
              {badge && (
                <span className="ml-1.5">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                </span>
              )}
            </p>
            <p className="text-xs flex items-center">
              <span className={`font-medium ${getTierColor(calculateTier(level))}`}>{calculateTier(level)}</span>
              <span className="mx-1.5 text-gray-300">•</span>
              <span className="text-purple-600">Level {level}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="font-medium text-sm">
        {rides ? (
          <div className="flex items-center gap-1.5">
            <Car className="h-3.5 w-3.5 text-purple-600" />
            <span>{rides}</span>
          </div>
        ) : (
          <span className="text-purple-600">Lv. {level}</span>
        )}
      </div>
    </div>
  );
};

const MissionCard = ({ mission, status }: { mission: any, status: string }) => (
  <Card className="mb-4 overflow-hidden transition-all duration-200 hover:shadow-md">
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg mb-1">{mission.title}</h3>
          <p className="text-muted-foreground text-sm mb-2">{mission.description}</p>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {mission.reward}
            </Badge>
            
            {status === 'active' && (
              <span className="text-xs text-muted-foreground">{mission.deadline}</span>
            )}
            {status === 'completed' && (
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                Completed {mission.completedDate}
              </Badge>
            )}
            {status === 'upcoming' && (
              <span className="text-xs text-muted-foreground">Starts {mission.startDate}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {status === 'active' && (
            <Button size="sm" variant="outline">
              View Details
            </Button>
          )}
          {status === 'completed' && (
            <Button size="sm" variant="outline">
              <Gift className="w-4 h-4 mr-1" /> Claim
            </Button>
          )}
          {status === 'upcoming' && (
            <Button size="sm" variant="outline">
              <Star className="w-4 h-4 mr-1" /> Remind
            </Button>
          )}
        </div>
      </div>
      
      {status === 'active' && mission.progress && (
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{mission.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${mission.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  </Card>
);

const MissionCompletedBanner = ({ mission, onClose }: { mission: any, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
    <div className="w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl animate-float">
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 p-6 text-white text-center">
        <div className="mb-2 inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm">
          <Trophy className="w-8 h-8 text-yellow-300" />
        </div>
        <h3 className="text-2xl font-bold mb-1">Mission Complete!</h3>
        <p className="opacity-90">Congratulations on completing this mission</p>
      </div>
      <div className="p-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-purple-800 mb-2">{mission.title}</h4>
          <p className="text-muted-foreground">{mission.description}</p>
        </div>
        
        <div className="bg-purple-100 rounded-lg p-4 mb-6 flex items-center justify-center gap-3">
          <Coins className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-bold">{mission.reward} coins awarded!</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={onClose} className="border-purple-200 text-purple-700 hover:bg-purple-50">
            Close
          </Button>
          <Button onClick={onClose} className="purple-button">
            <CheckCircle className="w-4 h-4 mr-2" />
            Claim Reward
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("overall");
  const [activeSubTab, setActiveSubTab] = useState("leaderboards");
  const certificateRef = useRef<HTMLDivElement>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const { toast } = useToast();
  const { totalRides, addCoins, addLevel, addRides } = useUserStore();

  // CSS for animations
  const styles = `
    @keyframes bounce-slow {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes zoom-in-95 {
      from {
        transform: scale(0.95);
      }
      to {
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-5px) rotate(1deg);
      }
      75% {
        transform: translateY(-8px) rotate(-1deg);
      }
    }
    
    @keyframes gradient-shift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    @keyframes scale-in {
      from {
        transform: scale(0.8);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 3s infinite;
    }
    
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
    
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient-shift 5s ease infinite;
    }
    
    .animate-scale-in {
      animation: scale-in 0.5s ease forwards;
    }
    
    .animate-in {
      animation-duration: 0.3s;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: both;
    }
    
    .fade-in {
      animation-name: fade-in;
    }
    
    .zoom-in-95 {
      animation-name: zoom-in-95;
    }
    
    .hover-scale-105:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  `;

  // Add enhanced styles with more purple theme
  const enhancedStyles = `
    :root {
      --namma-purple-50: #f5f3ff;
      --namma-purple-100: #ede9fe;
      --namma-purple-200: #ddd6fe;
      --namma-purple-300: #c4b5fd;
      --namma-purple-400: #a78bfa;
      --namma-purple-500: #8b5cf6;
      --namma-purple-600: #7c3aed;
      --namma-purple-700: #6d28d9;
      --namma-purple-800: #5b21b6;
      --namma-purple-900: #4c1d95;
      --namma-purple-950: #2e1065;
      
      --namma-gradient-primary: linear-gradient(135deg, var(--namma-purple-700), var(--namma-purple-500));
      --namma-gradient-secondary: linear-gradient(135deg, var(--namma-purple-900), var(--namma-purple-700));
      --namma-gradient-accent: linear-gradient(135deg, #6366f1, #a855f7);
      
      --namma-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --namma-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --namma-shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --namma-shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    /* Glass morphism effect classes */
    .glass-effect {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    
    .glass-effect-dark {
      background: rgba(79, 70, 229, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(79, 70, 229, 0.15);
    }
    
    .purple-gradient-text {
      background: var(--namma-gradient-accent);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
    }
    
    .purple-card {
      background: linear-gradient(145deg, var(--namma-purple-50), white);
      border: 1px solid var(--namma-purple-200);
      box-shadow: var(--namma-shadow);
      transition: all 0.3s ease;
    }
    
    .purple-card:hover {
      box-shadow: var(--namma-shadow-lg);
      transform: translateY(-2px);
      border-color: var(--namma-purple-300);
    }
    
    .purple-button {
      background: var(--namma-gradient-primary);
      color: white;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
    }
    
    .purple-button:hover {
      background: var(--namma-gradient-secondary);
      box-shadow: 0 6px 10px -1px rgba(79, 70, 229, 0.3);
    }
    
    .animation-pulse-subtle {
      animation: pulse-subtle 3s infinite;
    }
    
    @keyframes pulse-subtle {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
    }
    
    .card-accent-border {
      position: relative;
      overflow: hidden;
    }
    
    .card-accent-border::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--namma-gradient-accent);
    }
  `;

  // Add styles to head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles + enhancedStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Define sub-tabs for each main tab
  const subTabs = {
    leaderboards: [
      { value: "overall", label: "Overall" },
      { value: "weekly", label: "Monthly" },
      { value: "namma", label: "Namma Sarathi" }
    ],
    missions: [
      { value: "active", label: "Active Missions" },
      { value: "completed", label: "Completed" },
      { value: "upcoming", label: "Upcoming" }
    ]
  };

  // Calculate mission progress based on totalRides
  const calculateMissionProgress = (completedRides: number, totalRequired: number) => {
    const progress = Math.min(Math.floor((completedRides / totalRequired) * 100), 100);
    return progress;
  };

  // Sample missions data with updated requirements
  const missions = {
    active: [
      {
        title: "Peak Hour Hero",
        description: "Complete 9 rides between 6-11 AM",
        reward: "500",
        completedRides: Math.min(totalRides, 9), // Use the smaller value between totalRides and required
        totalRides: 9, // Changed from 5 to 9 rides
        get progress() { return calculateMissionProgress(this.completedRides, this.totalRides); },
        deadline: "Today",
        id: "peak-hour-mission",
        icon: Target
      },
      {
        title: "Weekend Warrior",
        description: "Complete 8 rides during weekends",
        reward: "500",
        completedRides: Math.min(totalRides, 8), // Use the smaller value between totalRides and required
        totalRides: 8, // Changed from 20 to 8 rides
        get progress() { return calculateMissionProgress(this.completedRides, this.totalRides); },
        deadline: "Today",
        id: "weekend-warrior-mission",
        icon: TrendingUp
      },
      {
        title: "Quick Start",
        description: "Complete 6 rides",
        reward: "500",
        completedRides: Math.min(totalRides, 6), // Use the smaller value between totalRides and required
        totalRides: 6, // Changed from 1 to 6 rides
        get progress() { return calculateMissionProgress(this.completedRides, this.totalRides); },
        deadline: "Today",
        id: "quick-start-mission",
        icon: Gift
      }
    ],
    completed: [
      {
        title: "Perfect Rating",
        description: "Maintain a 4.8+ rating for 20 consecutive rides",
        reward: "250",
        completedDate: "Last week"
      },
      {
        title: "Punctuality Pro",
        description: "Arrive on time for 15 consecutive pickups",
        reward: "200",
        completedDate: "2 weeks ago"
      }
    ]
  };

  // Check for mission completion on mount and when totalRides changes
  useEffect(() => {
    missions.active.forEach(mission => {
      if (totalRides >= mission.totalRides && mission.progress === 100) {
        completeMission(mission);
      }
    });
  }, [totalRides]);

  // State for mission completion popup
  const [missionCompletedModal, setMissionCompletedModal] = useState({
    show: false,
    mission: null as any
  });

  // Function to complete a mission
  const completeMission = (mission: any) => {
    if (mission && mission.progress === 100 && !missionCompletedModal.show) {
      // Update state to show congratulation modal
      setMissionCompletedModal({
        show: true,
        mission
      });
      
      // Add rewards - reward is now just a number string like "500"
      setTimeout(() => {
        // Add coins to user's total
        const coinAmount = parseInt(mission.reward);
        if (!isNaN(coinAmount)) {
          addCoins(coinAmount);
        }
        
        // Add level to user for all completed missions
        addLevel(1);
        
        // Move mission to completed list
        const updatedActive = missions.active.filter(m => m.id !== mission.id);
        missions.completed.unshift({
          ...mission,
          completedDate: "Just now"
        });
      }, 1000);
    }
  };
  
  // Function to close mission completed modal
  const closeMissionCompletedModal = () => {
    setMissionCompletedModal({
      show: false,
      mission: null
    });
  };

  // Function to add test rides (for testing purposes)
  const handleAddTestRide = () => {
    addRides(1);
    toast({
      title: "Ride Added",
      description: `Total rides: ${totalRides + 1}`,
      duration: 3000,
    });
  };

  // Function to download certificate
  const downloadCertificate = () => {
    setShowCertificate(true);
    
    // Allow time for the certificate to render
    setTimeout(async () => {
      if (certificateRef.current) {
        try {
          // Use html2canvas to generate image
          const canvas = await html2canvas(certificateRef.current, { scale: 2 });
          const imageUrl = canvas.toDataURL('image/png');
          
          // Create download link
          const link = document.createElement('a');
          link.download = `namma_yatri_certificate_${topDriver.name.replace(/\s+/g, '_')}.png`;
          link.href = imageUrl;
          link.click();
          
          toast({
            title: "Certificate Downloaded",
            description: "Your certificate has been downloaded successfully.",
            duration: 3000,
          });
        } catch (e) {
          console.error("Error downloading certificate:", e);
          toast({
            title: "Download Failed",
            description: "There was an error generating the certificate.",
            duration: 3000,
          });
        } finally {
          setShowCertificate(false);
        }
      }
    }, 500);
  };

  // CSS for confetti animation
  const confettiStyle: {
    container: CSSProperties;
    confetti: CSSProperties;
  } = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none' as const,
    },
    confetti: {
      position: 'absolute' as const,
      width: '10px',
      height: '10px',
      borderRadius: '3px',
      opacity: 0.7,
      animation: 'fall 4s ease-out infinite',
    },
  };

  // CSS keyframes for confetti animation
  useEffect(() => {
    // Add keyframe animation for confetti
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        0% {
          top: -10%;
          transform: translateX(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        20% {
          transform: translateX(-20px) rotate(45deg);
        }
        40% {
          transform: translateX(20px) rotate(90deg);
        }
        60% {
          transform: translateX(-20px) rotate(135deg);
        }
        80% {
          transform: translateX(20px) rotate(180deg);
        }
        100% {
          top: 110%;
          transform: translateX(-20px) rotate(225deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Function to handle claiming rewards
  const claimReward = (mission: any) => {
    // Add coins from mission reward
    const coinReward = parseInt(mission.reward) || 0;
    addCoins(coinReward);
    
    // Show success message
    toast({
      title: "Reward Claimed!",
      description: `You've earned ${mission.reward} coins for completing the "${mission.title}" mission!`,
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl animate-in fade-in duration-500">
      {/* Main navigation */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 purple-gradient-text animate-gradient">
          <Trophy className="w-7 h-7 text-purple-600" />
          Leaderboard & Missions
        </h1>
      </div>

      {/* Sub Navigation */}
      <div className="border-b mb-8 border-purple-200">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveSubTab("leaderboards")}
            className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
              activeSubTab === "leaderboards"
                ? "text-purple-700"
                : "text-muted-foreground hover:text-purple-600"
            }`}
          >
            Leaderboards
            {activeSubTab === "leaderboards" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveSubTab("missions")}
            className={`pb-2 px-1 font-medium text-lg transition-colors relative ${
              activeSubTab === "missions"
                ? "text-purple-700"
                : "text-muted-foreground hover:text-purple-600"
            }`}
          >
            Missions
            {activeSubTab === "missions" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              />
            )}
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-lg max-w-3xl w-full shadow-2xl animate-scale-in" ref={certificateRef}>
            <div className="border-8 border-double border-primary/20 p-8 bg-white bg-opacity-90 rounded-lg">
              <div className="text-center relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img 
                    src="https://i.ibb.co/Zzjqq0rk/d.png" 
                    alt="Namma Yatri Logo" 
                    className="h-16 mx-auto"
                  />
                </div>
                <h2 className="text-4xl font-bold mb-2 mt-4">NAMMA YATRI</h2>
                <h3 className="text-xl font-semibold mb-6">Certificate of Excellence</h3>
                
                <div className="my-8">
                  <p className="text-lg mb-2">This certifies that</p>
                  <h2 className="text-3xl font-bold">{topDriver.name}</h2>
                  <p className="mb-6">has been recognized as</p>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">NAMMA SARATHI OF THE MONTH</h3>
                  <p className="mb-8">{topDriver.achievement}</p>
                </div>
                
                <div className="flex justify-between items-end mt-12">
                  <div className="text-center">
                    <div className="border-t border-gray-300 pt-2 w-48 mx-auto">
                      <p className="font-semibold">Date</p>
                      <p>{new Date().toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="https://i.ibb.co/hF9Tzgk/signature.png" 
                      alt="CEO Signature" 
                      className="h-16 mx-auto mb-2"
                    />
                    <div className="border-t border-gray-300 pt-2 w-48">
                      <p className="font-semibold">Vimal Kumar</p>
                      <p>CEO, Namma Yatri</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-8 right-8 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-60"></div>
                    <Avatar className="w-28 h-28 border-4 border-primary relative">
                      <AvatarImage src={topDriver.image} />
                      <AvatarFallback>{topDriver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mt-2 p-1 px-3 bg-primary/10 rounded-full text-xs text-primary font-semibold">
                    {topDriver.tier} • Level {topDriver.level}
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <img 
                    src="https://i.ibb.co/Zzjqq0rk/d.png" 
                    alt="QR Code" 
                    className="h-16 w-16 opacity-30"
                  />
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                  <p>Namma Yatri - Empowering Sarathis, Connecting Communities</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            className="absolute top-4 right-4" 
            variant="outline" 
            onClick={() => setShowCertificate(false)}
          >
            Close
          </Button>
        </div>
      )}
      
      {/* Leaderboards Content */}
      {activeSubTab === "leaderboards" && (
        <Tabs defaultValue="overall" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overall">Overall Leaderboard</TabsTrigger>
            <TabsTrigger value="weekly">Monthly Leaderboard</TabsTrigger>
            <TabsTrigger value="namma">Namma Sarathi</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Top Drivers by Level</h2>
            <div className="space-y-4">
              {overallLeaderboard.map((driver, index) => (
                <LeaderboardCard
                  key={index}
                  rank={index + 1}
                  name={driver.name}
                  image={driver.image}
                  tier={driver.tier}
                  level={driver.level}
                  badge={driver.badge}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">This Month's Top Performers</h2>
            <div className="space-y-4">
              {weeklyLeaderboard.map((driver, index) => (
                <LeaderboardCard
                  key={index}
                  rank={index + 1}
                  name={driver.name}
                  image={driver.image}
                  tier={driver.tier}
                  level={driver.level}
                  rides={driver.rides}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="namma">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-white overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-800 to-blue-700 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-yellow-300 animate-pulse" />
                  <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">Namma Sarathi of the Month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center mb-8">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md animate-pulse"></div>
                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl relative animate-float">
                      <AvatarImage src={topDriver.image} />
                      <AvatarFallback>{topDriver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{topDriver.name}</h3>
                  <p className="text-muted-foreground">{topDriver.achievement}</p>
                  
                  <div className="grid grid-cols-3 gap-4 my-6">
                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale-105">
                      <div className="text-2xl font-bold">{topDriver.stats.rides}</div>
                      <div className="text-sm text-muted-foreground">Rides</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale-105">
                      <div className="text-2xl font-bold">{topDriver.stats.rating}⭐</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors hover-scale-105">
                      <div className="text-2xl font-bold">{topDriver.stats.earnings}</div>
                      <div className="text-sm text-muted-foreground">Earned</div>
                    </div>
                  </div>

                  <Button 
                    className="mb-8 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 shadow-md"
                    onClick={downloadCertificate}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>

                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <CardContent className="p-0">
                        <img 
                          src="https://i.postimg.cc/3NTQrXsS/images.jpg" 
                          alt="Recognition" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-5">
                          <Medal className="w-8 h-8 text-primary mx-auto mb-4" />
                          <h4 className="font-semibold mb-2">Recognition</h4>
                          <p className="text-sm text-muted-foreground">
                            Special medal from Namma Yatri's Founder
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <CardContent className="p-0">
                        <img 
                          src="https://i.postimg.cc/5ydbYdCm/auto.jpg" 
                          alt="Newspaper Posting" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-5">
                          <Newspaper className="w-8 h-8 text-primary mx-auto mb-4" />
                          <h4 className="font-semibold mb-2">Newspaper Posting</h4>
                          <p className="text-sm text-muted-foreground">
                            Featured in local newspapers
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <CardContent className="p-0">
                        <img 
                          src="https://i.ibb.co/Z6rSKVr/dd.png" 
                          alt="Social Media" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-5">
                          <Share2 className="w-8 h-8 text-primary mx-auto mb-4" />
                          <h4 className="font-semibold mb-2">Social Media</h4>
                          <p className="text-sm text-muted-foreground">
                            Story shared on official channels
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Benefits of High Rank in Leaderboard */}
            <Card className="mt-8 border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-yellow-300" />
                  Benefits of High Rank in Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-100">
                    <Target className="w-12 h-12 text-purple-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2">Fast Passenger Matching</h4>
                    <p className="text-sm text-muted-foreground">
                      Higher priority in matching algorithm during peak hours
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-100">
                    <Gift className="w-12 h-12 text-blue-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2">Coins Distribution</h4>
                    <p className="text-sm text-muted-foreground">
                      Exclusive monthly coin rewards based on leaderboard position
                    </p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-indigo-100">
                    <Star className="w-12 h-12 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-lg mb-2">Premium Status</h4>
                    <p className="text-sm text-muted-foreground">
                      Special badge visible to passengers, increasing trust and tips
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Missions Content */}
      {activeSubTab === "missions" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold purple-gradient-text">Daily Missions</h2>
            <Button 
              onClick={handleAddTestRide}
              className="purple-button"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Test Ride
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {missions.active.map((mission, index) => {
              const progress = calculateMissionProgress(totalRides, mission.totalRides);
              const isComplete = progress === 100;
              
              return (
                <Card key={index} className={`card-accent-border overflow-hidden transition-all duration-300 hover:shadow-lg ${isComplete ? 'bg-gradient-to-br from-green-50 to-white' : 'purple-card'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-3">
                      {React.createElement(mission.icon, { 
                        className: `w-6 h-6 ${isComplete ? 'text-green-500' : 'text-purple-600'}`
                      })}
                      <span>{mission.title}</span>
                      {isComplete && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />}
                    </CardTitle>
                    <CardDescription>
                      {mission.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>{totalRides} / {mission.totalRides} rides</span>
                        <span className={isComplete ? 'text-green-500 font-medium' : ''}>
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            isComplete 
                              ? 'bg-gradient-to-r from-green-400 to-green-500 animate-pulse' 
                              : 'bg-gradient-to-r from-purple-600 to-purple-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center gap-2">
                          <Coins className="w-5 h-5 text-yellow-500" />
                          <span className="font-medium">{mission.reward} coins</span>
                        </div>
                        {isComplete ? (
                          <Button 
                            onClick={() => claimReward(mission)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                          >
                            Claim Reward
                          </Button>
                        ) : (
                          <Button disabled variant="outline" size="sm" className="text-purple-600 border-purple-200">
                            In Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6 purple-gradient-text">Benefits of High Rank</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-100">
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <h4 className="font-bold text-lg mb-2">Fast Passenger Matching</h4>
                <p className="text-sm text-muted-foreground">
                  Higher priority in matching algorithm during peak hours
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-100">
                <Gift className="w-12 h-12 text-blue-600 mb-4" />
                <h4 className="font-bold text-lg mb-2">Coins Distribution</h4>
                <p className="text-sm text-muted-foreground">
                  Exclusive monthly coin rewards based on leaderboard position
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-indigo-100">
                <Star className="w-12 h-12 text-indigo-600 mb-4" />
                <h4 className="font-bold text-lg mb-2">Premium Status</h4>
                <p className="text-sm text-muted-foreground">
                  Special badge visible to passengers, increasing trust and tips
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mission Completed Modal */}
      {missionCompletedModal.show && missionCompletedModal.mission && (
        <MissionCompletedBanner 
          mission={missionCompletedModal.mission} 
          onClose={closeMissionCompletedModal} 
        />
      )}
    </div>
  );
}
