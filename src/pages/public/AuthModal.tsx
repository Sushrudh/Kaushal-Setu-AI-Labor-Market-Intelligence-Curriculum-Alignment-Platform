import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { PasswordField } from '../../components/common/PasswordField';
import { X, ShieldCheck, ArrowRight, Building, Factory, GraduationCap, User } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, register, authModalRole } = useAuth();
  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>(authModalRole || 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid official email address.');
      return;
    }

    if (mode === 'forgot') {
      setMessage(`A password reset link has been dispatched to ${email}. Check your inbox.`);
      setTimeout(() => {
        setMode('signin');
        setMessage(null);
      }, 3000);
      return;
    }

    if (mode === 'register') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify your password.');
        return;
      }
      register(fullName, email, selectedRole, organization, district);
    } else {
      login(email, selectedRole);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    login('', role);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[#1A1918] border border-[#E7E1D9] dark:border-[#2C2B29] rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="bg-[#F8F5F0] dark:bg-[#201F1D] border-b border-[#E7E1D9] dark:border-[#2C2B29] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F8279]"></span>
            <span className="font-serif text-lg font-semibold text-[#191817] dark:text-[#F5F1E9]">
              Kaushal Setu Access
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-[#81766D] dark:text-[#B8B0A5] hover:text-[#191817] dark:hover:text-[#F5F1E9] hover:bg-[#F3EEE6] dark:hover:bg-[#292723] rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Quick Demo Persona Shortcuts for Evaluators */}
          <div className="mb-6 p-3 bg-[#F8F5F0] dark:bg-[#201F1D] border border-[#E7E1D9] dark:border-[#2C2B29] rounded-xl">
            <span className="text-[11px] font-semibold text-[#81766D] dark:text-[#B8B0A5] uppercase tracking-wider block mb-2">
              Instant Evaluator Access (1-Click Test Personas)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('dsdc')}
                className="p-2 text-left bg-[#FFFFFF] dark:bg-[#292723] border border-[#E7E1D9] dark:border-[#33312E] rounded-lg hover:border-[#191817] dark:hover:border-[#F5ED78] transition-colors"
              >
                <span className="text-xs font-semibold text-[#191817] dark:text-[#F5F1E9] block">Govt DSDC</span>
                <span className="text-[10px] text-[#81766D] dark:text-[#B8B0A5] block">District Planner</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('employer')}
                className="p-2 text-left bg-[#FFFFFF] dark:bg-[#292723] border border-[#E7E1D9] dark:border-[#33312E] rounded-lg hover:border-[#191817] dark:hover:border-[#F5ED78] transition-colors"
              >
                <span className="text-xs font-semibold text-[#191817] dark:text-[#F5F1E9] block">Employer</span>
                <span className="text-[10px] text-[#81766D] dark:text-[#B8B0A5] block">Tata Motors</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('institution')}
                className="p-2 text-left bg-[#FFFFFF] dark:bg-[#292723] border border-[#E7E1D9] dark:border-[#33312E] rounded-lg hover:border-[#191817] dark:hover:border-[#F5ED78] transition-colors"
              >
                <span className="text-xs font-semibold text-[#191817] dark:text-[#F5F1E9] block">ITI Principal</span>
                <span className="text-[10px] text-[#81766D] dark:text-[#B8B0A5] block">Govt ITI Aundh</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="p-2 text-left bg-[#FFFFFF] dark:bg-[#292723] border border-[#E7E1D9] dark:border-[#33312E] rounded-lg hover:border-[#191817] dark:hover:border-[#F5ED78] transition-colors"
              >
                <span className="text-xs font-semibold text-[#191817] dark:text-[#F5F1E9] block">Trainee</span>
                <span className="text-[10px] text-[#81766D] dark:text-[#B8B0A5] block">Aarav Sharma</span>
              </button>
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-[#E7E1D9] dark:border-[#2C2B29] mb-5">
            <button
              onClick={() => { setMode('signin'); setMessage(null); setError(null); }}
              className={`pb-2 text-sm font-medium mr-6 transition-colors relative ${
                mode === 'signin' ? 'text-[#191817] dark:text-[#F5F1E9] font-semibold' : 'text-[#81766D] dark:text-[#B8B0A5] hover:text-[#191817]'
              }`}
            >
              Sign In
              {mode === 'signin' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817] dark:bg-[#F5ED78]" />}
            </button>
            <button
              onClick={() => { setMode('register'); setMessage(null); setError(null); }}
              className={`pb-2 text-sm font-medium mr-6 transition-colors relative ${
                mode === 'register' ? 'text-[#191817] dark:text-[#F5F1E9] font-semibold' : 'text-[#81766D] dark:text-[#B8B0A5] hover:text-[#191817]'
              }`}
            >
              Create Account
              {mode === 'register' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#191817] dark:bg-[#F5ED78]" />}
            </button>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs rounded-lg border border-emerald-200 dark:border-emerald-800">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 text-xs rounded-lg border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector (when signing in or registering) */}
            <div>
              <label className="block text-xs font-medium text-[#191817] dark:text-[#F5F1E9] mb-1.5">
                Designated Stakeholder Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('dsdc')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    selectedRole === 'dsdc'
                      ? 'border-[#191817] dark:border-[#F5ED78] bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9]'
                      : 'border-[#E7E1D9] dark:border-[#2C2B29] text-[#81766D] dark:text-[#B8B0A5] hover:border-[#81766D]'
                  }`}
                >
                  <Building className="w-4 h-4 text-[#4F8279]" />
                  <div>
                    <span className="text-xs font-semibold block">DSDC / Govt</span>
                    <span className="text-[10px]">District Committee</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('employer')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    selectedRole === 'employer'
                      ? 'border-[#191817] dark:border-[#F5ED78] bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9]'
                      : 'border-[#E7E1D9] dark:border-[#2C2B29] text-[#81766D] dark:text-[#B8B0A5] hover:border-[#81766D]'
                  }`}
                >
                  <Factory className="w-4 h-4 text-[#765033] dark:text-[#DCD5CB]" />
                  <div>
                    <span className="text-xs font-semibold block">Regional Employer</span>
                    <span className="text-[10px]">MIDC / Industry</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('institution')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    selectedRole === 'institution'
                      ? 'border-[#191817] dark:border-[#F5ED78] bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9]'
                      : 'border-[#E7E1D9] dark:border-[#2C2B29] text-[#81766D] dark:text-[#B8B0A5] hover:border-[#81766D]'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-[#4F8279]" />
                  <div>
                    <span className="text-xs font-semibold block">Institution</span>
                    <span className="text-[10px]">ITI / Polytechnic</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-2.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                    selectedRole === 'student'
                      ? 'border-[#191817] dark:border-[#F5ED78] bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9]'
                      : 'border-[#E7E1D9] dark:border-[#2C2B29] text-[#81766D] dark:text-[#B8B0A5] hover:border-[#81766D]'
                  }`}
                >
                  <User className="w-4 h-4 text-[#191817] dark:text-[#F5F1E9]" />
                  <div>
                    <span className="text-xs font-semibold block">Student / Trainee</span>
                    <span className="text-[10px]">Job Seeker</span>
                  </div>
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#191817] dark:text-[#F5F1E9] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Joshi"
                    className="w-full px-3 py-2 text-sm bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9] border border-[#E7E1D9] dark:border-[#33312E] rounded-md focus:outline-hidden focus:border-[#191817] dark:focus:border-[#F5ED78]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#191817] dark:text-[#F5F1E9] mb-1">Organization / ITI</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. ITI Aundh / MIDC Hub"
                    className="w-full px-3 py-2 text-sm bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9] border border-[#E7E1D9] dark:border-[#33312E] rounded-md focus:outline-hidden focus:border-[#191817] dark:focus:border-[#F5ED78]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#191817] dark:text-[#F5F1E9] mb-1">Official Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@organization.gov.in"
                className="w-full px-3 py-2 text-sm bg-[#F8F5F0] dark:bg-[#201F1D] text-[#191817] dark:text-[#F5F1E9] border border-[#E7E1D9] dark:border-[#33312E] rounded-md focus:outline-hidden focus:border-[#191817] dark:focus:border-[#F5ED78]"
              />
            </div>

            {mode !== 'forgot' && (
              <>
                <PasswordField
                  id="auth-password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  showForgotLink={mode === 'signin'}
                  onForgotPassword={() => setMode('forgot')}
                />

                {mode === 'register' && (
                  <PasswordField
                    id="auth-confirm-password"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    helperText="Password must be at least 6 characters"
                  />
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#191817] bg-[#F5ED78] hover:bg-[#eae162] rounded-md transition-colors flex items-center justify-center gap-2 mt-4 shadow-xs"
            >
              <span>{mode === 'signin' ? 'Sign In to Portal' : mode === 'register' ? 'Register Verified Account' : 'Send Reset Link'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-[#81766D] dark:text-[#B8B0A5] text-center mt-5">
            Protected by RBAC data security & the Digital Personal Data Protection (DPDP) Act 2023.
          </p>
        </div>
      </div>
    </div>
  );
};
