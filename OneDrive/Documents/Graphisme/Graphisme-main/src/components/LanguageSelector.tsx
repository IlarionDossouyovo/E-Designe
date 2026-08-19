'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { Language, languageNames, languageFlags, countryToLanguage, getAllTranslations, Translations } from '@/lib/i18n/translations'

// Language Context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')
  const [translations, setTranslations] = useState<Translations>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get stored language or detect from browser
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language
      if (stored && languageNames[stored]) {
        setLanguageState(stored)
      } else {
        const browserLang = navigator.language.split('-')[0] as Language
        if (languageNames[browserLang]) {
          setLanguageState(browserLang)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    setTranslations(getAllTranslations(language))
  }, [language, mounted])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Language Selector Component
export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = Object.entries(languageNames) as [Language, string][]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Globe className="w-4 h-4 text-gold" />
        <span className="text-white text-sm hidden sm:inline">
          {languageFlags[language]} {languageNames[language]}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl overflow-hidden z-50">
            {languages.map(([code, name]) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-white/10 transition-colors ${
                  language === code ? 'bg-gold/20 text-gold' : 'text-white'
                }`}
              >
                <span>{languageFlags[code]}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
