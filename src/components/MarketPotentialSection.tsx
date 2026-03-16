import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from './BlurText'

import marbleBg from '../assets/finance-marble-bg.png' // Re-using the same marble background texture
import marketBanner from '../assets/market-glasses-banner.png'
import marketPortrait from '../assets/market-trendy-portrait.png'

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
}

export default function MarketPotentialSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Subtle parallax for the main banner image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section 
      ref={sectionRef}
      className="relative text-white py-24 md:py-32 overflow-hidden"
    >
      {/* ── Background: Marble Texture ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${marbleBg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark gradient overlay to ensure contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#060a10]/60 via-[#060a10]/80 to-black/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        
        {/* ── Header ── */}
        <div className="mb-12 md:mb-16">
          <BlurText
            text="Market Potential"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl md:text-6xl lg:text-7xl font-serif italic tracking-wider text-white/90 mb-4"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/50 tracking-[0.2em] font-light uppercase"
          >
            Untapped Opportunity
          </motion.p>
        </div>

        {/* ── Banner Image ── */}
        <motion.div
           {...fadeUp}
           transition={{ duration: 0.8, delay: 0.15 }}
           className="w-full relative overflow-hidden rounded-xl md:rounded-2xl mb-16 md:mb-24 shadow-2xl shadow-black/50"
           style={{ height: 'clamp(300px, 40vw, 500px)' }}
        >
          <motion.img 
            src={marketBanner}
            alt="Colorful smart glasses on abstract paint background"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ y: imgY, scale: 1.1 }}
          />
          {/* Subtle vignette on banner */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* ── Content Grid (Image + Text) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
               <img 
                 src={marketPortrait} 
                 alt="Edgy trendy Asian fashion icon popstar wearing clear smart glasses"
                 className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.05]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            {/* Scroll Decoration Icon (matching user screenshot) */}
            <motion.div 
              className="absolute -bottom-10 left-4 text-white/40 flex"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="13 17 18 12 13 7"></polyline>
                 <polyline points="6 17 11 12 6 7"></polyline>
               </svg>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-8 lg:pl-8"
          >
            <p className="text-base md:text-xl lg:text-2xl text-white/70 leading-relaxed md:leading-[1.8] font-light">
              <strong className="text-white font-medium">The Vietnamese market offers strong potential</strong> for smart color-changing eyeglass frames. Growing interest in fashionable, customizable, and technology-driven products creates favorable conditions for this innovation.
              <br/><br/>
              Designed to match local consumer preferences, the product combines style, functionality, and personalization, making it especially appealing to young, <strong className="text-white font-medium">tech-savvy consumers in Vietnam.</strong>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
