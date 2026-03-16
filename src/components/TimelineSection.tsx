import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import BlurText from './BlurText'
import designersWorkshop from '../assets/designers-workshop.png'

const timelineData = [
  {
    id: 1,
    phase: "Phase 1",
    title: "Research Phase",
    desc: "Research Phase focuses on understanding customer preferences for smart color-changing eyeglass frames, including design style, comfort, color-changing features, and price expectations in the Vietnamese market."
  },
  {
    id: 2,
    phase: "Phase 2",
    title: "Prototype Development",
    desc: "Prototype Development involves creating the first eyeglass frame designs and integrating the color-changing technology into a functional prototype. At this stage, the team will refine the frame's appearance, materials, and wearability."
  },
  {
    id: 3,
    phase: "Phase 3",
    title: "Testing Phase",
    desc: "Testing Phase evaluates the performance of the eyeglass frame, including comfort, durability, color-changing responsiveness, and user satisfaction. Feedback from potential users will be used to improve both function and design."
  },
  {
    id: 4,
    phase: "Phase 4",
    title: "Production Stage",
    desc: "Production Stage prepares the final eyeglass frame design for manufacturing, with attention to material quality, production cost, and consistency of the color-changing feature."
  },
  {
    id: 5,
    phase: "Phase 5",
    title: "Product Launch",
    desc: "Product Launch introduces the smart color-changing eyeglass frame to the market through promotional campaigns targeting young, fashion-conscious, and tech-savvy consumers in Vietnam."
  }
]

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the progress for the progress bar
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })



  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#060a10] text-white pt-12 md:pt-16 pb-24 overflow-x-clip"
    >
      {/* Background styling for consistency */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-16 relative z-10">
        <BlurText
          text="Timeline Overview"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-4 font-serif italic"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-32 bg-gradient-to-r from-blue-400/60 to-transparent"
        />
      </div>

      {/* Sticky Horizontal Timeline Bar */}
      <div className="sticky top-24 z-20 pt-6 pb-6 w-full backdrop-blur-md bg-[#060a10]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 relative">
          {/* The Track */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/10 -translate-y-1/2 rounded-full" />
          
          {/* The Progress Fill */}
          <motion.div 
            className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 -translate-y-1/2 rounded-full"
            style={{ 
              width: "100%",
              scaleX: smoothProgress, 
              transformOrigin: "left" 
            }}
          />

          {/* Nodes */}
          <div className="relative flex justify-between items-center w-full">
            {timelineData.map((item, index) => {
              // We'll calculate an exact threshold for each node (0, 0.25, 0.5, 0.75, 1)
              const threshold = index / (timelineData.length - 1)
              // Node lights up when progress passes its threshold
              const isPast = useTransform(smoothProgress, (v) => v >= threshold - 0.05)
              
              return (
                <div key={item.id} className="flex flex-col items-center gap-3 relative">
                  {/* Phase Text Above */}
                  <motion.span 
                    className={`absolute -top-8 text-xs md:text-sm font-semibold tracking-widest uppercase whitespace-nowrap ${
                      index === 0 ? 'left-0 origin-left' :
                      index === timelineData.length - 1 ? 'right-0 origin-right' :
                      'left-1/2 -translate-x-1/2 origin-center'
                    }`}
                    style={{ 
                      color: isPast ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
                      textShadow: isPast ? "0 0 10px rgba(59,130,246,0.5)" : "none"
                    }}
                  >
                    {item.phase}
                  </motion.span>
                  
                  {/* Diamond Node */}
                  <motion.div 
                    className="w-4 h-4 md:w-5 md:h-5 rotate-45 border-2 transition-colors duration-300 relative z-10 bg-[#060a10]"
                    style={{
                      borderColor: isPast ? "rgba(59,130,246,1)" : "rgba(255,255,255,0.2)"
                    }}
                  >
                    {/* Inner glow if active */}
                    <motion.div 
                      className="absolute inset-0 bg-blue-500"
                      style={{ opacity: isPast ? 1 : 0 }}
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mt-16 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left: Sticky Image */}
          <div className="w-full md:w-[45%] md:sticky md:top-32 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden border border-white/5 relative group">
            {/* Parallax Image */}
            <motion.img 
              src={designersWorkshop} 
              alt="Craftsman designing glasses" 
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            {/* Overlays to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a10] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060a10]/30 via-transparent to-transparent" />
            
            {/* Subtle glow behind image container */}
            <div className="absolute -inset-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
          </div>

          {/* Right: Scrolling Content Blocks */}
          <div className="w-full md:w-[55%] pb-[30vh]">
            {timelineData.map((item, index) => {
              // Creating a component isolated to its own scroll progress
              return (
                <PhaseBlock 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  total={timelineData.length} 
                />
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

function PhaseBlock({ item, index, total }: { item: any, index: number, total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Track scroll progress *relative to this specific block* entering/leaving the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"] // Starts animating when top hits 80% screen, finishes when top hits 20%
  })

  // We want the block to fade in, move up, and light up as it scrolls into view
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1])
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(8px)", "blur(0px)"])
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1])
  
  // Highlight title logic
  const titleColor = useTransform(
    scrollYProgress, 
    [0.4, 0.8], 
    ["rgba(255,255,255,0.5)", "rgba(59,130,246,1)"] // Fades blue
  )

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, y, filter: blur, scale, transformOrigin: 'top left' }}
      className={`relative min-h-[40vh] flex flex-col justify-center ${index === total - 1 ? 'mb-0' : 'mb-20'}`}
    >
      {/* Visual Accent line on the left of text */}
      <motion.div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-full"
        style={{ 
          height: useTransform(scrollYProgress, [0.5, 1], ["0%", "80%"]),
          opacity: useTransform(scrollYProgress, [0.5, 1], [0, 1])
        }}
      />
      
      <div className="pl-6 md:pl-10">
        <motion.h3 
          className="text-3xl md:text-5xl font-bold mb-4 font-serif"
          style={{ color: titleColor }}
        >
          {item.title}
        </motion.h3>
        
        <p className="text-lg md:text-xl text-white/70 leading-relaxed italic border-l border-white/10 pl-4 py-2">
          {item.desc}
        </p>

        {/* Decorative elements */}
        <div className="mt-8 flex gap-2">
           {[...Array(3)].map((_, i) => (
             <motion.div 
               key={i}
               style={{ opacity: useTransform(scrollYProgress, [0.7 + i*0.1, 1], [0, 1]) }}
               className="w-1.5 h-1.5 rounded-full bg-white/20"
             />
           ))}
        </div>
      </div>
    </motion.div>
  )
}
