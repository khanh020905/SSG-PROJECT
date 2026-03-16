import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from './BlurText'
import { useRef } from 'react'
import fashionWomen from '../assets/fashion-women.png'
import rainbowGlasses from '../assets/rainbow-glasses.png'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

const benefits = [
  {
    icon: '🎨',
    title: 'Tùy Chỉnh Không Giới Hạn',
    desc: 'Thay đổi màu gọng kính theo trang phục, tâm trạng hoặc sự kiện chỉ bằng một chạm.',
  },
  {
    icon: '💎',
    title: 'Thể Hiện Cá Tính',
    desc: 'Giảm nhu cầu sở hữu nhiều cặp kính — một sản phẩm, vô vàn phong cách.',
  },
  {
    icon: '⚡',
    title: 'Công Nghệ Tiên Tiến',
    desc: 'Kết hợp thiết kế hiện đại với công nghệ E-Ink, tạo nên sản phẩm độc nhất vô nhị.',
  },
  {
    icon: '🌍',
    title: 'Tiềm Năng Toàn Cầu',
    desc: 'Thu hút người dùng tại Việt Nam và có khả năng phát triển ra thị trường quốc tế.',
  },
]

export default function ProductBenefitsSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section className="relative text-white overflow-hidden">
      {/* Dark background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #060a10 0%, #0b1018 40%, #0e1420 70%, #060a10 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-12 md:pt-16 pb-12 md:pb-16">
          <BlurText
            text="Product Benefits"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/40 font-light italic tracking-wide mb-2"
          >
            fashion versatility
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-gradient-to-r from-pink-400/60 to-transparent"
          />
        </div>

        {/* ── Hero Fashion Photo — parallax ── */}
        <motion.div
          ref={heroRef}
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(300px, 50vw, 600px)' }}
        >
          <motion.img
            src={fashionWomen}
            alt="Stylish women wearing smart glasses"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ scale: imgScale, y: imgY }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a10] via-transparent to-[#060a10]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a10]/50 via-transparent to-[#060a10]/50" />
        </motion.div>

        {/* ── Product Image + Description ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center"
          >
            {/* Left — Rainbow Glasses Image (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="md:col-span-2 relative group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                <img
                  src={rainbowGlasses}
                  alt="Rainbow color-changing glasses"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              {/* Subtle glow under the image */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-pink-500/10 rounded-full blur-2xl" />
            </motion.div>

            {/* Right — Description Text (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="md:col-span-3"
            >
              <p className="text-base md:text-lg text-white/80 leading-relaxed md:leading-loose italic">
                Gọng kính đổi màu thông minh mang đến sự kết hợp độc đáo giữa{' '}
                <strong className="text-white font-semibold not-italic">phong cách và chức năng</strong>.
                Cho phép người dùng dễ dàng tùy chỉnh diện mạo, thích ứng với mọi môi trường và sở thích.
                Được thiết kế cho người tiêu dùng sành điệu, gọng kính giúp thể hiện cá tính
                và giảm nhu cầu sở hữu nhiều cặp kính. Bằng cách kết hợp công nghệ tiên tiến
                với thiết kế hiện đại, sản phẩm đã thu hút đông đảo người dùng tại Việt Nam
                và có tiềm năng vươn ra thế giới.
              </p>

              <div className="my-8 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              {/* Scroll chevrons */}
              <motion.div
                className="flex gap-1"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {[0.3, 0.5, 0.8].map((opacity, i) => (
                  <svg key={i} width="10" height="16" viewBox="0 0 8 14" fill="none">
                    <path d="M1 1L6 7L1 13" stroke="white" strokeWidth="1.5" opacity={opacity} />
                  </svg>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Benefits Grid ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pb-12 md:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * i }}
                className="group relative p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-pointer border border-white/[0.05] hover:border-pink-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.005))',
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-pink-200 transition-colors duration-300">
                    {b.title}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {b.desc}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-gradient-to-r from-pink-500/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
