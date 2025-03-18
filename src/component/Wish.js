import React, { useEffect } from 'react'

import { useState } from "react";
import { motion } from "framer-motion";
//import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";
import "../styles.css";

function Wish() {
  const [revealed, setRevealed] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    document.title = "Happy Birthday Poulomi 🎂💖";
    const bgMusic = new Audio("https://drive.google.com/file/d/10t0cfTJr6ihyFWYrr0Ix_ZVeSxPZu2df/view?usp=sharing");
    bgMusic.loop = true; // Loop music
    setAudio(bgMusic);

    // Try playing immediately (some browsers block autoplay)
    bgMusic.play().catch(() => {
      console.log("Autoplay blocked, waiting for user interaction.");
    });

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []);

  const startMusic = () => {
    if (audio) audio.play();
  };

  return (
    <div className="body-container" onClick={startMusic}>
      {/* Floating Sparkles for a celebratory effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="sparkle"
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 2, repeat: Infinity }}
          style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 1.5 + 1}rem` }}
        >
          <Sparkles />
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="wish-card"
      >
        {!revealed ? (
          <motion.button 
            onClick={() => setRevealed(true)} 
            className="reveal-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Tap to Reveal 🎉✨
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg"
          >
            <h1 className="text-animation">Happy Birthday! 🎂🎈</h1>
            <p className="mt-3 text-lg">Wishing you a day as amazing and special as you are! 💖</p>
            <p className="mt-1 text-lg">Hope this year brings you endless joy and success! ✨</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: revealed ? 1 : 0 }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="heart"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: "100vh", opacity: 1 }}
            transition={{ duration: Math.random() * 3 + 2, delay: Math.random() * 2, repeat: Infinity }}
            style={{ left: `${Math.random() * 100}%`, fontSize: `${Math.random() * 2 + 1}rem` }}
          >
            <Heart />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Wish
