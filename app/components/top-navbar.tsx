"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

export function TopNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b p-4 backdrop-blur-lg bg-opacity-80 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Car className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-xl">RideShare</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/passenger" className="text-sm font-medium hover:text-primary transition-colors">
                Book a Ride
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/driver" className="text-sm font-medium hover:text-primary transition-colors">
                Drive
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
