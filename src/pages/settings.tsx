import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Palette, Volume2, User, Globe, HelpCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import styles from '@/styles/Settings.module.css';

type TextSetting = {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'email';
};

type ToggleSetting = {
  id: string;
  label: string;
  value: boolean;
  type: 'toggle';
};

type SelectSetting = {
  id: string;
  label: string;
  value: string;
  type: 'select';
  options?: string[];
};

type Setting = TextSetting | ToggleSetting | SelectSetting;

type SettingsSection = {
  id: string;
  title: string;
  icon: any;
  settings: Setting[];
};

const settingsSections: SettingsSection[] = [
  {
    id: 'account',
    title: 'Account Settings',
    icon: User,
    settings: [
      { id: 'name', label: 'Display Name', value: 'Karthikeyan', type: 'text' },
      { id: 'email', label: 'Email Address', value: 'karthik@example.com', type: 'email' },
      { id: 'username', label: 'Username', value: '@karthikeyan', type: 'text' }
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    settings: [
      { id: 'roomStart', label: 'Room Start Alerts', value: true, type: 'toggle' },
      { id: 'mentions', label: 'Mentions & Replies', value: true, type: 'toggle' },
      { id: 'newFollower', label: 'New Follower Alerts', value: false, type: 'toggle' }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: Lock,
    settings: [
      { id: 'privateProfile', label: 'Private Profile', value: false, type: 'toggle' },
      { id: 'showActivity', label: 'Show Activity Status', value: true, type: 'toggle' },
      { id: 'allowMessages', label: 'Allow Direct Messages', value: true, type: 'toggle' }
    ]
  },
  {
    id: 'audio',
    title: 'Audio Settings',
    icon: Volume2,
    settings: [
      { 
        id: 'inputDevice', 
        label: 'Input Device', 
        value: 'Default Microphone', 
        type: 'select',
        options: ['Default Microphone', 'External Microphone', 'Headset Microphone']
      },
      { 
        id: 'outputDevice', 
        label: 'Output Device', 
        value: 'Default Speaker', 
        type: 'select',
        options: ['Default Speaker', 'External Speaker', 'Headphones']
      },
      { 
        id: 'quality', 
        label: 'Audio Quality', 
        value: 'High', 
        type: 'select',
        options: ['Low', 'Medium', 'High']
      }
    ]
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('account');

  const handleInputChange = (sectionId: string, settingId: string, value: string | boolean) => {
    console.log('Setting updated:', { sectionId, settingId, value });
  };

  const renderSettingInput = (setting: Setting) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div
            className={`${styles.toggle} ${setting.value ? styles.active : ''}`}
            onClick={() => handleInputChange(activeSection, setting.id, !setting.value)}
          >
            <div className={styles.toggleHandle} />
          </div>
        );
      case 'select':
        return (
          <select
            id={setting.id}
            value={setting.value}
            onChange={(e) => handleInputChange(activeSection, setting.id, e.target.value)}
            className={styles.select}
          >
            {setting.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={setting.type}
            id={setting.id}
            value={setting.value}
            onChange={(e) => handleInputChange(activeSection, setting.id, e.target.value)}
            className={styles.input}
          />
        );
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Settings</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className={styles.content}>
          <nav className={styles.sidebar}>
            {settingsSections.map((section) => (
              <button
                key={section.id}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon size={20} />
                {section.title}
              </button>
            ))}
          </nav>

          <div className={styles.settingsContent}>
            {settingsSections.map((section) => (
              <motion.section
                key={section.id}
                className={`${styles.section} ${activeSection === section.id ? styles.visible : styles.hidden}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: activeSection === section.id ? 1 : 0, x: activeSection === section.id ? 0 : 20 }}
                transition={{ duration: 0.2 }}
              >
                <h2>{section.title}</h2>
                <div className={styles.settingsList}>
                  {section.settings.map((setting) => (
                    <div key={setting.id} className={styles.settingItem}>
                      <label htmlFor={setting.id}>{setting.label}</label>
                      {renderSettingInput(setting)}
                    </div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          {/* <button className={styles.saveButton}>Save Changes</button> */}
        </div>
      </div>
    </Layout>
  );
} 