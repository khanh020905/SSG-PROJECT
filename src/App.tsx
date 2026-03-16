import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextType from './components/TextType'
import HeroSection from './components/HeroSection'
import ProductShowcaseSection from './components/ProductShowcaseSection'
import BackgroundTrendsSection from './components/BackgroundTrendsSection'
import EInkTechnologySection from './components/EInkTechnologySection'
import MarketAnalysisSection from './components/MarketAnalysisSection'
import ProductBenefitsSection from './components/ProductBenefitsSection'
import TimelineSection from './components/TimelineSection'
import MarketingStrategySection from './components/MarketingStrategySection'
import MarketPotentialSection from './components/MarketPotentialSection'
import FinanceOverviewSection from './components/FinanceOverviewSection'
import Footer from './components/Footer'
import LightRays from './components/LightRays'
import CardNav from './components/CardNav'
import { speak, preloadVoices } from './utils/voice'
import netflixSfx from './assets/sfx/netflix-sfx.mp3'
import ssgLogo from './assets/ssg-logo.png'
import brandingVideo from './assets/video/brandingVideo.mp4'

/* ── Screen Shatter Transition ──
   The intro screen splits into horizontal slices that slide apart
   (odd left, even right) with glowing edges, revealing the landing page behind.
   This creates a "dimensional tear" effect unlike any other site. */

const SLICE_COUNT = 12

function ShatterOverlay({ onDone }: { onDone: () => void }) {
  const slices = Array.from({ length: SLICE_COUNT }, (_, i) => i)
  const sliceHeight = 100 / SLICE_COUNT

  useEffect(() => {
    const delays = Array.from(
      { length: SLICE_COUNT },
      (_, i) => 0.05 + Math.abs(i - SLICE_COUNT / 2) * 0.03
    )
    const longestDelay = Math.max(...delays)
    const totalDuration = (longestDelay + 0.8) * 1000 + 100
    const timer = window.setTimeout(onDone, totalDuration)

    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {slices.map((i) => {
        const direction = i % 2 === 0 ? 1 : -1
        const delay = 0.05 + Math.abs(i - SLICE_COUNT / 2) * 0.03 // center slices move first

        return (
          <motion.div
            key={i}
            className="absolute left-0 w-full overflow-hidden"
            style={{
              top: `${i * sliceHeight}%`,
              height: `${sliceHeight + 0.5}%`, // tiny overlap to prevent gaps
              background: 'black',
            }}
            initial={{ x: 0 }}
            animate={{ x: `${direction * 110}vw` }}
            transition={{
              duration: 0.8,
              delay,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Glowing edge on the tear side */}
            <motion.div
              className="absolute top-0 h-full w-[3px]"
              style={{
                [direction > 0 ? 'left' : 'right']: 0,
                background: `linear-gradient(180deg, 
                  transparent, 
                  rgba(139, 92, 246, 0.8), 
                  rgba(59, 130, 246, 0.6), 
                  transparent
                )`,
                boxShadow: `0 0 15px rgba(139, 92, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{ duration: 0.6, delay: delay }}
            />
          </motion.div>
        )
      })}

      {/* Central horizontal light burst at the split origin */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(139,92,246,0.8) 30%, rgba(255,255,255,0.9) 50%, rgba(59,130,246,0.8) 70%, transparent 90%)',
          boxShadow: '0 0 30px rgba(139,92,246,0.5), 0 0 60px rgba(59,130,246,0.3)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.3, 1], ease: 'easeOut' }}
      />

      {/* Brief flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />
    </div>
  )
}

/* ── Intro Screen ── */
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'gate' | 'hello' | 'welcome' | 'shatter'>('gate')

  // Preload voices and SFX on mount
  const sfxRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    preloadVoices()
    // Preload the SFX so it's ready to play
    const audio = new Audio(netflixSfx)
    audio.preload = 'auto'
    audio.volume = 1
    sfxRef.current = audio
  }, [])

  // User gesture gate — unlocks audio + speech on mobile/desktop
  const handleEnter = useCallback(() => {
    // 1. Unlock Web Audio API
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      // Create a short silent buffer and play it to unlock audio
      const buffer = ctx.createBuffer(1, 1, 22050)
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(ctx.destination)
      source.start(0)
      // Resume if suspended
      if (ctx.state === 'suspended') ctx.resume()
    } catch {
      // AudioContext not available — continue
    }

    // 2. Pre-warm Speech Synthesis with a silent utterance (user gesture context)
    try {
      const warmUp = new SpeechSynthesisUtterance('')
      warmUp.volume = 0
      window.speechSynthesis.speak(warmUp)
    } catch {
      // Speech API not available
    }

    // 3. Unlock the preloaded Netflix SFX by playing and immediately pausing
    if (sfxRef.current) {
      sfxRef.current.play().then(() => {
        sfxRef.current!.pause()
        sfxRef.current!.currentTime = 0
      }).catch(() => {})
    }

    // Transition to intro sequence
    setPhase('hello')
  }, [])

  // Speak when phase changes — with cleanup to prevent stale speech
  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'hello') {
      preloadVoices().then(() => {
        if (!cancelled) speak('Hello', { rate: 0.8, pitch: 1.15 })
      })
    } else if (phase === 'welcome') {
      timer = setTimeout(() => {
        if (!cancelled) speak('Welcome to the future', { rate: 0.75, pitch: 1.1 })
      }, 600)
    }

    return () => { cancelled = true; clearTimeout(timer) }
  }, [phase])

  const handleHelloComplete = useCallback(() => {
    setTimeout(() => setPhase('welcome'), 800)
  }, [])

  const handleWelcomeComplete = useCallback(() => {
    // Play preloaded Netflix SFX then trigger shatter
    if (sfxRef.current) {
      sfxRef.current.currentTime = 0
      sfxRef.current.play().catch(() => {})
    }
    setTimeout(() => setPhase('shatter'), 800)
  }, [])

  return (
    <>
      {phase === 'shatter' ? (
        <ShatterOverlay onDone={onComplete} />
      ) : phase === 'gate' ? (
        /* ── Tap-to-Enter Gate ── */
        <motion.div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
          onClick={handleEnter}
          onTouchEnd={(e) => { e.preventDefault(); handleEnter(); }}
        >
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
            }}
          />

          {/* SSG Logo */}
          <motion.img
            src={ssgLogo}
            alt="SSG Logo"
            className="w-20 h-20 md:w-28 md:h-28 mb-8 object-contain"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Pulsing prompt */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/30 flex items-center justify-center"
              animate={{
                scale: [1, 1.08, 1],
                borderColor: ['rgba(255,255,255,0.3)', 'rgba(139,92,246,0.6)', 'rgba(255,255,255,0.3)'],
                boxShadow: [
                  '0 0 0px rgba(139,92,246,0)',
                  '0 0 25px rgba(139,92,246,0.3)',
                  '0 0 0px rgba(139,92,246,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Play triangle */}
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="ml-1">
                <path d="M2 2L22 14L2 26V2Z" fill="white" fillOpacity="0.8" />
              </svg>
            </motion.div>

            <motion.p
              className="text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-light"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Tap to Enter
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden">
          {/* Light Rays Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.8}
              lightSpread={0.5}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>

          {/* Typing text */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'hello' && (
                <motion.div
                  key="hello"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <TextType
                    text={["Hello."]}
                    as="h1"
                    className="text-6xl md:text-8xl font-bold text-white"
                    typingSpeed={120}
                    pauseDuration={99999}
                    showCursor
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    cursorClassName="text-white/60"
                    loop={false}
                    onTypingComplete={handleHelloComplete}
                  />
                </motion.div>
              )}

              {phase === 'welcome' && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <TextType
                    text={["Welcome to the future."]}
                    as="h1"
                    className="text-4xl md:text-6xl font-light text-white/90 tracking-wide"
                    typingSpeed={60}
                    pauseDuration={99999}
                    showCursor
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    cursorClassName="text-white/40"
                    loop={false}
                    onTypingComplete={handleWelcomeComplete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip */}
          <motion.button
            className="absolute bottom-12 z-20 text-white/30 hover:text-white/60 text-sm tracking-widest uppercase cursor-pointer transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            onClick={() => setPhase('shatter')}
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </>
  )
}

/* ── Nav Items ── */
const navItems = [
  {
    label: 'Origin & Technology', bgColor: '#071526', textColor: '#fff',
    links: [
      { label: 'Product Showcase', ariaLabel: 'Product Showcase', href: '#product-showcase' },
      { label: 'Background & Trends', ariaLabel: 'Background Trends', href: '#background-trends' },
      { label: 'Breakthrough Technology', ariaLabel: 'E-Ink Technology', href: '#e-ink-technology' },
      { label: 'Remarkable Benefits', ariaLabel: 'Product Benefits', href: '#product-benefits' },
    ]
  },
  {
    label: 'Market & Investment', bgColor: '#0c2137', textColor: '#fff',
    links: [
      { label: 'Market Analysis', ariaLabel: 'Market Analysis', href: '#market-analysis' },
      { label: 'Market Potential', ariaLabel: 'Market Potential', href: '#market-potential' },
      { label: 'Financial Structure', ariaLabel: 'Finance Overview', href: '#finance-overview' },
    ]
  },
  {
    label: 'Roadmap & Development', bgColor: '#132e47', textColor: '#fff',
    links: [
      { label: 'Historical Milestones', ariaLabel: 'Timeline', href: '#timeline' },
      { label: 'Marketing Strategy', ariaLabel: 'Marketing Strategy', href: '#marketing-strategy' },
      { label: 'Contact Team', ariaLabel: 'Contact Footer', href: '#contact-team' },
    ]
  }
]

/* ── App ── */
function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      {/* Fixed Navbar — hidden during intro, visible after */}
      <CardNav
        logo={ssgLogo}
        logoAlt="SSG Glasses Logo"
        items={navItems}
        baseColor="rgba(10,10,10,0.6)"
        menuColor="#fff"
        buttonBgColor="#0369a1"
        buttonTextColor="#fff"
        ease="power3.out"
        visible={!showIntro}
        onVideoClick={() => setIsVideoOpen(true)}
      />

      {/* Main content */}
      <div className="relative">
        <HeroSection />
        <div id="product-showcase"><ProductShowcaseSection /></div>
        <div id="background-trends"><BackgroundTrendsSection /></div>
        <div id="e-ink-technology"><EInkTechnologySection /></div>
        <div id="market-analysis"><MarketAnalysisSection /></div>
        <div id="product-benefits"><ProductBenefitsSection /></div>
        <div id="timeline"><TimelineSection /></div>
        <div id="marketing-strategy"><MarketingStrategySection /></div>
        <div id="finance-overview"><FinanceOverviewSection /></div>
        <div id="market-potential"><MarketPotentialSection /></div>
        <div id="contact-team"><Footer /></div>
      </div>

      {/* Intro overlays on top, shatters to reveal hero */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#030712]/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            {/* Soft background glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[100px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(59,130,246,0.2) 50%, transparent 100%)'
              }}
            />

            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-all flex items-center gap-2 group z-[101] tracking-widest uppercase text-sm font-semibold"
              aria-label="Close video"
            >
              <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">CLOSE</span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/10 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-500">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-7xl aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10 relative z-10"
            >
               <video 
                 src={brandingVideo}
                 controls
                 autoPlay
                 className="w-full h-full object-cover"
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
