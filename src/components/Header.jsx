import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
];

export default function Header({ currentLanguage, onLanguageChange }) {
  const { t } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  return (
    <header className="animate-fade-in">
      <div className="glass-morphism rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-sacred-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🕉️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text font-sans">
                {t('app.title')}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-3 px-4 py-3 bg-white/80 hover:bg-white rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md min-w-[160px]"
            >
              <Globe className="w-5 h-5 text-primary-600" />
              <span className="flex-1 text-left font-medium text-gray-700">
                {currentLang.flag} {currentLang.nativeName}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50 animate-slide-up">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors flex items-center gap-3 ${
                      currentLanguage === lang.code ? 'bg-orange-50 text-primary-700 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="flex-1">{lang.nativeName}</span>
                    {currentLanguage === lang.code && (
                      <span className="text-primary-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
