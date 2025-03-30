import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Music, Code, Palette, Briefcase, Gamepad, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import styles from '@/styles/Explore.module.css';

const categories = [
  { id: '1', name: 'Music', icon: Music, rooms: 24 },
  { id: '2', name: 'Technology', icon: Code, rooms: 18 },
  { id: '3', name: 'Art & Design', icon: Palette, rooms: 15 },
  { id: '4', name: 'Business', icon: Briefcase, rooms: 12 },
  { id: '5', name: 'Gaming', icon: Gamepad, rooms: 20 },
  { id: '6', name: 'Wellness', icon: Heart, rooms: 10 }
];

const featuredRooms = [
  {
    id: '1',
    title: 'Tech Trends 2024',
    description: 'Discussing the latest in technology and future predictions',
    participants: 128,
    category: 'Technology',
    isLive: true
  },
  {
    id: '2',
    title: 'Music Production Tips',
    description: 'Professional producers sharing their workflow secrets',
    participants: 85,
    category: 'Music',
    isLive: true
  },
  {
    id: '3',
    title: 'Startup Networking',
    description: 'Connect with founders and investors',
    participants: 95,
    category: 'Business',
    isLive: false
  }
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Explore Rooms</h1>
          <div className={styles.filters}>
            <div className={styles.searchBar}>
              <Search size={20} />
              <input type="text" placeholder="Search rooms by title, category, or description..." />
            </div>
            <button className={styles.filterButton}>
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        <section className={styles.categories}>
          <h2>Browse Categories</h2>
          <div className={styles.categoryGrid}>
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className={`${styles.categoryCard} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <category.icon size={24} />
                <h3>{category.name}</h3>
                <span>{category.rooms} rooms</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.featuredRooms}>
          <h2>Featured Rooms</h2>
          <div className={styles.roomGrid}>
            {featuredRooms.map((room) => (
              <motion.div
                key={room.id}
                className={styles.roomCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.roomHeader}>
                  <h3>{room.title}</h3>
                  {room.isLive && <span className={styles.liveTag}>LIVE</span>}
                </div>
                <p className={styles.roomDescription}>{room.description}</p>
                <div className={styles.roomMeta}>
                  <span className={styles.category}>{room.category}</span>
                  <span className={styles.participants}>{room.participants} listening</span>
                </div>
                <button className={styles.joinButton}>
                  Join Room
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
} 