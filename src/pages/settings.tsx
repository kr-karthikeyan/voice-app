import { useState } from 'react';
import { Bell, Lock, Moon, Sun, User, Globe2, HelpCircle } from 'lucide-react';
import styles from '../styles/Settings.module.css';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { useToast } from '../contexts/toast-context';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  mentions: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
}

interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
}

interface LanguageSettings {
  language: string;
  region: string;
}

export default function Settings() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    mentions: true,
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowFriendRequests: true,
  });
  const [theme, setTheme] = useState<ThemeSettings>({
    mode: 'dark',
  });
  const [language, setLanguage] = useState<LanguageSettings>({
    language: 'English',
    region: 'United States',
  });

  const handleSave = () => {
    showToast('Settings saved successfully');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Notifications</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Email Notifications</h3>
              <p>Receive updates via email</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Push Notifications</h3>
              <p>Receive updates on your device</p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Mentions</h3>
              <p>Get notified when mentioned</p>
            </div>
            <Switch
              checked={notifications.mentions}
              onCheckedChange={(checked) => setNotifications({ ...notifications, mentions: checked })}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Privacy</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Profile Visibility</h3>
              <p>Control who can see your profile</p>
            </div>
            <select
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as PrivacySettings['profileVisibility'] })}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Show Online Status</h3>
              <p>Let others see when you're online</p>
            </div>
            <Switch
              checked={privacy.showOnlineStatus}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, showOnlineStatus: checked })}
            />
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Allow Friend Requests</h3>
              <p>Let others send you friend requests</p>
            </div>
            <Switch
              checked={privacy.allowFriendRequests}
              onCheckedChange={(checked) => setPrivacy({ ...privacy, allowFriendRequests: checked })}
            />
          </div>
        </section>

        <section className={styles.section}>
          <h2>Theme</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Theme Mode</h3>
              <p>Choose your preferred theme</p>
            </div>
            <select
              value={theme.mode}
              onChange={(e) => setTheme({ ...theme, mode: e.target.value as ThemeSettings['mode'] })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Language & Region</h2>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Language</h3>
              <p>Select your preferred language</p>
            </div>
            <select
              value={language.language}
              onChange={(e) => setLanguage({ ...language, language: e.target.value })}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          <div className={styles.setting}>
            <div className={styles.settingInfo}>
              <h3>Region</h3>
              <p>Select your region</p>
            </div>
            <select
              value={language.region}
              onChange={(e) => setLanguage({ ...language, region: e.target.value })}
            >
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>
        </section>
      </div>

      <div className={styles.footer}>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
} 