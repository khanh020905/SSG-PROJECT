import { motion } from "framer-motion";
import LightRays from "./LightRays";

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Light Rays Background */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={2}
          rayLength={8}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0}
          distortion={0}
          pulsating={true}
          fadeDistance={0.8}
          saturation={1.2}
        />
      </div>
      {/* CTA Section */}
      <div className="pt-24 pb-16 px-8 md:px-16 lg:px-24 flex flex-col items-center text-center">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Tương lai của gọng kính bắt đầu từ đây.
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Gọng kính đổi màu thông minh — thích ứng mọi điều kiện ánh sáng, bảo
          vệ đôi mắt của bạn mọi lúc mọi nơi.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="px-8 py-4 bg-[#d4f34a] hover:bg-[#c5e43b] text-black font-semibold rounded-xl cursor-pointer transition-colors text-lg">
            Khám Phá Ngay
          </button>
          <button className="px-8 py-4 border border-white/30 hover:border-white/50 hover:bg-white/5 text-white font-semibold rounded-xl cursor-pointer transition-all text-lg">
            Tìm Hiểu Thêm
          </button>
        </motion.div>
      </div>

      {/* Info Section */}
      <div className="pb-12 px-8 md:px-16 lg:px-24 flex flex-col items-center text-center space-y-8">
        <motion.p
          className="text-sm tracking-[0.3em] uppercase text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Gọng Kính Đổi Màu — Dự Án SSG tại FPT University
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-white/40 mb-1">
            Địa chỉ:
          </p>
          <p className="text-sm tracking-[0.2em] uppercase text-white/70">
            FPT University, Khu CNC Đà Nẵng
          </p>
        </motion.div>
      </div>

      {/* Giant Brand Text */}
      <div className="relative pb-24">
        <motion.h2
          className="text-[12vw] md:text-[14vw] font-black text-white/[0.04] leading-none text-center select-none tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          LUMIVISION
        </motion.h2>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-8 md:px-16 lg:px-24 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs text-white/30 tracking-wider uppercase">
          <p>© 2026 All rights reserved.</p>
          <p>SSG Project — FPT University</p>
        </div>
        <div className="text-xs text-white/30 tracking-wider uppercase text-right flex flex-col items-end gap-1">
          <p>
            Designed by:{" "}
            <span className="text-white/50 hover:text-sky-400 transition-colors cursor-pointer">
              SSG Team
            </span>
          </p>
          <p className="text-white/30 hover:text-white/50 transition-colors cursor-pointer">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
}
