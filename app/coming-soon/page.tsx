'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, Youtube, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export default function ComingSoonPage() {
  // Countdown target: 7 days, 12 hours, 45 minutes, 30 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 24,
    minutes: 54,
    seconds: 11,
  });

  useEffect(() => {
    // Set a target date 8 days into the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 8);
    targetDate.setHours(targetDate.getHours() + 5);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0326] via-[#1b1442] to-[#0c0326] flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">

      {/* Dynamic Background Glowing Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 opacity-20 blur-3xl animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-25 blur-3xl animate-pulse duration-[12000ms]" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl" />

      {/* Decorative Grid Dots */}
      <div className="absolute top-10 left-10 opacity-20 text-white/40 pointer-events-none select-none text-2xl font-serif hidden md:block">
        •••••<br />•••••<br />•••••
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 text-white/40 pointer-events-none select-none text-2xl font-serif hidden md:block">
        •••••<br />•••••<br />•••••
      </div>

      {/* Main Glass Box Container */}
      <div className="relative w-full max-w-[1100px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col justify-between min-h-[550px] z-10">

        {/* Header Row */}
        <header className="flex justify-between items-center mb-10 md:mb-12">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <img
              src="/kita/gamma-home.jpg"
              alt="Gamma Home Logo"
              className="h-10 md:h-12 w-auto object-contain rounded-lg"
            />
          </Link>

          <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 transition-all duration-300">
            <ArrowLeft size={12} />
            <span>Trang chủ</span>
          </Link>
        </header>

        {/* Content & Timer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-10 md:mb-12">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col gap-4 text-left">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
              Tính năng đang <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-[#fbbf24] bg-clip-text text-transparent">được hoàn thiện</span>
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-md">
              Chúng tôi đang nỗ lực hoàn thiện nội dung và lập trình các tính năng nâng cao cho phân hệ này để đem đến trải nghiệm sử dụng trọn vẹn nhất cho quý khách. Vui lòng quay lại sau!
            </p>

            {/* Email Contact Badge */}
            <div className="mt-4 self-start">
              <a
                href="mailto:lienhe@gammahome.com.vn"
                className="inline-flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-full pl-3 pr-5 py-2 transition-all duration-300 group shadow-lg"
              >
                <div className="w-8 h-8 rounded-full bg-[#f39221]/20 group-hover:bg-[#f39221]/30 flex items-center justify-center text-[#f39221] transition-colors shadow shadow-amber-500/20">
                  <Mail size={14} className="animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">Hỗ trợ kỹ thuật</span>
                  <span className="text-xs text-white font-medium">gammahome.xd@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Countdown Timer */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">

            {/* Soft Glowing Spheres Behind Timer */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-6 w-20 h-20 bg-sky-500/30 rounded-full blur-xl" />

            <div className="flex gap-3 md:gap-5 relative z-10">

              {/* Card Days */}
              <div className="flex flex-col items-center justify-center bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 min-w-[75px] md:min-w-[95px] text-white shadow-xl shadow-black/25">
                <span className="text-2xl md:text-4xl font-extrabold tracking-wide font-mono bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-zinc-400 font-medium mt-1 uppercase tracking-widest">Ngày</span>
              </div>

              {/* Card Hours */}
              <div className="flex flex-col items-center justify-center bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 min-w-[75px] md:min-w-[95px] text-white shadow-xl shadow-black/25">
                <span className="text-2xl md:text-4xl font-extrabold tracking-wide font-mono bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-zinc-400 font-medium mt-1 uppercase tracking-widest">Giờ</span>
              </div>

              {/* Card Minutes */}
              <div className="flex flex-col items-center justify-center bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 min-w-[75px] md:min-w-[95px] text-white shadow-xl shadow-black/25">
                <span className="text-2xl md:text-4xl font-extrabold tracking-wide font-mono bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-zinc-400 font-medium mt-1 uppercase tracking-widest">Phút</span>
              </div>

              {/* Card Seconds */}
              <div className="flex flex-col items-center justify-center bg-white/[0.04] backdrop-blur-md border border-[#fbbf24]/20 rounded-2xl p-4 md:p-6 min-w-[75px] md:min-w-[95px] text-white shadow-xl shadow-black/25">
                <span className="text-2xl md:text-4xl font-extrabold tracking-wide font-mono text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-[#fbbf24] font-bold mt-1 uppercase tracking-widest">Giây</span>
              </div>

            </div>

          </div>

        </div>

        {/* Footer Row */}
        <footer className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-white/5 text-zinc-500 text-[10px] md:text-xs tracking-wider">

          {/* Social Links */}
          <div className="flex gap-4 items-center">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Youtube size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Linkedin size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Twitter size={16} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Facebook size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <Instagram size={16} />
            </a>
          </div>

          <div>
            GAMMA HOME &copy; {new Date().getFullYear()} - CỔ PHẦN KIẾN TRÚC XÂY DỰNG GAMMA
          </div>

        </footer>

      </div>

    </div>
  );
}
