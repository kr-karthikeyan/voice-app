import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Mic, MicOff, Users, Clock, Globe, Lock, Settings } from 'lucide-react';
import Image from 'next/image';
import styles from './Room.module.css';
import { Room as RoomType } from '../types';

interface RoomCardProps {
  room: RoomType;
}

export function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);

  const handleClick = () => {
    router.push(`/room/${room.id}`);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Format date consistently using UTC to avoid locale issues
  const createdAt = new Date(room.createdAt);
  const formattedDate = createdAt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });

  return (
    <motion.div
      className={styles.roomCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onClick={handleClick}
    >
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{room.name}</h3>
            <div className={styles.category}>
              <Globe size={14} />
              <span>{room.category}</span>
            </div>
            {room.isPrivate && <Lock size={16} className={styles.privateIcon} />}
          </div>
          <div className={styles.badge}>
            <Users size={16} />
            <span>{room.speakers.length + room.listeners.length} participants</span>
          </div>
        </div>
        <div className={styles.stats}>
          <span className={styles.stat}>
            <Clock size={16} />
            {formattedDate}
          </span>
        </div>
      </header>

      {room.description && (
        <p className={styles.description}>{room.description}</p>
      )}

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Mic size={16} />
              Speakers ({room.speakers.length}/{room.maxSpeakers})
            </div>
            <span className={styles.sectionCount}>{room.speakers.length} active</span>
          </div>
          <div className={styles.userGrid}>
            {room.speakers.map((speaker) => (
              <motion.div
                key={speaker.id}
                className={styles.userCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.avatarContainer}>
                  <Image
                    src={speaker.avatar}
                    alt={speaker.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {speaker.speaking && (
                    <div className={styles.speakingIndicator} />
                  )}
                </div>
                <span className={styles.userName}>{speaker.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {room.listeners.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <MicOff size={16} />
                Listeners
              </div>
              <span className={styles.sectionCount}>{room.listeners.length} listening</span>
            </div>
            <div className={styles.userGrid}>
              {room.listeners.map((listener) => (
                <motion.div
                  key={listener.id}
                  className={styles.userCard}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={styles.avatarContainer}>
                    <Image
                      src={listener.avatar}
                      alt={listener.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <span className={styles.userName}>{listener.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {room.tags && room.tags.length > 0 && (
          <div className={styles.tags}>
            {room.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <Globe size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <div className={styles.activeIndicator}>
          Active now
        </div>
        <div className={styles.muteButtonContainer}>
          <button
            onClick={handleToggleMute}
            className={styles.muteButton}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>
        <motion.button
          className={styles.joinButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Join room
        </motion.button>
        <div className={styles.settingsButtonContainer}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle settings
            }}
            className={styles.settingsButton}
          >
            <Settings size={20} />
          </button>
        </div>
      </footer>
    </motion.div>
  );
}
