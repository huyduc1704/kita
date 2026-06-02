'use client';

import { Phone, ArrowUp, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSystemSetting, SystemSetting, SocialButton } from '@/utils/api';

// ─── Icon theo type ────────────────────────────────────────────────────────

function ZaloIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center relative z-10 p-0.5 border border-[#0068ff]/10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614.501 613.667" className="w-full h-full">
        <path fill="#0068ff" d="M464.721,301.399c-13.984-0.014-23.707,11.478-23.944,28.312c-0.251,17.771,9.168,29.208,24.037,29.202c14.287-0.007,23.799-11.095,24.01-27.995C489.028,313.536,479.127,301.399,464.721,301.399z"/>
        <path fill="#0068ff" d="M291.83,301.392c-14.473-0.316-24.578,11.603-24.604,29.024c-0.02,16.959,9.294,28.259,23.496,28.502c15.072,0.251,24.592-10.87,24.539-28.707C315.214,313.318,305.769,301.696,291.83,301.392z"/>
        <path fill="#0068ff" d="M310.518,3.158C143.102,3.158,7.375,138.884,7.375,306.3s135.727,303.142,303.143,303.142c167.415,0,303.143-135.727,303.143-303.142S477.933,3.158,310.518,3.158z M217.858,391.083c-33.364,0.818-66.828,1.353-100.133-0.343c-21.326-1.095-27.652-18.647-14.248-36.583c21.55-28.826,43.886-57.065,65.792-85.621c2.546-3.305,6.214-5.996,7.15-12.705c-16.609,0-32.784,0.04-48.958-0.013c-19.195-0.066-28.278-5.805-28.14-17.652c0.132-11.768,9.175-17.329,28.397-17.348c25.159-0.026,50.324-0.06,75.476,0.026c9.637,0.033,19.604,0.105,25.304,9.789c6.22,10.561,0.284,19.512-5.646,27.454c-21.26,28.497-43.015,56.624-64.559,84.902c-2.599,3.41-5.119,6.88-9.453,12.725c23.424,0,44.123-0.053,64.816,0.026c8.674,0.026,16.662,1.873,19.941,11.267C237.892,379.329,231.368,390.752,217.858,391.083z M350.854,330.211c0,13.417-0.093,26.841,0.039,40.265c0.073,7.599-2.599,13.647-9.512,17.084c-7.296,3.642-14.71,3.028-20.304-2.968c-3.997-4.281-6.214-3.213-10.488-0.422c-17.955,11.728-39.908,9.96-56.597-3.866c-29.928-24.789-30.026-74.803-0.211-99.776c16.194-13.562,39.592-15.462,56.709-4.143c3.951,2.619,6.201,4.815,10.396-0.053c5.39-6.267,13.055-6.761,20.271-3.357c7.454,3.509,9.935,10.165,9.776,18.265C350.67,304.222,350.86,317.217,350.854,330.211z M395.617,369.579c-0.118,12.837-6.398,19.783-17.196,19.908c-10.779,0.132-17.593-6.966-17.646-19.512c-0.179-43.352-0.185-86.696,0.007-130.041c0.059-12.256,7.302-19.921,17.896-19.222c11.425,0.752,16.992,7.448,16.992,18.833c0,22.104,0,44.216,0,66.327C395.677,327.105,395.828,348.345,395.617,369.579z M463.981,391.868c-34.399-0.336-59.037-26.444-58.786-62.289c0.251-35.66,25.304-60.713,60.383-60.396c34.631,0.304,59.374,26.306,58.998,61.986C524.207,366.492,498.534,392.205,463.981,391.868z"/>
      </svg>
    </div>
  );
}

function MessengerIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#0084ff] flex items-center justify-center relative z-10 p-1 shadow-sm border border-white/10">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M12 2C6.48 2 2 6.02 2 11c0 2.82 1.48 5.31 3.75 6.84V21c0 .41.48.66.83.43l2.84-1.89c.81.22 1.67.35 2.58.35 5.52 0 10-4.02 10-9S17.52 2 12 2zm1.09 11.23l-2.07-2.21-4.03 2.21 4.43-4.7 2.1 2.21 4-2.21-4.43 4.7z"/>
      </svg>
    </div>
  );
}

function FacebookIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center relative z-10 p-1">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </div>
  );
}

function TikTokIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center relative z-10 p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
      </svg>
    </div>
  );
}

function YouTubeIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center relative z-10 p-1.5">
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
        <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.58 3.5 12 3.5 12 3.5s-7.58 0-9.38.55A3.02 3.02 0 00.5 6.19 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.81 3.02 3.02 0 002.12 2.14C4.42 20.5 12 20.5 12 20.5s7.58 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
      </svg>
    </div>
  );
}

function SocialIcon({ type, iconUrl, label }: { type: string; iconUrl?: string | null; label: string }) {
  if (iconUrl) return <img src={iconUrl} alt={label} className="w-8 h-8 rounded-full object-cover" />;
  switch (type) {
    case 'zalo':      return <ZaloIcon />;
    case 'messenger': return <MessengerIcon />;
    case 'facebook':  return <FacebookIcon />;
    case 'tiktok':    return <TikTokIcon />;
    case 'youtube':   return <YouTubeIcon />;
    case 'phone':     return <Phone size={20} className="relative z-10 stroke-[2.5]" />;
    default:          return <ExternalLink size={18} className="relative z-10" />;
  }
}

// ─── Mock buttons (fallback khi chưa có dữ liệu) ─────────────────────────

function buildMockButtons(setting: SystemSetting): SocialButton[] {
  const hotlineRaw = setting.hotline.replace(/\./g, '');
  return [
    { id: -1, type: 'phone',     label: `Hotline: ${setting.hotline}`, value: hotlineRaw,       iconUrl: null, position: 'floating', order: 0, isActive: true, resolvedLink: `tel:${hotlineRaw}` },
    { id: -2, type: 'zalo',      label: 'Zalo Chat',                   value: hotlineRaw,       iconUrl: null, position: 'floating', order: 1, isActive: true, resolvedLink: setting.zaloUrl || `https://zalo.me/${hotlineRaw}` },
    { id: -3, type: 'messenger', label: 'Facebook Messenger',          value: '',               iconUrl: null, position: 'floating', order: 2, isActive: true, resolvedLink: setting.messengerUrl || 'https://www.messenger.com/' },
  ];
}

// ─── Component chính ──────────────────────────────────────────────────────

export default function FloatingContact() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [setting, setSetting] = useState<SystemSetting | null>(null);

  useEffect(() => {
    getSystemSetting().then(setSetting);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-consultation-modal'));
  };

  // Dùng social buttons từ DB nếu có, fallback về mock
  const floatingButtons: SocialButton[] = setting
    ? (setting.socialButtons?.filter(b => b.isActive && (b.position === 'floating' || b.position === 'both'))
        .sort((a, b) => a.order - b.order) || [])
    : [];

  const displayButtons = floatingButtons.length > 0
    ? floatingButtons
    : (setting ? buildMockButtons(setting) : []);

  return (
    <>
      {/* Nút nổi bên trái */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 items-start select-none">

        {displayButtons.map((btn) => (
          <a
            key={btn.id}
            href={btn.resolvedLink}
            target={btn.type === 'phone' ? undefined : '_blank'}
            rel={btn.type === 'phone' ? undefined : 'noopener noreferrer'}
            className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#bd8b1b] border-2 border-white text-white shadow-lg transition-all duration-300 active:scale-95 hover:scale-105 z-10 animate-float-shake"
            aria-label={btn.label}
          >
            <span className="absolute left-14 bg-zinc-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 whitespace-nowrap shadow-md z-30">
              {btn.label}
            </span>
            <span className="absolute inset-0 rounded-full bg-[#bd8b1b]/35 animate-float-pulse-1 pointer-events-none -z-10" />
            <span className="absolute inset-0 rounded-full bg-[#bd8b1b]/20 animate-float-pulse-2 pointer-events-none -z-10" />
            <SocialIcon type={btn.type} iconUrl={btn.iconUrl} label={btn.label} />
          </a>
        ))}

        {/* Nút Nhận tư vấn — luôn hiển thị */}
        <button
          onClick={openConsultation}
          className="bg-[#bd8b1b] hover:bg-[#a37713] text-white font-bold text-[11px] md:text-xs uppercase tracking-wider pl-3 pr-5 py-2.5 rounded-full border-2 border-white shadow-lg flex items-center gap-2.5 transition-all duration-300 active:scale-95 group cursor-pointer animate-float-shake"
        >
          <span className="p-1 rounded bg-white/25 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </span>
          NHẬN TƯ VẤN
        </button>
      </div>

      {/* Nút cuộn lên đầu */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-white text-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 group border border-zinc-100"
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" className="fill-none stroke-zinc-100" strokeWidth="2.5"/>
            <circle cx="24" cy="24" r="22" className="fill-none stroke-[#bd8b1b] transition-all duration-100" strokeWidth="2.5"
              strokeDasharray="138" strokeDashoffset={138 - (scrollProgress / 100) * 138} strokeLinecap="round"/>
          </svg>
          <ArrowUp size={18} className="relative z-10 text-[#bd8b1b] group-hover:-translate-y-1 transition-transform duration-300 stroke-[2.5]"/>
        </button>
      )}

      <style>{`
        @keyframes float-pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.4); opacity: 0.35; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        @keyframes float-shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          5% { transform: rotate(-10deg) scale(1.05); }
          10% { transform: rotate(10deg) scale(1.05); }
          15% { transform: rotate(-10deg) scale(1.05); }
          20% { transform: rotate(10deg) scale(1.05); }
          25% { transform: rotate(0deg) scale(1); }
        }
        .animate-float-pulse-1 { animation: float-pulse 2.2s infinite ease-out; }
        .animate-float-pulse-2 { animation: float-pulse 2.2s infinite ease-out 1.1s; }
        .animate-float-shake { animation: float-shake 3s infinite ease-in-out; }
      `}</style>
    </>
  );
}
