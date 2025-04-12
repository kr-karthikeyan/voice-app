import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Mic, MicOff, Users, Lock, Globe, Settings } from 'lucide-react';
import Image from 'next/image';
import { RoomCard } from '../../components/Room';
import { UserCard } from '../../components/User';

interface User {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  speaking: boolean;
  tags?: string[];
  bio?: string;
  rooms?: number;
  followers?: number;
  joinedAt?: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  isPrivate: boolean;
  maxSpeakers: number;
  createdAt: string;
  speakers: User[];
  listeners: User[];
  tags: string[];
}

// Mock data - replace with actual API call
const mockRoom: Room = {
  id: '1',
  name: 'AI Discussion',
  description: 'Discussing the latest developments in AI',
  category: 'Technology',
  isPrivate: false,
  maxSpeakers: 8,
  createdAt: new Date().toISOString(),
  speakers: [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?u=1',
      isMuted: false,
      speaking: true,
      tags: ['AI', 'Tech'],
      bio: 'AI Researcher',
      rooms: 5,
      followers: 100,
      joinedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?u=2',
      isMuted: false,
      speaking: false,
      tags: ['ML', 'Data'],
      bio: 'Data Scientist',
      rooms: 3,
      followers: 80,
      joinedAt: '2024-01-02'
    }
  ],
  listeners: [
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?u=3',
      isMuted: true,
      speaking: false,
      tags: ['Dev', 'Web'],
      bio: 'Web Developer',
      rooms: 2,
      followers: 50,
      joinedAt: '2024-01-03'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/150?u=4',
      isMuted: true,
      speaking: false,
      tags: ['Design', 'UX'],
      bio: 'UX Designer',
      rooms: 1,
      followers: 30,
      joinedAt: '2024-01-04'
    },
    {
      id: '5',
      name: 'Tom Brown',
      avatar: 'https://i.pravatar.cc/150?u=5',
      isMuted: true,
      speaking: false,
      tags: ['Mobile', 'App'],
      bio: 'Mobile Developer',
      rooms: 4,
      followers: 70,
      joinedAt: '2024-01-05'
    }
  ],
  tags: ['AI', 'Future Tech', 'Innovation']
};

export default function RoomPage() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState<Room | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Fetch room data
    const fetchRoom = async () => {
      try {
        const response = await fetch(`/api/rooms/${id}`);
        const data = await response.json();
        setRoom(data);
      } catch (error) {
        console.error('Error fetching room:', error);
        // Use mock data for development
        setRoom(mockRoom);
      }
    };

    if (id) {
      fetchRoom();
    }
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Room Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{room.name}</h1>
                  <p className="text-white/70">{room.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{room.speakers.length + room.listeners.length} participants</span>
                  </div>
                  {room.isPrivate ? (
                    <Lock size={20} />
                  ) : (
                    <Globe size={20} />
                  )}
                </div>
              </div>

              {/* Speakers Grid */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Speakers</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {room.speakers.map((speaker) => (
                    <UserCard
                      key={speaker.id}
                      id={speaker.id}
                      name={speaker.name}
                      avatar={speaker.avatar}
                      isSpeaking={speaker.speaking}
                      isMuted={speaker.isMuted}
                      isHost={speaker.id === room.speakers[0].id}
                      tags={speaker.tags}
                      bio={speaker.bio}
                      rooms={speaker.rooms}
                      followers={speaker.followers}
                      joinedAt={speaker.joinedAt}
                    />
                  ))}
                </div>
              </div>

              {/* Listeners Grid */}
              {room.listeners.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Listeners</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {room.listeners.map((listener) => (
                      <UserCard
                        key={listener.id}
                        id={listener.id}
                        name={listener.name}
                        avatar={listener.avatar}
                        isSpeaking={listener.speaking}
                        isMuted={listener.isMuted}
                        isHost={false}
                        tags={listener.tags}
                        bio={listener.bio}
                        rooms={listener.rooms}
                        followers={listener.followers}
                        joinedAt={listener.joinedAt}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold mb-6">Controls</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Mic size={20} />
                  <span>{isSpeaking ? 'Stop Speaking' : 'Start Speaking'}</span>
                </button>
                <button
                  onClick={() => router.push('/settings')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
