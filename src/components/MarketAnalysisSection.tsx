import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from './BlurText'
import { useRef } from 'react'
import groupGlasses from '../assets/group-glasses.png'
import designersWorkshop from '../assets/designers-workshop.png'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}


export default function MarketAnalysisSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section className="relative text-white overflow-hidden">
      {/* Dark marble background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #060a10 0%, #0a0e16 40%, #0d1218 70%, #060a10 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16">
          <BlurText
            text="Market Analysis"
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
            Young Population Demand
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-gradient-to-r from-violet-400/60 to-transparent"
          />
        </div>

        {/* ── Hero Group Photo — parallax ── */}
        <motion.div
          ref={heroRef}
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative w-full overflow-hidden"
          style={{ height: 'clamp(500px, 70vw, 800px)' }}
        >
          <motion.img
            src={groupGlasses}
            alt="Young people wearing colorful smart glasses"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ scale: imgScale, y: imgY }}
          />
          {/* Gradient fades top & bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060a10] via-transparent to-[#060a10]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060a10]/60 via-transparent to-[#060a10]/60" />
        </motion.div>


        {/* ── Bottom: Workshop Image + Description ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-12 md:pb-16">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            {/* Left — Workshop Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">
                <img
                  src={designersWorkshop}
                  alt="Designers working on glasses prototypes"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Right — Market Description */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            >
              <p className="text-base md:text-lg text-white/80 leading-relaxed md:leading-loose italic">
                Việt Nam sở hữu tiềm năng thị trường mạnh mẽ cho gọng kính đổi màu thông minh.
                Với dân số trẻ đông đảo và sự quan tâm ngày càng tăng đến{' '}
                <strong className="text-white font-semibold not-italic">
                  thời trang, công nghệ và sản phẩm cá nhân hóa
                </strong>
                , thị trường hoàn toàn phù hợp với đổi mới sáng tạo này.
                Sản phẩm kết hợp phong cách, chức năng và khả năng tùy chỉnh,
                đặc biệt thu hút người tiêu dùng trẻ, am hiểu công nghệ tại Việt Nam.
              </p>

              {/* Separator */}
              <div className="my-8 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              {/* Key insight pills */}
              <div className="flex flex-wrap gap-3">
                {['Thị trường mới nổi', 'Dân số trẻ', 'Xu hướng cá nhân hóa', 'Tech-savvy'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-4 py-2 rounded-full text-violet-300/80 bg-violet-500/10 border border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
