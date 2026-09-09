import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  X, 
  Rocket, 
  Sparkles, 
  UserCheck, 
  Code2, 
  Calculator,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audioFX';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Shadow Arrow Developer Terminal v2.6.0',
    'Type a command or click an option below to execute.'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundEngine.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open palette
          (window as any).__openCommandPalette?.();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const commands = [
    {
      id: 'gst',
      name: 'GST Tax Calculator & B2B Billing',
      desc: 'Jump to GST simulator and tax invoice specs',
      icon: <Calculator className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onNavigate('process');
        addLog('Navigating to B2B GST Tax Calculator & Compliance...');
      }
    },
    {
      id: 'contact',
      name: 'Direct Founder Consultation',
      desc: 'Connect 1-on-1 with founder Bijoy Lohar',
      icon: <UserCheck className="w-4 h-4 text-blue-400" />,
      action: () => {
        onNavigate('contact');
        addLog('Opening Founder Consultation scheduler...');
      }
    },
    {
      id: 'confetti',
      name: 'Trigger Celebratory Confetti Burst',
      desc: 'Launch festive engineering achievement confetti',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      action: () => {
        soundEngine.playSuccess();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        addLog('🎉 Confetti burst triggered successfully!');
      }
    },
    {
      id: 'projects',
      name: 'Explore Production Portfolio',
      desc: 'Browse Next.js 15, FastAPI, and Supabase apps',
      icon: <Code2 className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onNavigate('work');
        addLog('Navigating to Portfolio Showcase...');
      }
    },
    {
      id: 'founder',
      name: 'Founder Philosophy & GitHub Activity',
      desc: 'View real-time commit logs and lead developer bio',
      icon: <Rocket className="w-4 h-4 text-purple-400" />,
      action: () => {
        onNavigate('founder');
        addLog('Navigating to Founder Bio & Live Activity...');
      }
    }
  ];

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-4), `> ${msg}`]);
  };

  const filteredCommands = commands.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.desc.toLowerCase().includes(query.toLowerCase()) ||
      c.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleExecute = (cmd: typeof commands[0]) => {
    soundEngine.playClick();
    cmd.action();
    setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden font-sans"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="font-bold text-white">Shadow Arrow CLI</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px]">Press ESC to exit</span>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-900/90">
            <Search className="w-4 h-4 text-blue-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search (e.g. gst, contact, confetti, projects)..."
              autoFocus
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none font-mono"
            />
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              Ctrl+K
            </span>
          </div>

          {/* Output Terminal Log Window */}
          <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800/80 font-mono text-[11px] text-emerald-400 space-y-1 max-h-24 overflow-y-auto">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span>{log}</span>
              </div>
            ))}
          </div>

          {/* Commands List */}
          <div className="p-3 max-h-80 overflow-y-auto space-y-1.5 bg-slate-900">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleExecute(cmd)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="w-full text-left flex items-center justify-between p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/80 border border-slate-800/60 hover:border-blue-500/50 transition-all duration-150 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:border-blue-400/80 transition-colors">
                      {cmd.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {cmd.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {cmd.desc}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-blue-400">
                    <span>Execute</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 font-mono">
                No matching command found. Type "help" or "confetti".
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
