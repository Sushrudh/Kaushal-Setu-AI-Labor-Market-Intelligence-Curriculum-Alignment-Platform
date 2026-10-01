import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldAlert, Lock, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

interface Props {
  requiredRole: UserRole;
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateToOwnPortal?: (role: UserRole) => void;
}

export const RoleGuard: React.FC<Props> = ({
  requiredRole,
  children,
  onNavigateHome,
  onNavigateToOwnPortal,
}) => {
  const { currentUser, openAuthModal, switchDemoRole } = useAuth();

  const getRoleName = (r: UserRole) => {
    switch (r) {
      case 'dsdc':
        return 'District Skill Development Committee (DSDC / Govt)';
      case 'employer':
        return 'Regional Industry & Employer';
      case 'institution':
        return 'Vocational Institution / ITI Principal';
      case 'student':
        return 'Student & Job Seeker Trainee';
    }
  };

  // 1. Unauthenticated Gate
  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#F9F8F3]">
        <div className="max-w-md w-full bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#191817]">
            Authentication Required
          </h3>
          <p className="text-xs text-[#81766D] leading-relaxed">
            Access to the <strong>{getRoleName(requiredRole)}</strong> requires authenticated credentials.
            Please sign in with your authorized stakeholder account or select an evaluator test persona.
          </p>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => openAuthModal(requiredRole)}
              className="w-full py-2.5 px-4 bg-[#E2EE58] hover:bg-[#d6e248] text-[#191817] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Sign In as {requiredRole.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full py-2 px-4 text-xs text-[#81766D] hover:text-[#191817] transition-colors"
            >
              Return to Public Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthorized Role Gate (RBAC Violation Attempt)
  if (currentUser.role !== requiredRole) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#F9F8F3]">
        <div className="max-w-lg w-full bg-[#FFFFFF] border border-[#E7E1D9] rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-semibold uppercase text-red-700">
              HTTP 403 Forbidden · RBAC Violation
            </span>
            <h3 className="text-xl font-serif font-bold text-[#191817]">
              Restricted Dashboard Authorization
            </h3>
          </div>
          <p className="text-xs text-[#81766D] leading-relaxed">
            This dashboard is strictly partitioned for <strong>{getRoleName(requiredRole)}</strong>.
            You are currently authenticated as <strong className="text-[#191817]">{currentUser.name}</strong> with assigned role: <span className="font-mono font-semibold text-[#191817]">{currentUser.role.toUpperCase()}</span>.
          </p>

          <div className="p-3 bg-[#F9F8F3] border border-[#E7E1D9] rounded-xl text-left text-xs text-[#81766D] space-y-1">
            <div className="font-semibold text-[#191817]">RBAC Security Policy:</div>
            <div>• Students cannot view or modify administrative DSDC budget allocations.</div>
            <div>• Employers cannot access private institutional faculty records.</div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            {onNavigateToOwnPortal && (
              <button
                onClick={() => onNavigateToOwnPortal(currentUser.role)}
                className="py-2.5 px-4 bg-[#191817] hover:bg-[#2C2B29] text-[#F9F8F3] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Go to My Authorized Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => switchDemoRole(requiredRole)}
              className="py-2.5 px-4 bg-[#E2EE58] hover:bg-[#d6e248] text-[#191817] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch to {requiredRole.toUpperCase()} Persona</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized — Render Protected Content
  return <>{children}</>;
};
