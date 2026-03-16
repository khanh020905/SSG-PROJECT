import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import BlurText from './BlurText'
import tiktokMarketing from '../assets/tiktok-marketing.png'
import facebookMarketing from '../assets/facebook-marketing.png'

export default function MarketingStrategySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax for the grainy background texture
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#111111] text-white pt-24 pb-32 overflow-hidden"
    >
      {/* Hard static background — never moves */}
      <div className="absolute inset-0 bg-[#111111] pointer-events-none" />

      {/* 
        Textured noise overlay (parallax, sits *on top* of the hard background) 
      */}
      <motion.div
        className="absolute inset-0 opacity-15 pointer-events-none z-0"
        style={{
          y: bgY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060a10] via-transparent to-[#060a10] pointer-events-none z-0" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-20 relative z-10 text-center">
        <BlurText
          text="Marketing Strategy"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 font-sans text-white/90"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl font-medium text-white/60 tracking-wider"
        >
          Leveraging digital platforms and influencers for engagement
        </motion.p>
      </div>

      {/* Zig-Zag Content Layout */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Row 1: TikTok (Image Left, Text Right) */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative group overflow-hidden bg-[#222222]"
          >
            <motion.img 
              src={tiktokMarketing} 
              alt="TikTok Marketing Strategy" 
              className="w-full h-full object-cover min-h-[400px] transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
            />
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blend-screen" />
          </motion.div>

          {/* Text Box */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-1/2 bg-[#333333] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white/90">TikTok</h3>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
              TikTok will be used to showcase the smart color-changing eyeglass frame through short, engaging videos that highlight its color-changing effect, stylish design, and personalization features. This platform is especially effective for reaching young, trend-conscious consumers in Vietnam and increasing brand visibility through viral content and influencer collaborations.
            </p>
          </motion.div>
        </div>

        {/* Row 2: Facebook (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row-reverse min-h-[500px]">
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative group overflow-hidden bg-[#222222]"
          >
            <motion.img 
              src={facebookMarketing} 
              alt="Facebook Marketing Dashboard" 
              className="w-full h-full object-cover min-h-[400px] transition-transform duration-1000 group-hover:scale-105 group-hover:brightness-110"
            />
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blend-screen" />
          </motion.div>

          {/* Text Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-1/2 bg-[#b0b0b0] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#111111]">Facebook</h3>
            <p className="text-lg md:text-xl text-[#333333] leading-relaxed font-semibold">
              Facebook will support brand communication by sharing product information, promotional campaigns, customer feedback, and lifestyle content related to the smart eyeglass frame. It can also help build trust, strengthen customer engagement, and reach a broader audience through targeted advertising and community interaction.
            </p>
          </motion.div>
        </div>

      </div>

      {/* Decorative arrow pointing down to next section */}
      <div className="absolute bottom-8 left-8 flex overflow-hidden opacity-50">
        <motion.div
           animate={{ x: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="text-4xl"
        >
          »
        </motion.div>
      </div>

    </section>
  )
}
