import { motion } from 'framer-motion'
import BlurText from './BlurText'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
}

const techSteps = [
  {
    number: '01',
    title: 'E-Ink Display Layer',
    subtitle: 'Embedded Microcapsule Technology',
    description:
      'Lớp E-Ink được nhúng trực tiếp vào bề mặt gọng kính, chứa hàng triệu vi nang (microcapsules) với các hạt sắc tố đen và trắng phản ứng với điện trường.',
    highlights: ['Microcapsules', 'Black & White Pigments', 'Frame Surface Integration'],
    color: '#38bdf8',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Glasses outline */}
        <path d="M10 35C10 28 15 22 25 22H55C65 22 70 28 70 35V40C70 47 65 53 55 53H25C15 53 10 47 10 40V35Z" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <path d="M35 37H45" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        {/* Microcapsule zoom */}
        <circle cx="25" cy="37" r="4" fill="currentColor" opacity="0.15" />
        <circle cx="25" cy="37" r="2" fill="currentColor" opacity="0.6" />
        <circle cx="55" cy="37" r="4" fill="currentColor" opacity="0.15" />
        <circle cx="55" cy="37" r="2" fill="currentColor" opacity="0.6" />
        {/* Layer lines */}
        <path d="M15 60L65 60" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        <path d="M18 64L62 64" stroke="currentColor" strokeWidth="0.8" opacity="0.15" />
        <path d="M20 68L60 68" stroke="currentColor" strokeWidth="0.8" opacity="0.1" />
        {/* Dots representing microcapsules */}
        {[20, 28, 36, 44, 52, 60].map((x) => (
          <circle key={x} cx={x} cy="60" r="1.5" fill="currentColor" opacity="0.4" />
        ))}
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Electric Field Control',
    subtitle: 'Bi-stable State Switching',
    description:
      'Khi dòng điện được áp dụng, các hạt sắc tố di chuyển tạo ra trạng thái đen (Black State) hoặc trắng (White State), cho phép thay đổi màu gọng kính theo ý muốn.',
    highlights: ['Black State', 'White State', 'Electric Current'],
    color: '#a78bfa',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Two circles representing states */}
        <circle cx="25" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="25" cy="40" r="8" fill="currentColor" opacity="0.7" />
        <circle cx="55" cy="40" r="16" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="55" cy="40" r="8" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        {/* Arrow between */}
        <path d="M36 33L44 40L36 47" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        {/* Lightning bolt */}
        <path d="M38 20L42 18L40 24L44 22L38 32L40 26L36 28L38 20Z" fill="currentColor" opacity="0.3" />
        {/* Labels */}
        <text x="25" y="65" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="6" fontWeight="600">BLACK</text>
        <text x="55" y="65" textAnchor="middle" fill="currentColor" opacity="0.4" fontSize="6" fontWeight="600">WHITE</text>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Low Power Consumption',
    subtitle: 'Zero Power to Maintain',
    description:
      'E-Ink chỉ tiêu thụ năng lượng khi thay đổi màu sắc. Sau khi chuyển đổi, gọng kính giữ nguyên màu mà không cần nguồn điện — tiết kiệm pin tối đa.',
    highlights: ['Zero Standby Power', 'Battery Efficient', 'Color Hold'],
    color: '#34d399',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Battery */}
        <rect x="12" y="25" width="20" height="35" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="18" y="20" width="8" height="5" rx="1.5" fill="currentColor" opacity="0.3" />
        <text x="22" y="47" textAnchor="middle" fill="currentColor" opacity="0.6" fontSize="10" fontWeight="bold">0</text>
        <text x="22" y="55" textAnchor="middle" fill="currentColor" opacity="0.3" fontSize="5" fontWeight="600">POWER</text>
        {/* Arrow */}
        <path d="M38 42L48 42" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M46 38L50 42L46 46" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        {/* Lightning bolt power icon */}
        <circle cx="62" cy="42" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M60 34L65 34L62 41L66 41L58 52L61 44L57 44L60 34Z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Smart Control System',
    subtitle: 'Microcontroller & App Integration',
    description:
      'Hệ thống điều khiển thông minh gồm vi xử lý siêu nhỏ, pin compact, ăng-ten tích hợp, nút bấm trên gọng và ứng dụng di động — mang lại trải nghiệm liền mạch.',
    highlights: ['Microcontroller', 'Bluetooth', 'Mobile App', 'On-Frame Button'],
    color: '#fb923c',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
        {/* Chip / microcontroller */}
        <rect x="28" y="28" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <rect x="33" y="33" width="14" height="14" rx="1" fill="currentColor" opacity="0.15" />
        {/* Chip pins */}
        {[34, 40, 46].map((pos) => (
          <g key={pos}>
            <line x1={pos} y1="28" x2={pos} y2="22" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            <line x1={pos} y1="52" x2={pos} y2="58" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            <line x1="28" y1={pos} x2="22" y2={pos} stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
            <line x1="52" y1={pos} x2="58" y2={pos} stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
          </g>
        ))}
        {/* Signal waves */}
        <path d="M60 20C64 24 64 32 60 36" stroke="currentColor" strokeWidth="1" opacity="0.25" />
        <path d="M64 17C70 23 70 35 64 39" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        {/* Phone icon */}
        <rect x="12" y="60" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="18" cy="74" r="1" fill="currentColor" opacity="0.3" />
        {/* Connection line */}
        <path d="M24 69L28 65" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.2" />
      </svg>
    ),
  },
]

export default function EInkTechnologySection() {
  return (
    <section
      className="relative text-white py-24 md:py-32"
      style={{
        background: `linear-gradient(180deg, #060a10 0%, #0a0f18 30%, #0d1420 60%, #060a10 100%)`,
      }}
    >
      {/* Decorative marble-like noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-violet-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* ── Section Header ── */}
        <div className="mb-16 md:mb-24">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.4em] text-sky-400/70 mb-4"
          >
            How It Works
          </motion.p>
          <BlurText
            text="Proposal: E-Ink Technology"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6"
          />
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-gradient-to-r from-sky-400/60 to-transparent"
          />
        </div>

        {/* ── Tech Cards — Scroll Stack ── */}
        <div className="relative" style={{ paddingBottom: '5vh' }}>
          {techSteps.map((step, i) => {
            const isLast = i === techSteps.length - 1
            return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={`${isLast ? 'relative' : 'sticky'} mb-6 md:mb-8`}
              style={{
                top: isLast ? undefined : `${120 + i * 24}px`,
                zIndex: i + 1,
              }}
            >
              <div
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, #131a27, #0e1420)`,
                  border: `1px solid rgba(255,255,255,0.08)`,
                  boxShadow: `0 ${10 + i * 4}px ${40 + i * 10}px rgba(0,0,0,${0.4 + i * 0.1})`,
                  transform: `scale(${1 - i * 0.015})`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl md:rounded-3xl"
                  style={{
                    background: `radial-gradient(ellipse at 30% 50%, ${step.color}08, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-col md:flex-row items-stretch">
                  {/* Left — Icon Area */}
                  <div
                    className="flex-shrink-0 w-full md:w-64 lg:w-80 p-8 md:p-10 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${step.color}08, transparent)`,
                    }}
                  >
                    {/* Large step number watermark */}
                    <div
                      className="absolute -top-4 -left-2 text-[120px] md:text-[160px] font-black leading-none select-none pointer-events-none"
                      style={{ color: step.color, opacity: 0.06 }}
                    >
                      {step.number}
                    </div>

                    {/* SVG Icon */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40" style={{ color: step.color }}>
                      {step.icon}
                    </div>

                    {/* Animated ring behind icon on hover */}
                    <motion.div
                      className="absolute w-48 h-48 rounded-full border opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ borderColor: `${step.color}20` }}
                      animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 180, 360] }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>

                  {/* Right — Content */}
                  <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    {/* Step indicator + title */}
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                        style={{
                          color: step.color,
                          background: `${step.color}15`,
                          border: `1px solid ${step.color}30`,
                        }}
                      >
                        Step {step.number}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/40 italic mb-4">{step.subtitle}</p>

                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6 max-w-xl">
                      {step.description}
                    </p>

                    {/* Highlight pills */}
                    <div className="flex flex-wrap gap-2">
                      {step.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] md:text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300"
                          style={{
                            color: `${step.color}cc`,
                            background: `${step.color}10`,
                            border: `1px solid ${step.color}20`,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-px w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                  style={{
                    background: `linear-gradient(to right, ${step.color}60, ${step.color}20, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          )})}
        </div>

        {/* ── Bottom scroll indicator ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mt-16 md:mt-24"
        >
          <motion.div
            className="flex gap-1"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[0.3, 0.5, 0.8].map((opacity, i) => (
              <svg key={i} width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L6 7L1 13" stroke="white" strokeWidth="1.5" opacity={opacity} />
              </svg>
            ))}
          </motion.div>
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Tiếp tục khám phá</span>
        </motion.div>
      </div>
    </section>
  )
}
