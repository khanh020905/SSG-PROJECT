import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TextType from './components/TextType'
import HeroSection from './components/HeroSection'
import ProductShowcaseSection from './components/ProductShowcaseSection'
import Footer from './components/Footer'
import LightRays from './components/LightRays'
import CardNav from './components/CardNav'
import { speak, preloadVoices } from './utils/voice'
import netflixSfx from './assets/sfx/netflix-sfx.mp3'
import ssgLogo from './assets/ssg-logo.png'

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
  const [phase, setPhase] = useState<'hello' | 'welcome' | 'shatter'>('hello')

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
  }, [onComplete])

  return (
    <>
      {phase === 'shatter' ? (
        <ShatterOverlay onDone={onComplete} />
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
    label: 'Sản Phẩm', bgColor: '#071526', textColor: '#fff',
    links: [
      { label: 'Gọng Kính Đổi Màu', ariaLabel: 'Gọng kính đổi màu' },
      { label: 'Tròng Kính', ariaLabel: 'Tròng kính' },
      { label: 'Phụ Kiện', ariaLabel: 'Phụ kiện' },
    ]
  },
  {
    label: 'Về Chúng Tôi', bgColor: '#0c2137', textColor: '#fff',
    links: [
      { label: 'Dự Án SSG', ariaLabel: 'Dự án SSG' },
      { label: 'Đội Ngũ', ariaLabel: 'Đội ngũ' },
    ]
  },
  {
    label: 'Liên Hệ', bgColor: '#132e47', textColor: '#fff',
    links: [
      { label: 'Email', ariaLabel: 'Email' },
      { label: 'Facebook', ariaLabel: 'Facebook' },
      { label: 'Instagram', ariaLabel: 'Instagram' },
    ]
  }
]

/* ── App ── */
function App() {
  const [showIntro, setShowIntro] = useState(true)

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
      />

      {/* Main content */}
      <div className="relative">
        <HeroSection />
        <ProductShowcaseSection />
        <Footer />
      </div>

      {/* Intro overlays on top, shatters to reveal hero */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
