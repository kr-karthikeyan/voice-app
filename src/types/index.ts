import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  speaking: boolean;
  tags: string[];
  bio: string;
  rooms: number;
  followers: number;
  joinedAt: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  category: string;
  isPrivate: boolean;
  maxSpeakers: number;
  createdAt: string;
  updatedAt: string;
  speakers: User[];
  listeners: User[];
  tags: string[];
} 