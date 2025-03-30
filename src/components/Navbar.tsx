import { Home, Mic, Users, User, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <Link href="/" className={styles.logo}>
          VoiceApp
        </Link>
        
        <div className={styles.search}>
          <Search size={20} />
          <input type="text" placeholder="Search rooms..." />
        </div>

        <div className={styles.links}>
          <Link href="/" className={`${styles.link} ${isActive('/') ? styles.active : ''}`}>
            <Home size={24} />
            <span>Home</span>
          </Link>
          
          <Link href="/explore" className={`${styles.link} ${isActive('/explore') ? styles.active : ''}`}>
            <Mic size={24} />
            <span>Rooms</span>
          </Link>
          
          <Link href="/people" className={`${styles.link} ${isActive('/people') ? styles.active : ''}`}>
            <Users size={24} />
            <span>People</span>
          </Link>
          
          <Link href="/profile" className={`${styles.link} ${isActive('/profile') ? styles.active : ''}`}>
            <User size={24} />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
} 