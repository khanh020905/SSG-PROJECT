import { motion } from 'framer-motion'
import BlurText from './BlurText'
import smartGlassesMan from '../assets/smart-glasses-man.png'
import ssgLogo from '../assets/ssg-logo.png'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

export default function BackgroundTrendsSection() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <img
          src={smartGlassesMan}
          alt="Man wearing E-Ink smart glasses"
          className="w-full h-full object-cover object-top grayscale"
        />
        {/* Overlay gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/40" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 md:py-24">
        {/* Top — Title */}
        <div>
          <BlurText
            text="BACKGROUND TRENDS"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-6"
          />

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl md:text-2xl text-white/60 font-light italic tracking-wide"
          >
            Fashion and Tech
          </motion.p>

          {/* Decorative line */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-4 h-px w-20 bg-gradient-to-r from-sky-400/60 to-transparent"
          />
        </div>

        {/* Middle — Description text */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-md ml-auto mr-0 md:mr-16 my-12 md:my-0"
        >
          <p className="text-sm md:text-base text-white/90 leading-relaxed md:leading-loose">
            Văn hóa giới trẻ Việt Nam đang hướng tới{' '}
            <strong className="text-white font-semibold">cá nhân hóa và lối sống công nghệ</strong>.
            Thời trang đang phát triển, phản ánh cá tính qua phong cách độc đáo.
            Xu hướng tùy biến đang lan rộng, giúp người tiêu dùng thể hiện bản thân.
            Việc ứng dụng công nghệ diễn ra nhanh chóng, với thiết bị đeo thông minh
            ngày càng phổ biến. Nhu cầu về sản phẩm sáng tạo và phong cách như
            Gọng Kính Đổi Màu E-Ink đang gia tăng, kết hợp tính thực dụng với thời trang.
          </p>
        </motion.div>

        {/* Bottom — Branding bar */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-end gap-4 pt-8 border-t border-white/10"
        >
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <img src={ssgLogo} alt="SSG Logo" className="w-8 h-8 object-contain" />
            <span className="text-lg md:text-xl font-bold tracking-[0.15em] text-white/90">
              LUMIVISION
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
