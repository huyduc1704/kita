'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  highlight: string;
  ctaText: string;
  ctaLink: string;
}

const SLIDES: Slide[] = [
  {
    image: '/kita/kita-baner1.webp',
    title: 'KIẾN TẠO TỔ ẤM TRỌN NIỀM TIN',
    subtitle: '“Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà”',
    highlight: 'KITA HOME',
    ctaText: 'Xem các dự án',
    ctaLink: '#projects',
  },
  {
    image: '/kita/kita-baner2-2.webp',
    title: 'MIỄN PHÍ 100% CHI PHÍ THIẾT KẾ',
    subtitle: 'Nhận ngay ưu đãi thiết kế trọn gói khi ký hợp đồng thi công trọn gói.',
    highlight: 'XÂY NHÀ TRỌN GÓI',
    ctaText: 'Đăng ký tư vấn',
    ctaLink: '#contact-form',
  },
  {
    image: '/kita/kita-baner3.webp',
    title: 'NỘI THẤT SANG TRỌNG ĐẲNG CẤP',
    subtitle: 'Thiết kế thi công nội thất tinh tế, chất lượng cao, chuẩn gu thượng lưu.',
    highlight: 'ĐỘC BẢN & TINH TẾ',
    ctaText: 'Xem bảng báo giá',
    ctaLink: '/bao-gia',
  },
  {
    image: '/kita/kita-baner4.webp',
    title: 'THI CÔNG TRỌN GÓI CHUYÊN NGHIỆP',
    subtitle: 'Cam kết không phát sinh chi phí, bàn giao đúng tiến độ, vật liệu chính hãng.',
    highlight: 'BÀN GIAO CHÌA KHÓA TRAO TAY',
    ctaText: 'Xem bảng dự toán',
    ctaLink: '#contact-form',
  },
  {
    image: '/kita/kita-baner5.webp',
    title: 'ĐỘI NGŨ KIẾN TRÚC SƯ KINH NGHIỆM',
    subtitle: 'Hiện thực hóa mọi ý tưởng thiết kế độc bản, mang đậm dấu ấn cá nhân của bạn.',
    highlight: 'TƯ VẤN KHẢO SÁT MIỄN PHÍ',
    ctaText: 'Liên hệ ngay',
    ctaLink: '#contact-form',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[85vh] bg-zinc-950 overflow-hidden">
      {/* Slider Images with Native CSS Crossfade Transition */}
      <div className="absolute inset-0 w-full h-full">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
              index === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all cursor-pointer hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              current === index ? 'bg-primary-light w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
