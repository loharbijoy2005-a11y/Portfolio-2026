import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock, AlertTriangle, RefreshCw } from 'lucide-react';

interface AntiInspectShieldProps {
  children: React.ReactNode;
  isActive: boolean;
  onSecurityAlert?: (reason: string) => void;
}

export const AntiInspectShield: React.FC<AntiInspectShieldProps> = ({
  children,
  isActive,
  onSecurityAlert
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState<string>('');

  useEffect(() => {
    if (!isActive) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerLock('Right-Click / Context Menu access blocked by Anti-Inspect Shield.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 key
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        triggerLock('F12 Developer Tools keypress intercepted.');
        return false;
      }

      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Cmd+Option+I, Cmd+Option+J
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c' || e.key === 'U' || e.key === 'u'))
      ) {
        e.preventDefault();
        triggerLock(`Shortcut key combination (${e.key}) blocked by Anti-Inspect Shield.`);
        return false;
      }
    };

    // DevTools Dimension Detector
    const detectDevToolsWindow = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;

      if (widthDiff || heightDiff) {
        triggerLock('DevTools panel opening detected via window dimension delta.');
      }
    };

    // Debugger Timing Loop Trap
    const debuggerInterval = setInterval(() => {
      const startTime = performance.now();
      // Execute inline debugger timing benchmark
      // eslint-disable-next-line no-debugger
      debugger;
      const endTime = performance.now();

      if (endTime - startTime > 100) {
        triggerLock('Debugger breakpoint / pause detected via execution timing trap.');
      }
    }, 1000);

    const resizeInterval = setInterval(detectDevToolsWindow, 1500);

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(debuggerInterval);
      clearInterval(resizeInterval);
    };
  }, [isActive]);

  const triggerLock = (reason: string) => {
    setIsLocked(true);
    setLockReason(reason);
    if (onSecurityAlert) {
      onSecurityAlert(reason);
    }
  };

  const handleUnlockReset = () => {
    setIsLocked(false);
    setLockReason('');
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6 text-white select-none">
        <div className="max-w-md w-full bg-slate-900 border border-red-500/40 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
              <Lock className="w-3.5 h-3.5" /> SECURITY SHIELD ACTIVE
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Inspect & Tampering Blocked
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Developer tools, right-click inspect, and DOM tampering are strictly prohibited in the Admin Portal.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-left text-[11px] font-mono text-red-300 space-y-1">
            <div className="text-slate-500 font-bold uppercase text-[9px] flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-red-400" /> Security Intercept Log:
            </div>
            <div>{lockReason}</div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleUnlockReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Close Inspect Tools & Resume Secure Session</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
