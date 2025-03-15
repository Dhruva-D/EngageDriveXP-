"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Car, Trophy, Star, Coins } from "lucide-react";

export default function ProfilePage() {
  // Mock data - in a real app, this would come from an API
  const driverData = {
    name: "John Driver",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=120&h=120&fit=crop",
    phone: "+91 98765 43210",
    email: "john.driver@example.com",
    totalRides: 1250,
    tier: "Gold",
    xp: 2750,
    earnings: {
      total: "₹125,000",
      thisMonth: "₹15,000",
      lastMonth: "₹12,000"
    },
    achievements: [
      { title: "1000 Rides Completed", date: "2024-12-01" },
      { title: "Top Driver - December 2024", date: "2024-12-31" },
      { title: "Perfect 5-Star Week", date: "2025-01-15" }
    ]
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-24 h-24 border-4 border-primary/20">
          <AvatarImage src={driverData.image} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{driverData.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              {driverData.tier} Tier
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              <Trophy className="w-4 h-4 mr-1" />
              Level {Math.floor(driverData.xp / 100)}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              {driverData.phone}
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              {driverData.email}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{driverData.totalRides}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">XP Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{driverData.xp}</span>
            </div>
            <div className="w-full h-2 bg-primary/20 rounded-full mt-2">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(driverData.xp % 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{driverData.earnings.thisMonth}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last Month: {driverData.earnings.lastMonth}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Achievements & Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {driverData.achievements.map((achievement, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-medium">{achievement.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
