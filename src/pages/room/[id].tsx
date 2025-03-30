import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Users, Settings, X, ChevronLeft, ChevronRight, Volume2, VolumeX, Phone, PhoneOff, Smile } from 'lucide-react';
import { Room } from '@/types';
import styles from '@/styles/Room.module.css';
import { FaUsers, FaTag, FaMicrophone, FaHeadphones, FaMicrophoneSlash, FaSmile } from 'react-icons/fa';

// Mock data - replace with actual API call
const mockRoom: Room = {
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
};

// Haptic feedback function
const vibrate = (pattern: number | number[]) => {
  if (typeof window !== 'undefined' && window.navigator.vibrate) {
    window.navigator.vibrate(pattern);
  }
};

// Emoji reactions with labels and colors
const EMOJI_REACTIONS = [
  { emoji: '👍', label: 'Thumbs Up', color: '#4CAF50' },
  { emoji: '👏', label: 'Clap', color: '#FFC107' },
  { emoji: '❤️', label: 'Heart', color: '#F44336' },
  { emoji: '😂', label: 'Laugh', color: '#FF9800' },
  { emoji: '🤔', label: 'Thinking', color: '#9C27B0' },
  { emoji: '🎉', label: 'Celebrate', color: '#E91E63' },
  { emoji: '👋', label: 'Wave', color: '#2196F3' },
  { emoji: '💪', label: 'Strong', color: '#795548' },
];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export default function RoomPage() {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState<Room | null>(null);
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);

  const handleHover = () => {
    vibrate(10);
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setRoom(mockRoom);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const handleRoleToggle = (role: 'speaker' | 'listener') => {
    if (!room) return;
    
    const newIsSpeaker = role === 'speaker';
    if (newIsSpeaker === isSpeaker) return; // Don't do anything if role hasn't changed
    
    setIsSpeaker(newIsSpeaker);
    setIsMuted(true); // Reset mute state when switching roles
    
    const currentUser = {
      id: 'current-user',
      name: 'You',
      avatar: 'https://i.pravatar.cc/150?u=current',
      isMuted: true,
      speaking: false,
    };

    if (newIsSpeaker) {
      // Switching to speaker
      setRoom({
        ...room,
        speakers: [...room.speakers, currentUser],
        listeners: room.listeners.filter(user => user.id !== 'current-user'),
      });
    } else {
      // Switching to listener
      setRoom({
        ...room,
        speakers: room.speakers.filter(user => user.id !== 'current-user'),
        listeners: [...room.listeners, currentUser],
      });
    }
  };

  const handleMicToggle = () => {
    if (isSpeaker) {
      setIsMuted(!isMuted);
      setIsSpeaking(!isMuted); // Only show speaking indicator when unmuted
    }
  };

  const handleJoinRoom = async () => {
    if (!room) return;
    
    if (isSpeaker) {
      // If already joined, remove from speakers
      vibrate([50, 30, 50]);
      setRoom({
        ...room,
        speakers: room.speakers.filter(user => user.id !== 'current-user'),
        listeners: [...room.listeners, {
          id: 'current-user',
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?u=current',
          isMuted: true,
          speaking: false,
        }],
      });
      setIsSpeaker(false);
    } else {
      // Join as speaker
      vibrate([50, 30, 50]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentUser = {
        id: 'current-user',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?u=current',
        isMuted: false,
        speaking: false,
      };

      setRoom({
        ...room,
        speakers: [...room.speakers, currentUser],
        listeners: room.listeners.filter(user => user.id !== 'current-user'),
      });
      
      setIsSpeaker(true);
    }
  };

  const handleLeaveRoom = () => {
    if (!room) return;
    
    vibrate([100, 30, 100]);
    
    setRoom({
      ...room,
      speakers: room.speakers.filter(user => user.id !== 'current-user'),
      listeners: [...room.listeners, {
        id: 'current-user',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?u=current',
        isMuted: true,
        speaking: false,
      }],
    });
    
    setIsSpeaker(false);
    setShowLeaveConfirmation(false);
    router.push('/');
  };

  const handleToggleSettings = () => {
    vibrate(20); // Haptic feedback for settings toggle
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleToggleSidebar = () => {
    vibrate(20); // Haptic feedback for sidebar toggle
    setIsSidebarOpen(!isSidebarOpen);
  };

  const emojis = ['👍', '👏', '❤️', '🎉', '🚀', '💪'];

  const handleEmojiClick = useCallback((emoji: string) => {
    // Create random position near the bottom center
    const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
    const y = window.innerHeight - 200;

    const newEmoji: FloatingEmoji = {
      id: emojiCounter,
      emoji,
      x,
      y,
    };

    setEmojiCounter(prev => prev + 1);
    setFloatingEmojis(prev => [...prev, newEmoji]);

    // Remove emoji after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
    }, 1500);
  }, [emojiCounter]);

  const toggleEmojiPicker = () => {
    setShowEmojis(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className={styles.roomContainer}>
      {/* Header */}
      <header className={styles.roomHeader}>
        <div className={styles.roomInfo}>
          <h1>{room.name}</h1>
          <div className={styles.roomStats}>
            <span>
              <FaUsers />
              {room.speakers.length + room.listeners.length} participants
            </span>
            <span>
              <FaTag />
              {room.category}
            </span>
          </div>
        </div>
        <div className={styles.roomActions}>
        <button
            className={styles.settingsButton}
            onClick={handleToggleSettings}
        >
            <Settings size={20} />
        </button>
        <button
            className={styles.leaveButton}
            onClick={() => setShowLeaveConfirmation(true)}
        >
            <X size={20} />
        </button>
        </div>
      </header>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.speakersGrid}>
        {room.speakers.map((speaker) => (
          <div
            key={speaker.id}
              className={styles.speakerCard}
              data-speaking={speaker.id === 'current-user' && isSpeaker && !isMuted}
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
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{speaker.name}</h3>
                <span className={styles.userRole}>
                  {speaker.id === 'current-user' ? (isSpeaker ? 'SPEAKER' : 'LISTENER') : 'SPEAKER'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Show Listeners Button */}
        <AnimatePresence>
          {!isSidebarOpen && (
            <motion.button
              className={styles.showListenersButton}
              onClick={handleToggleSidebar}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <div className={styles.dot} />
              <span>Listeners ({room.listeners.length})</span>
              <ChevronLeft size={16} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Role Switch */}
        <div className={styles.roleSwitch}>
          <button
            className={`${styles.roleSwitchButton} ${isSpeaker ? styles.active : ''}`}
            onClick={() => handleRoleToggle('speaker')}
          >
            <FaMicrophone /> Speaker
          </button>
          <button
            className={`${styles.roleSwitchButton} ${!isSpeaker ? styles.active : ''}`}
            onClick={() => handleRoleToggle('listener')}
          >
            <FaHeadphones /> Listener
          </button>
        </div>

        {/* Floating Emojis */}
        {floatingEmojis.map(({ id, emoji, x, y }) => (
          <div
            key={id}
            className={styles.floatingEmoji}
            style={{ left: x, top: y }}
          >
            {emoji}
          </div>
        ))}

        {/* Emoji Reactions */}
        <div className={`${styles.reactions} ${showEmojis ? styles.visible : ''}`}>
          {emojis.map((emoji) => (
            <button
              key={emoji}
              className={styles.reactionEmoji}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
              <button
            className={`${styles.controlButton} ${isMuted ? styles.muted : ''}`}
            onClick={handleMicToggle}
            disabled={!isSpeaker}
          >
            {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
              </button>
              <button
            className={`${styles.controlButton} ${showEmojis ? styles.active : ''}`}
            onClick={toggleEmojiPicker}
              >
            <FaSmile />
              </button>
        </div>
      </main>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            className={styles.sidebar}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className={styles.sidebarHeader}>
              <h2>Listeners ({room.listeners.length})</h2>
              <button
                className={styles.closeSidebarButton}
                onClick={handleToggleSidebar}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className={styles.listenersList}>
              {room.listeners.map((listener) => (
                <div key={listener.id} className={styles.listenerCard}>
                  <img
                    src={listener.avatar}
                    alt={listener.name}
                    className={styles.listenerAvatar}
                    loading="lazy"
                  />
                  <div className={styles.listenerInfo}>
                    <span className={styles.listenerName}>{listener.name}</span>
                    <span className={`${styles.listenerStatus} ${listener.isMuted ? styles.muted : ''}`}>
                      {listener.isMuted ? 'Muted' : 'Listening'}
                    </span>
            </div>
          </div>
        ))}
      </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Leave Confirmation Modal */}
      <AnimatePresence>
        {showLeaveConfirmation && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLeaveConfirmation(false)}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Leave Room?</h2>
                <button 
                  className={styles.closeModalButton}
                  onClick={() => setShowLeaveConfirmation(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <p>Are you sure you want to leave this room?</p>
                <div className={styles.modalActions}>
                  <button 
                    className={styles.cancelButton}
                    onClick={() => setShowLeaveConfirmation(false)}
                  >
                    Cancel
                  </button>
            <button
                    className={styles.confirmButton}
                    onClick={handleLeaveRoom}
                  >
                    Leave Room
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleToggleSettings}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>Room Settings</h2>
                <button 
                  className={styles.closeModalButton}
                  onClick={handleToggleSettings}
                >
                  <X size={20} />
            </button>
          </div>
              <div className={styles.modalContent}>
                <div className={styles.settingGroup}>
                  <label>Room Name</label>
                  <input 
                    type="text" 
                    value={room.name}
                    readOnly
                    className={styles.input}
                  />
                </div>
                <div className={styles.settingGroup}>
                  <label>Max Speakers</label>
                  <input 
                    type="number" 
                    value={room.maxSpeakers}
                    readOnly
                    className={styles.input}
                  />
                </div>
                <div className={styles.settingGroup}>
                  <label>Category</label>
                  <input 
                    type="text" 
                    value={room.category}
                    readOnly
                    className={styles.input}
                  />
                </div>
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
