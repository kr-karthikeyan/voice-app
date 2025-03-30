import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Mic, MicOff, Tag, Hash } from 'lucide-react';
import { Room } from '@/types';
import styles from './Room.module.css';
import { useRouter } from 'next/router';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/room/${room.id}`);
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{room.name}</h3>
            <div className={styles.category}>
              <Hash size={14} />
              <span>{room.category}</span>
            </div>
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
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className={styles.avatar}
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
                    <img
                      src={listener.avatar}
                      alt={listener.name}
                      className={styles.avatar}
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
                <Tag size={12} />
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
      </footer>
    </motion.div>
  );
}
