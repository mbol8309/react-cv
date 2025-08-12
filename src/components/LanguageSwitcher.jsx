import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mouseLeaveTimer, setMouseLeaveTimer] = useState(null);
  const currentLanguage = i18n.language;
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'es', name: 'es', short: 'es' },
    { code: 'en', name: 'en', short: 'en' }
  ];

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar después de 1 segundo al salir del mouse
  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 1000);
    setMouseLeaveTimer(timer);
  };

  const handleMouseEnter = () => {
    if (mouseLeaveTimer) {
      clearTimeout(mouseLeaveTimer);
      setMouseLeaveTimer(null);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div 
      className="language-switcher" 
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <button 
        className="current-language"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <FaGlobe className="language-icon" />
        <span className="language-short">{currentLanguage.toLowerCase()}</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="language-short">{lang.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}