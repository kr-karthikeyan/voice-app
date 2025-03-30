import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Compass, User, Mic, Settings } from 'lucide-react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/home" className={styles.logo}>
            <Mic size={24} />
            VoiceApp
          </Link>
          <nav className={styles.nav}>
            <Link 
              href="/home" 
              className={`${styles.navLink} ${router.pathname === '/home' ? styles.navLinkActive : ''}`}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              href="/explore" 
              className={`${styles.navLink} ${router.pathname === '/explore' ? styles.navLinkActive : ''}`}
            >
              <Compass size={18} />
              Explore
            </Link>
            <Link 
              href="/profile" 
              className={`${styles.navLink} ${router.pathname === '/profile' ? styles.navLinkActive : ''}`}
            >
              <User size={18} />
              Profile
            </Link>
            <Link 
              href="/settings" 
              className={`${styles.navLink} ${router.pathname === '/settings' ? styles.navLinkActive : ''}`}
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Product</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/features" className={styles.footerLink}>Features</Link></li>
              <li><Link href="/pricing" className={styles.footerLink}>Premium</Link></li>
              <li><Link href="/security" className={styles.footerLink}>Security</Link></li>
              <li><Link href="/apps" className={styles.footerLink}>Mobile Apps</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link href="/blog" className={styles.footerLink}>Blog</Link></li>
              <li><Link href="/careers" className={styles.footerLink}>Careers</Link></li>
              <li><Link href="/press" className={styles.footerLink}>Press Kit</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Resources</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/help" className={styles.footerLink}>Help Center</Link></li>
              <li><Link href="/community" className={styles.footerLink}>Community</Link></li>
              <li><Link href="/guidelines" className={styles.footerLink}>Guidelines</Link></li>
              <li><Link href="/api" className={styles.footerLink}>Developers</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Legal</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={styles.footerLink}>Terms of Service</Link></li>
              <li><Link href="/cookies" className={styles.footerLink}>Cookie Policy</Link></li>
              <li><Link href="/compliance" className={styles.footerLink}>Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} VoiceApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 