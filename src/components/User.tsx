import { User } from "@/types";
import { Mic, MicOff, Crown, Shield, Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import styles from './User.module.css';

interface UserCardProps {
  user: User;
  role?: 'speaker' | 'listener';
}

export function UserCard({ user, role }: UserCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.userCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div 
        className={styles.avatarContainer}
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className={styles.avatar}
        />
        {role === 'speaker' && (
          <motion.div
            className={styles.micIndicator}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Mic size={12} />
          </motion.div>
        )}
      </motion.div>
      
      <motion.div
        className={styles.userInfo}
        animate={{ y: isHovered ? -2 : 0 }}
      >
        <span className={styles.name}>{user.name}</span>
        {role && (
          <span className={styles.role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        )}
      </motion.div>

      {role === 'speaker' && (
        <motion.div
          className={styles.statusIndicator}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}
