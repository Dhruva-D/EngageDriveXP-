'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Passenger {
  name: string;
  image: string;
  rating: number;
  trips: number;
}

export interface RideRequest {
  id: string;
  pickup: string;
  dropoff: string;
  passenger: Passenger;
  distance: string;
  duration: string;
  fare: number;
  timestamp: Date;
}

interface RideStore {
  pendingRequests: RideRequest[];
  addRideRequest: (request: Omit<RideRequest, "timestamp"> & { timestamp: string | Date }) => void;
  removeRideRequest: (id: string) => void;
}

export const useRideStore = create<RideStore>()(
  persist(
    (set) => ({
      pendingRequests: [],
      addRideRequest: (request) => {
        const newRequest = {
          ...request,
          timestamp: request.timestamp instanceof Date ? request.timestamp : new Date(request.timestamp)
        };
        console.log('Adding ride request:', newRequest);
        set((state) => ({
          pendingRequests: [newRequest, ...state.pendingRequests]
        }));
      },
      removeRideRequest: (id) => {
        console.log('Removing ride request:', id);
        set((state) => ({
          pendingRequests: state.pendingRequests.filter(request => request.id !== id)
        }));
      },
    }),
    {
      name: 'ride-store',
      partialize: (state) => ({ pendingRequests: state.pendingRequests }),
    }
  )
);
