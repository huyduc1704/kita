'use client';

import Link from 'next/link';

interface ExperienceItem {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  views: number;
  slug: string;
}

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: '1',
    title: 'NHÀ PHỐ HIỆN ĐẠI 8X28M | ANH NGHĨA – BÌNH PHƯỚC',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sở hữu mảnh đất có kích thước ấn tượng 8x28m tại tỉnh Bình Phước, anh [...]',
    views: 6,
    slug: 'nha-pho-2-tang-hien-dai-8x28m-anh-nghia-binh-phuoc'
  },
  {
    id: '2',
    title: 'MẪU THIẾT KẾ NHÀ PHỐ 4 TẦNG 1 TUM HIỆN ĐẠI | CHỊ THU – ĐÔNG ANH',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Giữa những khu đô thị ngày càng đông đúc, bài toán đặt ra với nhà [...]',
    views: 11,
    slug: 'thiet-ke-nha-pho-4-tang-1-tum-dong-anh-chi-thu'
  },
  {
    id: '3',
    title: 'MẪU THIẾT KẾ NGOẠI THẤT NHÀ PHỐ 3 TẦNG HIỆN ĐẠI | CHỊ CHI – NINH BÌNH',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Trong bối cảnh đô thị hóa ngày càng phát triển tại Ninh Bình, việc sở [...]',
    views: 3,
    slug: 'mau-nha-pho-3-tang-hien-dai-chi-chi-ninh-binh'
  }
];

export default function ExperienceSection() {
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

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {EXPERIENCE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-zinc-150 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative h-[220px] overflow-hidden">
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
                  {/* Views */}
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 19h2v-7H4v7zm5 0h2V9H9v10zm5 0h2v-12h-2v12zm5 0h2V6h-2v13z" />
                    </svg>
                    <span>{item.views}</span>
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

      </div>
    </section>
  );
}
