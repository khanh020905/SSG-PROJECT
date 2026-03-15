/**
 * Futuristic woman voice narration using Web Speech API.
 * Selects a female English voice and adjusts pitch/rate for a futuristic feel.
 */

let voicesLoaded = false
let cachedVoice: SpeechSynthesisVoice | null = null

function getFemaleVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice

  const voices = window.speechSynthesis.getVoices()
  // Prefer these high-quality female voices
  const preferred = [
    'Microsoft Zira',
    'Google UK English Female',
    'Google US English',
    'Samantha',
    'Karen',
    'Moira',
    'Tessa',
    'Fiona',
    'Victoria',
    'Zira',
  ]

  for (const name of preferred) {
    const match = voices.find(v => v.name.includes(name))
    if (match) {
      cachedVoice = match
      return match
    }
  }

  // Fallback: find any English female-sounding voice
  const englishVoice = voices.find(
    v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.includes('Zira') || v.name.includes('Hazel'))
  )
  if (englishVoice) {
    cachedVoice = englishVoice
    return englishVoice
  }

  // Last fallback: any English voice
  const anyEnglish = voices.find(v => v.lang.startsWith('en'))
  if (anyEnglish) cachedVoice = anyEnglish
  return anyEnglish || null
}

export function preloadVoices(): Promise<void> {
  return new Promise((resolve) => {
    if (voicesLoaded) { resolve(); return }

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      voicesLoaded = true
      resolve()
      return
    }

    window.speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true
      resolve()
    }

    // Timeout fallback
    setTimeout(() => {
      voicesLoaded = true
      resolve()
    }, 2000)
  })
}

export function speak(text: string, options?: { rate?: number; pitch?: number }): void {
  try {
    window.speechSynthesis.cancel() // cancel any previous speech

    const utterance = new SpeechSynthesisUtterance(text)
    const voice = getFemaleVoice()
    if (voice) utterance.voice = voice

    utterance.rate = options?.rate ?? 0.85   // slightly slower = futuristic
    utterance.pitch = options?.pitch ?? 1.1  // slightly higher = feminine
    utterance.volume = 1

    window.speechSynthesis.speak(utterance)
  } catch {
    // Speech API not available — silently continue
  }
}
