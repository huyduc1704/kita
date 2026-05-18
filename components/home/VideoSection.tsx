'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoFeedback {
  id: string;
  title: string;
  channelTitle: string;
  avatar: string;
  thumbnail: string;
  youtubeId: string;
}

const VIDEOS: VideoFeedback[] = [
  {
    id: 'v1',
    title: 'Chủ Nhà Bâng Khuâng trước ngôi nhà cổ, CŨ NHƯNG MÀ QUÝ',
    channelTitle: 'NHA DEP GAMMA',
    avatar: '/kita/icon-2.png', // Fallback or Kita logo
    thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    youtubeId: 'e1S9Xm45gXU'
  },
  {
    id: 'v2',
    title: 'Cùng Gia Chủ Khám Phá Ngôi Nhà 1.5 Tỷ HIỆN ĐẠI',
    channelTitle: 'NHA DEP GAMMA',
    avatar: '/kita/icon-2.png',
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    youtubeId: 't6_TExiP7_E'
  },
  {
    id: 'v3',
    title: 'KHÁM PHÁ "Ngôi Biệt Thự Tân Cổ Điển" SIÊU PHẨM tại Hải Phòng',
    channelTitle: 'NHA DEP GAMMA',
    avatar: '/kita/icon-2.png',
    thumbnail: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    youtubeId: '8-kE1KxYq7Y'
  }
];

export default function VideoSection() {
  const [selectedYoutubeId, setSelectedYoutubeId] = useState<string | null>(null);

  return (
    <section className="bg-white" id="videos">
      <div className="container-kita">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14 flex flex-col items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-secondary uppercase tracking-wider whitespace-nowrap">
            KHÁCH HÀNG NÓI GÌ VỀ GAMMA HOME
          </h2>
          <img
            src="/kita/Title.png"
            alt="divider"
            className="h-4 w-auto object-contain my-1"
          />
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setSelectedYoutubeId(vid.youtubeId)}
              className="relative group aspect-video rounded-xl overflow-hidden bg-black shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-200"
            >
              {/* Thumbnail Image */}
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />

              {/* Simulated Embedded YouTube UI Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300 z-10" />

              {/* YouTube Header / Avatar Overlay */}
              <div className="absolute top-3 left-3 right-3 flex items-start gap-2.5 z-20 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] pointer-events-none">
                {/* Simulated Logo Avatar */}
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                  <span className="text-[10px] font-bold text-primary-light">GAMMA</span>
                </div>
                <div className="flex flex-col gap-0.5 mt-0.5">
                  <h4 className="font-sans font-semibold text-xs md:text-sm line-clamp-1 leading-snug">
                    {vid.title}
                  </h4>
                  <span className="text-[9px] text-zinc-300 font-light uppercase tracking-wider">
                    {vid.channelTitle}
                  </span>
                </div>
              </div>

              {/* YouTube Red Play Button (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-300 group-hover:scale-110">
                <div className="w-16 h-11 bg-[#ff0000] rounded-xl flex items-center justify-center shadow-lg relative group-hover:bg-[#cc0000] transition-colors">
                  {/* Inside Triangle */}
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[14px] border-l-white ml-1" />
                </div>
              </div>

              {/* Bottom "Xem trên YouTube" Badge */}
              <div className="absolute bottom-3 left-3 z-20 bg-black/70 px-3 py-1 rounded text-[10px] text-white flex items-center gap-1 opacity-90 drop-shadow pointer-events-none">
                <span>Xem trên</span>
                <span className="font-bold text-[#ff0000]">YouTube</span>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
        </div>

        {/* Orange "XEM THÊM >" Button */}
        <div className="mt-10 text-center">
          <a
            href="https://www.youtube.com/@nhadepkita"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#f39221] hover:bg-[#f39221]/90 text-white text-sm uppercase tracking-wider font-bold rounded transition-all duration-300 shadow hover:shadow-lg active:scale-95"
          >
            XEM THÊM &gt;
          </a>
        </div>

      </div>

      {/* Cinematic Cinematic Video Popup Modal */}
      {selectedYoutubeId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-55 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedYoutubeId(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white hover:text-primary-light transition-all cursor-pointer"
            >
              <X size={24} />
            </button>
            {/* YouTube Iframe */}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedYoutubeId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
