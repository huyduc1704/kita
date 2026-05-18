'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getNews, NewsItem } from '../../utils/api';

export default function ExperienceSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews().then((data) => {
      // Lấy 3 bài viết mới nhất từ Strapi
      setItems(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-20 bg-white" id="experience">
      <div className="container-kita">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 flex flex-col items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-secondary uppercase tracking-wider whitespace-nowrap">
            KINH NGHIỆM XÂY DỰNG
          </h2>
          <img 
            src="/kita/Title.png" 
            alt="divider" 
            className="h-4 w-auto object-contain my-1" 
          />
        </div>

        {loading ? (
          <div className="text-center py-10 text-zinc-500 text-sm">
            Đang tải cẩm nang kinh nghiệm xây dựng...
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 text-sm">
            Hiện chưa có bài viết kinh nghiệm nào.
          </div>
        ) : (
          /* 3 Column Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative h-[220px] overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 group-hover:text-[#f39221] transition-colors leading-snug uppercase line-clamp-2">
                      <Link href={`/tin-tuc/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-zinc-550 text-xs md:text-sm font-light leading-relaxed mt-2 line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                  
                  {/* Separator Footer */}
                  <div className="pt-3 border-t border-zinc-100 flex justify-between items-center text-xs font-semibold">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{item.date}</span>
                    </div>
                    {/* Link */}
                    <Link
                      href={`/tin-tuc/${item.slug}`}
                      className="text-[#f39221] hover:text-[#f39221]/80 font-bold transition-colors"
                    >
                      Chi tiết &raquo;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
