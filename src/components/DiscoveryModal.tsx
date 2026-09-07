import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 2:00 PM IST');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [booked, setBooked] = useState<boolean>(false);

  if (!isOpen) return null;

  const timeslots = [
    'Tomorrow, 11:00 AM IST',
    'Tomorrow, 2:00 PM IST',
    'Tomorrow, 5:30 PM IST',
    'Wednesday, 12:00 PM IST',
    'Wednesday, 4:00 PM IST'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {booked ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Discovery Call Scheduled!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We have reserved <strong>{selectedDate}</strong> for your engineering call with <strong>Bijoy Lohar</strong>. A Google Meet invitation link has been dispatched to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md"
            >
              Done & Return to Portfolio
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>30-Minute Architecture Audit</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Book a Direct Call with Bijoy Lohar
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Discuss your technical requirements, estimated timelines, and GST invoice billing.
              </p>
            </div>

            {/* Slot Picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Available Slot:
              </label>
              <div className="space-y-2">
                {timeslots.map((slot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(slot)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                      selectedDate === slot
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{slot}</span>
                    </div>
                    {selectedDate === slot && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* User Details */}
            <form onSubmit={handleBooking} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bijoy Lohar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Your Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Google Meet Booking</span>
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>No commitment required • Direct Founder Technical Call</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
