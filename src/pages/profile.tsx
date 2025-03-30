import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Edit, Calendar, Clock, Users, Mic, Volume2, Star } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import styles from '@/styles/Profile.module.css';

const mockUser = {
  id: '1',
  name: 'Karthikeyan',
  username: '@karthikeyan',
  avatar: '/batman-avatar.svg',
  bio: 'Software Engineer & Tech Enthusiast | Building innovative solutions and exploring new technologies',
  joinedDate: 'March 2024',
  stats: {
    hostedRooms: 8,
    joinedRooms: 32,
    followers: 156,
    following: 143
  },
  interests: ['Software Development', 'Technology', 'Innovation', 'Web3', 'AI'],
  recentActivity: [
    {
      id: '1',
      type: 'hosted',
      name: 'Building Modern Web Apps',
      date: '3 hours ago',
      participants: 28,
      duration: '1h 45m'
    },
    {
      id: '2',
      type: 'joined',
      name: 'Tech Innovation Discussion',
      date: 'Yesterday',
      participants: 35,
      duration: '2h'
    },
    {
      id: '3',
      type: 'hosted',
      name: 'Software Architecture Patterns',
      date: '2 days ago',
      participants: 42,
      duration: '1h 30m'
    }
  ],
  achievements: [
    { id: '1', name: 'Tech Leader', description: 'Hosted 5+ technical discussions', icon: Star },
    { id: '2', name: 'Active Speaker', description: 'Participated in 30+ rooms', icon: Mic },
    { id: '3', name: 'Network Builder', description: 'Connected with 150+ professionals', icon: Users }
  ]
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('activity');

  return (
    <Layout>
      <div className={styles.container}>
        {/* Profile Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                <img src={mockUser.avatar} alt={mockUser.name} className={styles.avatar} />
                <button className={styles.editButton}>
                  <Edit size={16} />
                </button>
              </div>
            </div>
            <div className={styles.userInfo}>
              <div className={styles.nameSection}>
                <h1 className={styles.name}>{mockUser.name}</h1>
                <p className={styles.username}>{mockUser.username}</p>
              </div>
              <p className={styles.bio}>{mockUser.bio}</p>
              <div className={styles.joinInfo}>
                <span><Calendar size={14} /> Joined {mockUser.joinedDate}</span>
              </div>
            </div>
            <button className={styles.settingsButton}>
              <Settings size={20} />
              Settings
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.stat}>
            <h3>{mockUser.stats.hostedRooms}</h3>
            <p>Hosted</p>
          </div>
          <div className={styles.stat}>
            <h3>{mockUser.stats.joinedRooms}</h3>
            <p>Joined</p>
          </div>
          <div className={styles.stat}>
            <h3>{mockUser.stats.followers}</h3>
            <p>Followers</p>
          </div>
          <div className={styles.stat}>
            <h3>{mockUser.stats.following}</h3>
            <p>Following</p>
          </div>
        </div>

        {/* Interests Section */}
        <div className={styles.interestsSection}>
          <h2 className={styles.sectionTitle}>Interests</h2>
          <div className={styles.interests}>
            {mockUser.interests.map((interest, index) => (
              <span key={index} className={styles.interest}>{interest}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'activity' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Recent Activity
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'achievements' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'activity' ? (
            <div className={styles.activityList}>
              {mockUser.recentActivity.map((activity) => (
                <motion.div 
                  key={activity.id}
                  className={styles.activityCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.activityHeader}>
                    <h3>{activity.name}</h3>
                    <span className={styles.activityType}>
                      {activity.type === 'hosted' ? <Mic size={16} /> : <Volume2 size={16} />}
                      {activity.type}
                    </span>
                  </div>
                  <div className={styles.activityMeta}>
                    <span><Clock size={14} /> {activity.date}</span>
                    <span><Users size={14} /> {activity.participants} participants</span>
                    <span><Clock size={14} /> {activity.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.achievementsList}>
              {mockUser.achievements.map((achievement) => (
                <motion.div 
                  key={achievement.id}
                  className={styles.achievementCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.achievementIcon}>
                    <achievement.icon size={24} />
                  </div>
                  <div className={styles.achievementInfo}>
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 