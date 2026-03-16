import { motion } from 'framer-motion'
import BlurText from './BlurText'

// Model photos
import modelRed from '../assets/models/model-red.png'
import modelTeal from '../assets/models/model-teal.png'
import modelYellow from '../assets/models/model-yellow.png'
import modelClear from '../assets/models/model-clear.png'
import modelBlue from '../assets/models/model-blue.png'
import modelPink from '../assets/models/model-pink.png'
import modelPurple from '../assets/models/model-purple.png'
import modelGreen from '../assets/models/model-green.png'
import colorfulGlasses from '../assets/colorful-glasses.png'

const modelPhotos = [
  {
    src: modelRed, alt: 'Model wearing red glasses', color: '#ef4444',
    name: 'Crimson Edge', tag: 'Bold',
    features: ['E-Ink Frame Technology', 'UV 400 Protection'],
  },
  {
    src: modelTeal, alt: 'Model wearing teal glasses', color: '#14b8a6',
    name: 'Aqua Shift', tag: 'Signature',
    features: ['Auto Light Adaptation', 'Prescription Compatible'],
  },
  {
    src: modelYellow, alt: 'Model wearing yellow glasses', color: '#eab308',
    name: 'Solar Amber', tag: 'Limited',
    features: ['8-Second Transition', 'Featherlight Frame'],
  },
  {
    src: modelClear, alt: 'Model wearing clear glasses', color: '#94a3b8',
    name: 'Crystal Clear', tag: 'Classic',
    features: ['Blue-Light Filter', 'Anti-Glare Coating'],
  },
  {
    src: modelBlue, alt: 'Model wearing blue glasses', color: '#3b82f6',
    name: 'Neon Horizon', tag: 'Tech',
    features: ['Smart Color Memory', 'UV 400 Protection'],
  },
  {
    src: modelPink, alt: 'Model wearing pink glasses', color: '#ec4899',
    name: 'Rose Luxe', tag: 'Elegant',
    features: ['Fashion Collab Series', 'Premium Acetate'],
  },
  {
    src: modelPurple, alt: 'Model wearing purple glasses', color: '#a855f7',
    name: 'Violet Zenith', tag: 'Premium',
    features: ['Dual-Mode Lens', 'Auto Darkening'],
  },
  {
    src: modelGreen, alt: 'Model wearing green glasses', color: '#22c55e',
    name: 'Forest Elite', tag: 'Eco',
    features: ['Recycled Materials', 'Polarized Option'],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

export default function ProductShowcaseSection() {
  return (
    <section
      className="relative text-white py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, #060a10 0%, #0d1117 15%, #111820 50%, #0d1117 85%, #060a10 100%),
          url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")
        `,
      }}
    >
      {/* Subtle glow orbs */}
      <div className="absolute top-20 left-1/4 w-[700px] h-[700px] bg-sky-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/3 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-20">
          <BlurText
            text="Executive Summary"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white tracking-tight mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/40 font-light italic tracking-wide"
          >
            Product Overview
          </motion.p>
          {/* Decorative line */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 h-px w-24 bg-gradient-to-r from-sky-400/60 to-transparent"
          />
        </div>

        {/* ── Photo Grid — 4 columns × 2 rows ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-20 md:mb-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {modelPhotos.map((photo, i) => (
              <motion.div
                key={photo.alt}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.05 * i, ease: 'easeOut' }}
                className="group relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
                style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06)` }}
              >
                {/* Base Image */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                />

                {/* Persistent dark vignette at bottom for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* ── Glassmorphism Overlay — slides up on hover ── */}
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                  {/* Frosted glass panel */}
                  <div
                    className="m-2 md:m-3 rounded-xl md:rounded-2xl p-3 md:p-4"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))`,
                      backdropFilter: 'blur(16px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                      border: `1px solid rgba(255,255,255,0.18)`,
                      boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 20px ${photo.color}22`,
                    }}
                  >
                    {/* Color dot + name row */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white/20"
                        style={{ backgroundColor: photo.color }}
                      />
                      <span className="text-white font-semibold text-xs md:text-sm leading-tight truncate">
                        {photo.name}
                      </span>
                      {/* Badge */}
                      <span
                        className="ml-auto text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          color: photo.color,
                          background: `${photo.color}22`,
                          border: `1px solid ${photo.color}44`,
                        }}
                      >
                        {photo.tag}
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px mb-2 rounded-full"
                      style={{ background: `linear-gradient(to right, ${photo.color}60, transparent)` }}
                    />

                    {/* Feature bullets */}
                    <ul className="space-y-1">
                      {photo.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-1.5">
                          <svg
                            className="flex-shrink-0 mt-0.5"
                            width="8" height="8" viewBox="0 0 8 8" fill="none"
                          >
                            <circle cx="4" cy="4" r="3" fill={photo.color} opacity="0.9" />
                          </svg>
                          <span className="text-white/75 text-[10px] md:text-xs leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Colored border glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${photo.color}50` }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Product Description Section ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          {/* Left — Product Image with glow effect */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative group"
          >
            {/* Ambient glow behind the image */}
            <div className="absolute inset-0 -m-8 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] p-4 md:p-6 backdrop-blur-sm">
              <img
                src={colorfulGlasses}
                alt="E-Ink Color-Changing Glasses"
                className="w-full h-auto rounded-xl transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            {/* Floating color dots decoration */}
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-violet-500"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </motion.div>

          {/* Right — Description Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="text-base md:text-lg text-white/60 leading-relaxed md:leading-loose font-light">
              Gọng Kính Đổi Màu E-Ink mang đến sự kết hợp độc đáo giữa{' '}
              <strong className="text-white font-semibold">thời trang và công nghệ</strong>,
              thu hút người tiêu dùng trẻ, am hiểu công nghệ tại Việt Nam.
              Sản phẩm đột phá này cho phép người dùng tùy chỉnh màu sắc và thiết kế
              gọng kính một cách dễ dàng, đáp ứng nhu cầu ngày càng tăng về phụ kiện
              thời trang cá nhân hóa. Đề xuất của chúng tôi phác thảo sự phù hợp với thị trường
              và tiềm năng của sản phẩm trong bối cảnh năng động của Việt Nam.
            </p>

            {/* Separator */}
            <div className="my-8 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '8+', label: 'Màu sắc' },
                { value: '< 1s', label: 'Chuyển đổi' },
                { value: '100%', label: 'Chống UV' },
                { value: 'E-Ink', label: 'Công nghệ' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
