'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProjects, Project } from '../../utils/api';
import { Eye } from 'lucide-react';

type MainTab = 'kien-truc' | 'noi-that';
type SubTab = 'tat-ca' | 'nha-pho' | 'mai-nhat' | 'biet-thu';

export default function ProjectsSection() {
  const [mainTab, setMainTab] = useState<MainTab>('kien-truc');
  const [subTab, setSubTab] = useState<SubTab>('tat-ca');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {});
  }, []);

  // Lọc dự án theo tab chính (Kiến trúc vs Nội thất)
  const mainFiltered = projects.filter((proj) => {
    if (mainTab === 'noi-that') {
      return proj.category === 'noi-that';
    } else {
      return proj.category !== 'noi-that';
    }
  });

  // Lọc tiếp theo tab phụ (Tất cả, Nhà phố, Mái nhật, Biệt thự)
  const finalFiltered = mainFiltered.filter((proj) => {
    if (mainTab === 'noi-that' || subTab === 'tat-ca') return true;
    return proj.category === subTab;
  });

  // Giới hạn tối đa 12 bài viết
  const displayedProjects = finalFiltered.slice(0, 12);

  return (
    <section className="py-20 bg-white" id="projects">
      <div className="container-kita">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 flex flex-col items-center gap-2">
          <h2 className="text-3xl font-bold font-serif text-secondary uppercase tracking-wider">
            CÔNG TRÌNH TIÊU BIỂU
          </h2>
          <img 
            src="/kita/Title.png" 
            alt="divider" 
            className="h-4 w-auto object-contain my-1" 
          />
        </div>

        {/* BỘ LỌC CHÍNH (Separate rectangular buttons with gap) */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setMainTab('kien-truc');
              setSubTab('tat-ca');
            }}
            className={`px-6 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded shadow-sm ${mainTab === 'kien-truc'
                ? 'bg-[#f39221] text-white border border-[#f39221]'
                : 'bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50'
              }`}
          >
            DỰ ÁN KIẾN TRÚC
          </button>
          <button
            onClick={() => {
              setMainTab('noi-that');
              setSubTab('tat-ca');
            }}
            className={`px-6 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded shadow-sm ${mainTab === 'noi-that'
                ? 'bg-[#f39221] text-white border border-[#f39221]'
                : 'bg-white text-zinc-800 border border-zinc-300 hover:bg-zinc-50'
              }`}
          >
            DỰ ÁN NỘI THẤT
          </button>
        </div>

        {/* BỘ LỌC PHỤ (Chỉ hiển thị cho tab Kiến trúc) */}
        {mainTab === 'kien-truc' && (
          <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-10">
            {[
              { id: 'tat-ca', label: 'Tất cả' },
              { id: 'nha-pho', label: 'Nhà Phố' },
              { id: 'mai-nhat', label: 'Nhà Mái Nhật' },
              { id: 'biet-thu', label: 'Biệt Thự' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as SubTab)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 cursor-pointer border ${subTab === tab.id
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white text-zinc-500 border-zinc-200 hover:text-secondary hover:border-secondary'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* LƯỚI HIỂN THỊ DỰ ÁN (Exactly 3 columns per row on md & up) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="w-12 h-12 rounded-full bg-[#f39221] hover:bg-[#f39221]/90 text-white flex items-center justify-center shadow-lg transition-transform scale-75 group-hover:scale-100 duration-300"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-[#f39221] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded shadow-sm z-20">
                  {project.category.replace('-', ' ')}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <h3 className="font-bold text-sm text-zinc-900 group-hover:text-[#f39221] transition-colors leading-snug uppercase line-clamp-2">
                  <Link href={`/du-an/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                
                <div className="pt-3 flex justify-between items-center text-xs font-semibold">
                  {/* View Stats Indication */}
                  <div className="flex items-center gap-1.5 text-zinc-700">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 19h2v-7H4v7zm5 0h2V9H9v10zm5 0h2v-12h-2v12zm5 0h2V6h-2v13zm5 0h2V6h-2v13z" />
                    </svg>
                    <span>{((parseInt(project.id) || 1) * 7) % 45 + 3}</span>
                  </div>
                  {/* Read More Link */}
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="text-[#f39221] hover:text-[#f39221]/80 font-bold transition-colors"
                  >
                    Chi tiết &raquo;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button (Styled like the orange rectangle button in screenshot) */}
        <div className="mt-16 text-center">
          <Link
            href="/du-an"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#f39221] hover:bg-[#f39221]/90 text-white text-sm uppercase tracking-wider font-bold rounded transition-all duration-300 shadow hover:shadow-lg active:scale-95"
          >
            XEM THÊM &gt;
          </Link>
        </div>

      </div>
    </section>
  );
}
