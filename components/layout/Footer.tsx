'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getSystemSetting, SystemSetting } from '@/utils/api';

export default function Footer() {
  const [setting, setSetting] = useState<SystemSetting | null>(null);

  useEffect(() => {
    getSystemSetting().then(setSetting);
  }, []);

  const openConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-consultation-modal'));
  };

  const addressNorth = setting?.addressNorth || 'G29-30 - Khu đấu giá Ngô Thì Nhậm - Hà Cầu - Hà Đông - TP Hà Nội';
  const addressSouth = setting?.addressSouth || 'Đường T2-41 Khu Biệt Thự Manhattan - Vinhomes Grand Park - P.Long Bình - TP.Thủ Đức - Hồ Chí Minh';
  const hotline = setting?.hotline || '0827.972.555';
  const email = setting?.email || 'Nhadepgamma@gmail.com';
  const facebookUrl = setting?.facebookUrl || setting?.facebookPage || 'https://www.facebook.com/profile.php?id=100076260787549';
  const tiktokUrl = setting?.tiktokUrl || 'https://www.tiktok.com/@nhadepkita1';
  const youtubeUrl = setting?.youtubeUrl || 'https://www.youtube.com/@nhadepkita';

  return (
    <footer
      className="relative text-zinc-300 pt-16 pb-0 bg-cover bg-center overflow-hidden bg-zinc-950"
      style={{ backgroundImage: "url('/kita/FT.webp')" }}
    >
      {/* Dark Overlay to make the content highly readable and give a luxury feel */}
      <div className="absolute inset-0 bg-black/75 z-10" />

      <div className="container-kita relative z-20 mb-12">
        {/* 3 Column Grid inside the 1280px container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-4 lg:px-0">

          {/* Column 1: Logo & Introduction */}
          <div className="flex flex-col items-start gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/kita/gamma-home.jpg"
                alt="Kita Home Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Paragraph Text */}
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light font-sans text-justify">
              <strong>GAMMA HOME</strong> là đơn vị thiết kế và thi công nhà trọn gói được nhiều khách tin tưởng lựa chọn, với hàng trăm công trình chất lượng đã được hoàn thiện, góp phần mang đến không gian sống chỉn chu và ấm áp cho các gia đình Việt.
            </p>

            {/* Request Consultation Button */}
            <button
              onClick={openConsultation}
              className="inline-flex items-center gap-2 bg-[#f39221] hover:bg-[#f39221]/90 text-white font-bold text-xs uppercase px-5 py-2.5 rounded transition-all duration-300 shadow hover:shadow-lg active:scale-95 mt-2 cursor-pointer"
            >
              <span className="text-sm font-bold">≡</span> NHẬN TƯ VẤN THIẾT KẾ
            </button>
          </div>

          {/* Column 2: Address & Contact Details */}
          <div className="flex flex-col gap-5 lg:pl-4">
            {/* Company Title */}
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-sans leading-snug">
              CÔNG TY CỔ PHẦN KIẾN TRÚC & XÂY DỰNG GAMMA HOME
            </h3>

            {/* Contact Information List */}
            <div className="flex flex-col gap-3.5 text-xs md:text-sm font-light font-sans leading-relaxed">
              <p>
                <span className="text-[#f39221] font-bold">Miền Bắc:</span> {addressNorth}
              </p>
              <p>
                <span className="text-[#f39221] font-bold">Miền Nam:</span> {addressSouth}
              </p>
              <p>
                <span className="text-[#f39221] font-bold">Hotline:</span> {hotline}
              </p>
              <p>
                <span className="text-[#f39221] font-bold">Email:</span> {email}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3 mt-1">
              {/* Facebook Button (Blue) */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-sm"
                aria-label="Facebook Gamma Home"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              {/* TikTok Button (Image Icon) */}
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="TikTok Kita Home"
              >
                <img
                  src="/kita/tiktok-icon.png"
                  alt="TikTok"
                  className="w-full h-full object-cover"
                />
              </a>
              {/* YouTube Button (Red) */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-sm"
                aria-label="YouTube Kita Home"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.387.51A3.003 3.003 0 0 0 .502 6.163C0 8.04 0 12 0 12s0 3.96.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.862.51 9.387.51 9.387.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.877.502-5.837.502-5.837s0-3.96-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3: Live Facebook Page Widget */}
          <div className="flex flex-col items-center lg:items-end justify-start">
            <div className="w-full max-w-[340px] bg-white rounded-lg overflow-hidden p-1 shadow-lg border border-zinc-200">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fcongtykita&tabs=timeline&width=340&height=310&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="100%"
                height="310"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Kita Home Facebook Fanpage"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Full-width Copyright Bar with dark background */}
      <div className="relative z-20 bg-black/90 py-4 border-t border-zinc-800 flex justify-center items-center text-[10px] md:text-xs text-zinc-400 font-light text-center px-4">
        <p className="font-sans">
          © 2021 Bản quyền thuộc về Gamma Home. Thiết kế và Phát triển bởi <a href="https://vinasoftware.com.vn" target="_blank" rel="noopener noreferrer" className="hover:text-white font-medium transition-colors">Vinasoftware</a>
        </p>
      </div>
    </footer>
  );
}
