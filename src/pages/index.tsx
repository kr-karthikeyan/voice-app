import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';
import { Mic, Users, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import styles from '@/pages/landing.module.css';

interface CirclePosition {
  x: number;
  y: number;
}

export default function LandingPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [circlePositions, setCirclePositions] = useState<CirclePosition[]>([]);

  useEffect(() => {
    setIsVisible(true);
    // Set initial positions for animated circles
    setCirclePositions(
      Array(5).fill(null).map(() => ({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
      }))
    );
  }, []);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const features = [
    {
      icon: <Mic className={styles.featureIcon} />,
      title: "Voice Rooms",
      description: "Join live audio conversations with thought leaders and experts"
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: "Community",
      description: "Connect with like-minded individuals in your field of interest"
    },
    {
      icon: <MessageSquare className={styles.featureIcon} />,
      title: "Real-time Interaction",
      description: "Engage in meaningful discussions and share your insights"
    },
    {
      icon: <Sparkles className={styles.featureIcon} />,
      title: "Premium Experience",
      description: "Enjoy high-quality audio and professional networking"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <motion.section 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className={styles.logoContainer}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <Mic size={48} className={styles.logo} />
          <h1 className={styles.appName}>VoiceApp</h1>
        </motion.div>

        <motion.h2 
          className={styles.mainTitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Where Conversations Come to Life
        </motion.h2>

        <motion.p 
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Join the next generation of voice-based social networking
        </motion.p>

        <motion.button
          className={styles.ctaButton}
          onClick={handleGetStarted}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className={styles.buttonIcon} />
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className={styles.features}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
              }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Background Animation */}
      <div className={styles.backgroundAnimation}>
        {circlePositions.map((position, i) => (
          <motion.div
            key={i}
            className={styles.animatedCircle}
            initial={{ 
              x: position.x,
              y: position.y,
              scale: 0
            }}
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 0.2, 0.2, 0],
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
