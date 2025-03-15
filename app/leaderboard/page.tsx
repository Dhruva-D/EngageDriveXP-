"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Download, Medal, Newspaper, Share2 } from "lucide-react";

// Mock data for leaderboards
const overallLeaderboard = [
  {
    name: "Rajesh Kumar",
    image: "https://i.pravatar.cc/150?img=1",
    tier: "Gold",
    level: 45,
    badge: "🏆"
  },
  {
    name: "Priya Singh",
    image: "https://i.pravatar.cc/150?img=2",
    tier: "Gold",
    level: 42,
    badge: "🥈"
  },
  {
    name: "Amit Patel",
    image: "https://i.pravatar.cc/150?img=3",
    tier: "Silver",
    level: 38,
    badge: "🥉"
  }
  // Add more drivers as needed
];

const weeklyLeaderboard = [
  {
    name: "Suresh Verma",
    image: "https://i.pravatar.cc/150?img=4",
    rides: 85,
    tier: "Gold",
    level: 32
  },
  {
    name: "Meera Reddy",
    image: "https://i.pravatar.cc/150?img=5",
    rides: 78,
    tier: "Silver",
    level: 28
  },
  {
    name: "Karthik R",
    image: "https://i.pravatar.cc/150?img=6",
    rides: 72,
    tier: "Bronze",
    level: 25
  }
  // Add more drivers as needed
];

const topDriver = {
  name: "Rajesh Kumar",
  image: "https://i.pravatar.cc/150?img=1",
  achievement: "Completed 500+ rides with perfect 5-star ratings",
  story: "Started his journey with Namma Yatri 2 years ago. Known for his exceptional service and friendly nature.",
  stats: {
    rides: 547,
    rating: 5.0,
    earnings: "₹75,000"
  }
};

const LeaderboardCard = ({ 
  rank, 
  name, 
  image, 
  tier, 
  level, 
  badge, 
  rides 
}: { 
  rank: number;
  name: string;
  image: string;
  tier: string;
  level: number;
  badge?: string;
  rides?: number;
}) => (
  <div className={`flex items-center gap-4 p-4 rounded-lg ${rank <= 3 ? 'bg-muted/50' : ''} hover:bg-muted/80 transition-colors`}>
    <span className="text-2xl font-bold w-8 text-center">{rank}</span>
    <Avatar className="w-12 h-12">
      <AvatarImage src={image} />
      <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium">{name}</span>
        {badge && <span className="text-xl">{badge}</span>}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="text-xs">
          {tier}
        </Badge>
        <span>Level {level}</span>
        {rides && <span>• {rides} rides</span>}
      </div>
    </div>
  </div>
);

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("overall");

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl animate-in fade-in duration-500">
      <Tabs defaultValue="overall" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overall">Overall Leaderboard</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Leaderboard</TabsTrigger>
          <TabsTrigger value="namma">Namma Driver</TabsTrigger>
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
          <h2 className="text-2xl font-bold mb-6">This Week's Top Performers</h2>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Namma Driver of the Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary/20">
                  <AvatarImage src={topDriver.image} />
                  <AvatarFallback>{topDriver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-2xl font-bold mb-2">{topDriver.name}</h3>
                <p className="text-muted-foreground">{topDriver.achievement}</p>
                
                <div className="grid grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{topDriver.stats.rides}</div>
                    <div className="text-sm text-muted-foreground">Rides</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{topDriver.stats.rating}⭐</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{topDriver.stats.earnings}</div>
                    <div className="text-sm text-muted-foreground">Earned</div>
                  </div>
                </div>

                <Button className="mb-8" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <Medal className="w-8 h-8 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Recognition</h4>
                      <p className="text-sm text-muted-foreground">
                        Special medal from Namma Yatri's Founder
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <Newspaper className="w-8 h-8 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Featured Story</h4>
                      <p className="text-sm text-muted-foreground">
                        Featured in local newspapers
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <Share2 className="w-8 h-8 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Social Media</h4>
                      <p className="text-sm text-muted-foreground">
                        Story shared on official channels
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
