export interface User {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  speaking: boolean;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  speakers: User[];
  listeners: User[];
  createdAt: string;
  maxSpeakers: number;
  updatedAt: string;
  category: string;
  tags: string[];
} 