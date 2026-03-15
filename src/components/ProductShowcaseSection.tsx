import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import glassesIndoor from '../assets/glasses-indoor.png'
import glassesOutdoor from '../assets/glasses-outdoor.png'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

const features = [
  {
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/20 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#2dd4bf"/></linearGradient></defs>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      </div>
    ),
    title: 'Bảo vệ UV 100%',
    desc: 'Tự động chặn tia UV có hại khi ra ngoài trời',
  },
  {
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-400/20 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
    ),
    title: 'Chuyển đổi 8 giây',
    desc: 'Phản ứng nhanh với sự thay đổi ánh sáng',
  },
  {
    icon: (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-400/20 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#grad3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#a855f7"/></linearGradient></defs>
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
        </svg>
      </div>
    ),
    title: 'Tròng kính Rx',
    desc: 'Tương thích với mọi đơn kính thuốc',
  },
]

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const indoorX = useTransform(scrollYProgress, [0, 0.5], [-60, 0])
  const outdoorX = useTransform(scrollYProgress, [0, 0.5], [60, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060a10] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 mb-16 md:mb-24">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.4em] text-sky-400 mb-4"
        >
          Công Nghệ Photochromic
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6"
        >
          Gọng Kính
          <br />
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
            Đổi Màu Thông Minh
          </span>
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          Tròng kính tự động thích ứng — trong suốt khi ở trong nhà, chuyển sang
          màu tối khi ra ngoài nắng. Bảo vệ đôi mắt 24/7.
        </motion.p>
      </div>

      {/* Comparison Cards */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 mb-20 md:mb-28">
        <motion.div style={{ scale }} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Indoor Card */}
          <motion.div
            style={{ x: indoorX }}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f5f0e8] to-[#ece3d5] aspect-[4/3] cursor-pointer"
          >
            {/* Image */}
            <img
              src={glassesIndoor}
              alt="Kính trong suốt khi ở trong nhà"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute top-6 left-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium text-slate-800 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Trong nhà
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Trong Suốt Hoàn Toàn
              </h3>
              <p className="text-white/70 text-sm md:text-base">
                Tròng kính giữ nguyên độ trong khi ở trong nhà hoặc nơi ánh sáng yếu
              </p>
            </div>
          </motion.div>

          {/* Outdoor Card */}
          <motion.div
            style={{ x: outdoorX }}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#87CEEB] to-[#d4a574] aspect-[4/3] cursor-pointer"
          >
            {/* Image */}
            <img
              src={glassesOutdoor}
              alt="Kính đổi màu khi ra ngoài nắng"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badge */}
            <div className="absolute top-6 left-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 backdrop-blur-sm text-sm font-medium text-amber-800 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Ngoài trời
              </div>
            </div>

            {/* UV indicator */}
            <div className="absolute top-6 right-6">
              <div className="px-3 py-1.5 rounded-full bg-red-500/80 backdrop-blur-sm text-xs font-bold text-white shadow-lg">
                UV ☀️
              </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Đổi Màu Tự Động
              </h3>
              <p className="text-white/70 text-sm md:text-base">
                Tròng kính chuyển tối khi tiếp xúc ánh nắng, bảo vệ mắt khỏi tia UV
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Arrow indicator between cards */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <div className="h-px w-12 bg-white/20" />
          <div className="flex items-center gap-2 text-white/40 text-sm tracking-wider uppercase">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            Phản ứng với ánh sáng
          </div>
          <div className="h-px w-12 bg-white/20" />
        </motion.div>
      </div>

      {/* Features Strip */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-sky-500/20 hover:bg-sky-500/[0.03] transition-all duration-500"
            >
              <div className="mb-4">{f.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-2">{f.title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/0 to-cyan-400/0 group-hover:from-sky-500/5 group-hover:to-cyan-400/5 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
