import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ showLabel = false, className = '' }) => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg text-[#81766D] dark:text-[#B8B0A5] hover:text-[#191817] dark:hover:text-[#F5F1E9] hover:bg-[#F3EEE6] dark:hover:bg-[#292723] transition-colors flex items-center gap-2 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F8279] ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F5ED78] transition-transform rotate-0 scale-100" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-[#191817] transition-transform rotate-0 scale-100" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
