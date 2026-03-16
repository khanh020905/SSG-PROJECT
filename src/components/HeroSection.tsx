import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/video/Eyeglasses_floating_in_midair_delpmaspu_.mp4";
import GradientText from "./GradientText";
import BlurText from "./BlurText";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure seamless looping
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8 md:px-16 lg:px-24 w-full">
        {/* Main Title */}
        <div className="flex flex-wrap items-center justify-center gap-x-[0.25em] text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 md:whitespace-nowrap">
          <BlurText
            text="Gọng Kính"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-white m-0"
          />
          <motion.div
            initial={{ filter: "blur(10px)", opacity: 0, y: -50 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="m-0"
          >
            <GradientText
              colors={["#38bdf8", "#a78bfa", "#34d399", "#f472b6", "#38bdf8"]}
              animationSpeed={4}
              className="text-5xl md:text-7xl lg:text-8xl font-bold inline-block"
            >
              Đổi Màu
            </GradientText>
          </motion.div>
        </div>

        {/* Tagline */}
        <BlurText
          text="Thay đổi tương lai — Gọng kính thông minh thích ứng với mọi điều kiện ánh sáng."
          delay={50}
          animateBy="words"
          direction="top"
          className="text-xl md:text-2xl text-white/70 font-light tracking-wide mb-14 max-w-2xl justify-center"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(14, 165, 233, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 cursor-pointer transition-all text-lg animate-[gradientShift_3s_ease_infinite] bg-[length:200%_200%]"
            style={{
              backgroundImage: "linear-gradient(135deg, #7c3aed, #ec4899, #f59e0b, #7c3aed)",
            }}
          >
            Khám Phá Ngay
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-semibold rounded-xl backdrop-blur-sm cursor-pointer transition-all text-lg"
          >
            Tìm Hiểu Thêm
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">
          Cuộn xuống
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
          animate={{
            borderColor: ["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
