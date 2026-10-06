import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface OwnerPasscodeModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const OwnerPasscodeModal: React.FC<OwnerPasscodeModalProps> = ({
  onSuccess,
  onClose,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = passcode.trim();
    // Secret owner password strictly set to 'uday99'
    if (cleanPin === 'uday99') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div
        className="bg-[#111827] border border-white/20 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <Lock className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-base font-bold text-white font-display">
              Owner Verification
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your private passcode to access portfolio editing.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
              Secret Passcode
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                className={`w-full bg-[#0a0e1a] border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors pr-10 ${
                  error
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/20 focus:border-blue-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                title={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Incorrect passcode. Access denied.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            <span>Verify & Unlock</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
