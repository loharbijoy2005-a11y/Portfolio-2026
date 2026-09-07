import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const whatsappUrl = "https://wa.me/919242725326?text=Hi%20Bijoy%20Lohar!%20I'd%20like%20to%20discuss%20a%20web%20engineering%20project%20with%20Shadow%20Arrow.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-300 flex items-center gap-2 group active:scale-95"
      aria-label="Direct WhatsApp Contact"
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-white" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-100 leading-none">
          Direct Founder WA
        </span>
        <span className="text-xs font-extrabold text-white leading-tight mt-0.5">
          Bijoy Lohar
        </span>
      </div>
    </a>
  );
};
