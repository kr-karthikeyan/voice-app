import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Mic, MicOff, Bell, BellOff, Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function SettingsPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Layout>
      <div className="w-full min-h-full bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <Settings size={24} className="text-white" />
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </motion.div>

          <div className="space-y-6">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Profile</h2>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10">
                  <Image
                    src="/avatar.png"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">John Doe</h3>
                  <p className="text-white/70">john@example.com</p>
                </div>
              </div>
            </motion.div>

            {/* Audio Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Audio Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isMuted ? 
                      <MicOff size={20} className="text-white" /> : 
                      <Mic size={20} className="text-white" />
                    }
                    <span className="text-white">Microphone</span>
                  </div>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
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
              className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {notifications ? 
                      <Bell size={20} className="text-white" /> : 
                      <BellOff size={20} className="text-white" />
                    }
                    <span className="text-white">Push Notifications</span>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
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
              className="bg-white/10 border border-white/10 rounded-lg p-6 backdrop-blur-sm shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">Appearance</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? 
                      <Moon size={20} className="text-white" /> : 
                      <Sun size={20} className="text-white" />
                    }
                    <span className="text-white">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    {darkMode ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 