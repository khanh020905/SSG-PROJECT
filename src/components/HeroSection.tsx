import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import heroVideo from "../assets/video/Eyeglasses_floating_in_midair_delpmaspu_.mp4";
import GradientText from "./GradientText";

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
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 whitespace-nowrap"
        >
          Gọng Kính{" "}
          <GradientText
            colors={["#0ea5e9", "#22d3ee", "#2dd4bf", "#0ea5e9"]}
            animationSpeed={6}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
          >
            Đổi Màu
          </GradientText>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-white/70 font-light tracking-wide mb-14 max-w-2xl"
        >
          Thay đổi tương lai — Gọng kính thông minh thích ứng với mọi điều kiện
          ánh sáng.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(14, 165, 233, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 cursor-pointer transition-all text-lg animate-[gradientShift_4s_ease_infinite] bg-[length:200%_200%]"
            style={{
              backgroundImage: "linear-gradient(135deg, #0369a1, #0ea5e9, #06b6d4, #0369a1)",
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
