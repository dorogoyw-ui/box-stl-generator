import { createContext, useContext, useState,  ReactNode } from 'react'
import { translations, Language, Translations } from './translations'

const I18nContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
})

const LANGUAGE_STORAGE_KEY = 'box-generator-language'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return (saved === 'en' || saved === 'ru') ? saved : 'en'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }

  const t = translations[language]

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
