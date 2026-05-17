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
          className="group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,104,255,0.25)] hover:-translate-y-0.5 bg-[#0068ff]"
          aria-label="Zalo Kita Home"
        >
          <span className="absolute left-14 bg-zinc-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md z-30">
            Zalo Chat
          </span>
          <span className="absolute inset-0 rounded-full bg-[#0068ff]/30 animate-ping scale-110"></span>
          <svg
            id="svg_zalo_icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 614.501 613.667"
            className="w-11 h-11 relative z-10"
          >
            <path fill="#FFFFFF" d="M464.721,301.399c-13.984-0.014-23.707,11.478-23.944,28.312c-0.251,17.771,9.168,29.208,24.037,29.202   c14.287-0.007,23.799-11.095,24.01-27.995C489.028,313.536,479.127,301.399,464.721,301.399z" />
            <path fill="#FFFFFF" d="M291.83,301.392c-14.473-0.316-24.578,11.603-24.604,29.024c-0.02,16.959,9.294,28.259,23.496,28.502   c15.072,0.251,24.592-10.87,24.539-28.707C315.214,313.318,305.769,301.696,291.83,301.392z" />
            <path fill="#FFFFFF" d="M310.518,3.158C143.102,3.158,7.375,138.884,7.375,306.3s135.727,303.142,303.143,303.142   c167.415,0,303.143-135.727,303.143-303.142S477.933,3.158,310.518,3.158z M217.858,391.083   c-33.364,0.818-66.828,1.353-100.133-0.343c-21.326-1.095-27.652-18.647-14.248-36.583c21.55-28.826,43.886-57.065,65.792-85.621   c2.546-3.305,6.214-5.996,7.15-12.705c-16.609,0-32.784,0.04-48.958-0.013c-19.195-0.066-28.278-5.805-28.14-17.652   c0.132-11.768,9.175-17.329,28.397-17.348c25.159-0.026,50.324-0.06,75.476,0.026c9.637,0.033,19.604,0.105,25.304,9.789   c6.22,10.561,0.284,19.512-5.646,27.454c-21.26,28.497-43.015,56.624-64.559,84.902c-2.599,3.41-5.119,6.88-9.453,12.725   c23.424,0,44.123-0.053,64.816,0.026c8.674,0.026,16.662,1.873,19.941,11.267C237.892,379.329,231.368,390.752,217.858,391.083z    M350.854,330.211c0,13.417-0.093,26.841,0.039,40.265c0.073,7.599-2.599,13.647-9.512,17.084   c-7.296,3.642-14.71,3.028-20.304-2.968c-3.997-4.281-6.214-3.213-10.488-0.422c-17.955,11.728-39.908,9.96-56.597-3.866   c-29.928-24.789-30.026-74.803-0.211-99.776c16.194-13.562,39.592-15.462,56.709-4.143c3.951,2.619,6.201,4.815,10.396-0.053   c5.39-6.267,13.055-6.761,20.271-3.357c7.454,3.509,9.935,10.165,9.776,18.265C350.67,304.222,350.86,317.217,350.854,330.211z    M395.617,369.579c-0.118,12.837-6.398,19.783-17.196,19.908c-10.779,0.132-17.593-6.966-17.646-19.512   c-0.179-43.352-0.185-86.696,0.007-130.041c0.059-12.256,7.302-19.921,17.896-19.222c11.425,0.752,16.992,7.448,16.992,18.833   c0,22.104,0,44.216,0,66.327C395.677,327.105,395.828,348.345,395.617,369.579z M463.981,391.868   c-34.399-0.336-59.037-26.444-58.786-62.289c0.251-35.66,25.304-60.713,60.383-60.396c34.631,0.304,59.374,26.306,58.998,61.986   C524.207,366.492,498.534,392.205,463.981,391.868z" />
          </svg>
        </a>

        {/* Nút Messenger Chat */}
        <a
          href="https://www.messenger.com/t/congtykita/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_15px_rgba(0,198,255,0.25)] hover:-translate-y-0.5"
          aria-label="Facebook Messenger"
        >
          <span className="absolute left-14 bg-zinc-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md z-30">
            Facebook Messenger
          </span>
          <span className="absolute inset-0 rounded-full bg-[#00c6ff]/30 animate-ping scale-110"></span>
          <img
            src="/kita/messenger-icon.png"
            alt="Messenger"
            className="w-full h-full object-cover rounded-full relative z-10"
          />
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
