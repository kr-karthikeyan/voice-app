import { useState } from "react";
import { useRouter } from "next/router";
import { 
  Mic, Users, Globe, Clock, Search, Filter,
  Code, Music, Palette, Briefcase, Gamepad, Heart,
  Settings, ChevronRight
} from "lucide-react";
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import styles from './home.module.css';

// Mock data with real avatar URLs
const rooms = [
  {
    id: '1',
    name: 'Tech Talk: Future of AI',
    description: 'Join us for an exciting discussion about the future of artificial intelligence and its impact on society.',
    speakers: [
      { id: '1', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?u=1', isMuted: false, speaking: true },
      { id: '2', name: 'Arjun Patel', avatar: 'https://i.pravatar.cc/150?u=2', isMuted: false, speaking: false },
    ],
    listeners: [
      { id: '3', name: 'Meera Reddy', avatar: 'https://i.pravatar.cc/150?u=3', isMuted: true, speaking: false },
      { id: '4', name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=4', isMuted: true, speaking: false },
      { id: '5', name: 'Anjali Gupta', avatar: 'https://i.pravatar.cc/150?u=5', isMuted: true, speaking: false },
    ],
    createdAt: '2024-03-20T00:00:00.000Z',
    maxSpeakers: 5,
    updatedAt: '2024-03-20T00:00:00.000Z',
    category: 'Technology',
    tags: ['AI', 'Future Tech', 'Innovation'],
  },
  {
    id: '2',
    name: 'Music & Creativity',
    description: 'A space for musicians and creative souls to share their work and collaborate.',
    speakers: [
      { id: '6', name: 'Amit Singh', avatar: 'https://i.pravatar.cc/150?u=6', isMuted: false, speaking: true },
      { id: '7', name: 'Neha Kapoor', avatar: 'https://i.pravatar.cc/150?u=7', isMuted: false, speaking: false },
    ],
    listeners: [
      { id: '8', name: 'Vikram Malhotra', avatar: 'https://i.pravatar.cc/150?u=8', isMuted: true, speaking: false },
      { id: '9', name: 'Pooja Iyer', avatar: 'https://i.pravatar.cc/150?u=9', isMuted: true, speaking: false },
    ],
    createdAt: '2024-03-19T23:30:00.000Z',
    maxSpeakers: 5,
    updatedAt: '2024-03-19T23:30:00.000Z',
    category: 'Music',
    tags: ['Music', 'Art', 'Creativity'],
  },
  {
    id: '3',
    name: 'Startup Journey: From Idea to Scale',
    description: 'Experienced founders share their stories and insights about building successful startups from scratch.',
    speakers: [
      { id: '10', name: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?u=10', isMuted: false, speaking: true },
      { id: '11', name: 'Sneha Reddy', avatar: 'https://i.pravatar.cc/150?u=11', isMuted: false, speaking: false },
      { id: '12', name: 'Karan Shah', avatar: 'https://i.pravatar.cc/150?u=12', isMuted: false, speaking: false },
    ],
    listeners: [
      { id: '13', name: 'Divya Mehta', avatar: 'https://i.pravatar.cc/150?u=13', isMuted: true, speaking: false },
      { id: '14', name: 'Arun Prakash', avatar: 'https://i.pravatar.cc/150?u=14', isMuted: true, speaking: false },
      { id: '15', name: 'Nisha Patel', avatar: 'https://i.pravatar.cc/150?u=15', isMuted: true, speaking: false },
    ],
    createdAt: '2024-03-20T01:00:00.000Z',
    maxSpeakers: 5,
    updatedAt: '2024-03-20T01:00:00.000Z',
    category: 'Business',
    tags: ['Startups', 'Entrepreneurship', 'Business'],
  },
  {
    id: '4',
    name: 'Mindfulness & Mental Health',
    description: 'Join our wellness experts for a discussion on maintaining mental health and practicing mindfulness in daily life.',
    speakers: [
      { id: '16', name: 'Dr. Maya Sharma', avatar: 'https://i.pravatar.cc/150?u=16', isMuted: false, speaking: true },
      { id: '17', name: 'Rohan Desai', avatar: 'https://i.pravatar.cc/150?u=17', isMuted: false, speaking: false },
    ],
    listeners: [
      { id: '18', name: 'Sanjay Kumar', avatar: 'https://i.pravatar.cc/150?u=18', isMuted: true, speaking: false },
      { id: '19', name: 'Priyanka Singh', avatar: 'https://i.pravatar.cc/150?u=19', isMuted: true, speaking: false },
      { id: '20', name: 'Ankit Jain', avatar: 'https://i.pravatar.cc/150?u=20', isMuted: true, speaking: false },
      { id: '21', name: 'Deepa Nair', avatar: 'https://i.pravatar.cc/150?u=21', isMuted: true, speaking: false },
    ],
    createdAt: '2024-03-20T02:00:00.000Z',
    maxSpeakers: 5,
    updatedAt: '2024-03-20T02:00:00.000Z',
    category: 'Wellness',
    tags: ['Mental Health', 'Mindfulness', 'Wellness'],
  },
];

const categories = [
  { name: 'Technology', icon: Code },
  { name: 'Music', icon: Music },
  { name: 'Art', icon: Palette },
  { name: 'Business', icon: Briefcase },
  { name: 'Gaming', icon: Gamepad },
  { name: 'Social', icon: Heart },
];

export default function HomePage() {
  const router = useRouter();

  const handleRoomClick = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            Real-time Voice Conversations
          </h1>
          <p className={styles.subtitle}>
            Join engaging discussions with thought leaders and like-minded individuals in our premium audio rooms
          </p>
        </motion.div>

        <section className={styles.featured}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Live Rooms</h2>
            <p className={styles.sectionSubtitle}>Join interesting discussions happening now</p>
          </div>

          <div className={styles.roomGrid}>
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRoomClick(room.id)}
                className={styles.roomCard}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className={styles.roomContent}>
                  <div className={styles.roomHeader}>
                    <h3 className={styles.roomName}>{room.name}</h3>
                    <div className={styles.roomStats}>
                      <span><Users size={16} /> {room.speakers.length + room.listeners.length}</span>
                      <span><Mic size={16} /> {room.speakers.length}</span>
                    </div>
                  </div>
                  <p className={styles.roomDescription}>{room.description}</p>
                  <div className={styles.roomSpeakers}>
                    {room.speakers.map((speaker) => (
                      <div key={speaker.id} className={styles.speakerPreview}>
                        <img src={speaker.avatar} alt={speaker.name} className={styles.speakerAvatar} />
                        {speaker.speaking && <div className={styles.speakingIndicator} />}
                      </div>
                    ))}
                  </div>
                  <div className={styles.roomFooter}>
                    <span className={styles.roomCategory}>{room.category}</span>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.categories}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>Find rooms that match your interests</p>
          </div>

          <div className={styles.categoryGrid}>
            {categories.map(({ name, icon: Icon }, index) => (
              <motion.button
                key={name}
                className={styles.categoryCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={styles.categoryIcon} />
                {name}
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
} 