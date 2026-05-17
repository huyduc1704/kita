'use client';

import { Phone, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call in case the page is already scrolled on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-consultation-modal'));
  };

  return (
    <>
      {/* KHU VỰC BÊN TRÁI: Các nút liên hệ & Nhận tư vấn */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 items-start">
        {/* Nút Gọi điện */}
        <a
          href="tel:0827972555"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 border border-amber-400 text-white shadow-lg transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          aria-label="Call Hotline"
        >
          <span className="absolute left-14 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md">
            Hotline: 0827.972.555
          </span>
          {/* Pulsing rings */}
          <span className="absolute inset-0 rounded-full bg-amber-500/35 animate-ping scale-110"></span>
          <span className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping delay-500 scale-125"></span>
          <Phone size={20} className="relative z-10 animate-bounce" />
        </a>

        {/* Nút Zalo Chat */}
        <a
          href="https://zalo.me/0827972555"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 border border-amber-400 text-white shadow-lg transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          aria-label="Zalo Kita Home"
        >
          <span className="absolute left-14 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md">
            Zalo Chat
          </span>
          <span className="absolute inset-0 rounded-full bg-amber-500/35 animate-ping delay-300 scale-110"></span>
          <span className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping delay-800 scale-125"></span>
          
          <div className="w-8 h-8 rounded-full bg-white flex flex-col items-center justify-center relative z-10 overflow-hidden">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#0068ff] -mt-1.5">
              <path d="M12,2C6.477,2,2,6.477,2,12c0,1.885,0.521,3.649,1.431,5.161L2.072,21.84c-0.12,0.36,0.228,0.708,0.588,0.588l4.679-1.359C8.351,21.479,10.115,22,12,22c5.523,0,10-4.477,10-10S17.523,2,12,2z" />
            </svg>
            <span className="absolute text-[8px] font-bold text-[#0068ff] tracking-tighter bottom-[3px] select-none scale-90">Zalo</span>
          </div>
        </a>

        {/* Nút Messenger Chat */}
        <a
          href="https://www.messenger.com/t/congtykita/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 border border-amber-400 text-white shadow-lg transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          aria-label="Facebook Messenger"
        >
          <span className="absolute left-14 bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md">
            Facebook Messenger
          </span>
          <span className="absolute inset-0 rounded-full bg-amber-500/35 animate-ping delay-600 scale-110"></span>
          <span className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping delay-1100 scale-125"></span>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] flex items-center justify-center relative z-10 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M12 2C6.48 2 2 6.02 2 11c0 2.82 1.48 5.31 3.75 6.84V21c0 .41.48.66.83.43l2.84-1.89c.81.22 1.67.35 2.58.35 5.52 0 10-4.02 10-9S17.52 2 12 2zm1.09 11.23l-2.07-2.21-4.03 2.21 4.43-4.7 2.1 2.21 4-2.21-4.43 4.7z" />
            </svg>
          </div>
        </a>

        {/* Nút Nhận tư vấn */}
        <button
          onClick={openConsultation}
          className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-r-2xl rounded-l bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-[11px] md:text-xs uppercase tracking-wider shadow-lg transition-all duration-300 active:scale-95 group border border-amber-400/50 cursor-pointer"
        >
          <span className="p-1 rounded bg-white/20">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </span>
          NHẬN TƯ VẤN
        </button>
      </div>

      {/* KHU VỰC BÊN PHẢI: Nút Cuộn lên đầu trang với Progress */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-white text-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 group border border-zinc-100"
          aria-label="Scroll to top"
        >
          {/* Circular Progress SVG */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="22"
              className="fill-none stroke-zinc-100"
              strokeWidth="2.5"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r="22"
              className="fill-none stroke-amber-500 transition-all duration-100"
              strokeWidth="2.5"
              strokeDasharray="138"
              strokeDashoffset={138 - (scrollProgress / 100) * 138}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp size={18} className="relative z-10 text-amber-600 group-hover:-translate-y-1 transition-transform duration-300 stroke-[2.5]" />
        </button>
      )}
    </>
  );
}
