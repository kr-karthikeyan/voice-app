import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Mic, MicOff, Bell, BellOff, Moon, Sun } from 'lucide-react';
import Image from 'next/image';

export default function SettingsPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Settings size={24} />
          <h1 className="text-2xl font-bold">Settings</h1>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">John Doe</h3>
                <p className="text-white/70">john@example.com</p>
              </div>
            </div>
          </motion.div>

          {/* Audio Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Audio Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                  <span>Microphone</span>
                </div>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {notifications ? <Bell size={20} /> : <BellOff size={20} />}
                  <span>Push Notifications</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {notifications ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  <span>Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {darkMode ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 