import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldCheck, UserCheck, RefreshCw } from 'lucide-react';

interface Props {
  onNavigateToPortal?: (role: UserRole) => void;
  onNavigateHome?: () => void;
}

export const DemoPersonaBanner: React.FC<Props> = ({ onNavigateToPortal, onNavigateHome }) => {
  const { currentUser, switchDemoRole } = useAuth();

  const personas: { role: UserRole | null; label: string; badge: string }[] = [
    { role: null, label: 'Public Visitor', badge: 'Overview' },
    { role: 'dsdc', label: 'DSDC Govt', badge: 'Collectorate' },
    { role: 'employer', label: 'Employer', badge: 'Tata Motors' },
    { role: 'institution', label: 'ITI Principal', badge: 'Govt ITI' },
    { role: 'student', label: 'Trainee', badge: 'NSQF 4' },
  ];

  return (
    <div className="bg-[#191817] text-[#DCD5CB] border-b border-[#2C2B29] text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F5ED78]" />
          <span className="font-medium text-[#F8F5F0]">Role-Based Access Demo</span>
          <span className="hidden sm:inline text-[#81766D]">· Switch stakeholder perspective to test verified RBAC workflows:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {personas.map((p) => {
            const isActive = (!currentUser && p.role === null) || (currentUser && currentUser.role === p.role);
            return (
              <button
                key={p.label}
                onClick={() => {
                  switchDemoRole(p.role);
                  if (p.role && onNavigateToPortal) {
                    onNavigateToPortal(p.role);
                  } else if (!p.role && onNavigateHome) {
                    onNavigateHome();
                  }
                }}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#F5ED78] text-[#191817] font-semibold shadow-xs'
                    : 'bg-[#262422] text-[#DCD5CB] hover:bg-[#343230] hover:text-white'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] ${isActive ? 'text-[#765033]' : 'text-[#81766D]'}`}>
                  ({p.badge})
                </span>
              </button>
            );
          })}

          {currentUser && (
            <span className="text-[11px] text-[#4F8279] font-medium hidden md:inline ml-2 flex items-center gap-1">
              <UserCheck className="w-3 h-3" />
              Active: {currentUser.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
