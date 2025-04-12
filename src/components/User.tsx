import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Mic, MicOff, Crown } from 'lucide-react';
import Image from 'next/image';

interface UserProps {
  id: string;
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isHost: boolean;
  tags?: string[];
  bio?: string;
  rooms?: number;
  followers?: number;
  joinedAt?: string;
}

export function UserCard({ id, name, avatar, isSpeaking, isMuted, isHost, tags, bio, rooms, followers, joinedAt }: UserProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/profile/${id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
          {isHost && (
            <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
              <Crown size={12} className="text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-white/70">
            {isSpeaking ? (
              <Mic size={14} className="text-green-500" />
            ) : isMuted ? (
              <MicOff size={14} className="text-red-500" />
            ) : null}
            {tags && tags.length > 0 && (
              <span>{tags.join(', ')}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
