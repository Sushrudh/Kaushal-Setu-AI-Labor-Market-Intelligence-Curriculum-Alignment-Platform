import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  onForgotPassword?: () => void;
  showForgotLink?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label = 'Password',
  id = 'password',
  value,
  onChange,
  placeholder = '••••••••••••',
  required = true,
  error,
  helperText,
  onForgotPassword,
  showForgotLink = false,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-center mb-1">
        {label && (
          <label htmlFor={id} className="text-xs font-medium text-[#191817] dark:text-[#F5F1E9]">
            {label}
          </label>
        )}
        {showForgotLink && onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[11px] text-[#4F8279] dark:text-[#76ABA2] hover:underline focus:outline-hidden"
          >
            Forgot?
          </button>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 pr-10 text-sm bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9] border ${
            error ? 'border-red-500' : 'border-[#E7E1D9] dark:border-[#33312E]'
          } rounded-md focus:outline-hidden focus:border-[#191817] dark:focus:border-[#F5ED78] transition-colors ${className}`}
          {...props}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#81766D] dark:text-[#B8B0A5] hover:text-[#191817] dark:hover:text-[#F5F1E9] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4F8279] rounded-r-md transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Eye className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {helperText && !error && (
        <p className="text-[10px] text-[#81766D] dark:text-[#B8B0A5]">{helperText}</p>
      )}
      {error && (
        <p className="text-[10px] text-red-500">{error}</p>
      )}
    </div>
  );
};
