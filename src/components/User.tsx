import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Users, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import styles from './User.module.css';
import { User as UserType } from '../types';

interface UserCardProps {
  user: UserType;
}

export function UserCard({ user }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isHovered)

  return (
    <motion.div
      className={styles.userCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.avatarContainer}>
        <Image
          src={user.avatar}
          alt={user.name}
          width={48}
          height={48}
          className={styles.avatar}
        />
        {user.speaking && (
          <div className={styles.speakingIndicator} />
        )}
      </div>
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>{user.name}</h3>
        <p className={styles.userBio}>{user.bio}</p>
        <div className={styles.userStats}>
          <span className={styles.stat}>
            <Users size={16} />
            {user.followers} followers
          </span>
          <span className={styles.stat}>
            <Mic size={16} />
            {user.rooms} rooms
          </span>
          <span className={styles.stat}>
            <Clock size={16} />
            {user.joinedAt}
          </span>
        </div>
        <div className={styles.tags}>
          {user.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
