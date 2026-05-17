'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface CategoryItem {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  views: number;
  slug: string;
}

interface CategoryPageProps {
  title: string;
  description: string;
  items: CategoryItem[];
  basePath: string;
}

export default function CategoryPage({ title, description, items, basePath }: CategoryPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Display 9 items (3 rows of 3) per page

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items for page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the content area smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers array (simple helper matching the design)
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-16 font-sans">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${currentPage === number
                ? 'bg-[#f39221] border-[#f39221] text-white shadow-md'
                : 'border-zinc-350 bg-white text-zinc-700 hover:border-[#f39221] hover:text-[#f39221]'
              }`}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-9 h-9 rounded-full border border-zinc-350 bg-white flex items-center justify-center text-sm font-bold text-zinc-700 hover:border-[#f39221] hover:text-[#f39221] cursor-pointer"
            aria-label="Next page"
          >
            &gt;
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container-kita max-w-6xl mx-auto px-4">

        {/* Page title and introductory description */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-zinc-900 tracking-wider uppercase mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-zinc-650 text-xs md:text-sm font-light leading-relaxed text-justify max-w-5xl">
            {description}
          </p>
        </div>

        {/* 3 Column Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white shadow-md hover:shadow-xl flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative h-[220px] overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-grow justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-xs md:text-sm text-zinc-900 group-hover:text-[#f39221] transition-colors leading-snug uppercase line-clamp-2">
                      <Link href={`${basePath}/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <p className="text-zinc-550 text-xs md:text-sm font-light leading-relaxed mt-2 line-clamp-3 text-justify">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Card Footer Info */}
                  <div className="pt-3 border-t border-zinc-100 flex justify-between items-center text-xs font-semibold">
                    {/* View counts */}
                    <div className="flex items-center gap-1.5 text-zinc-700">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 19h2v-7H4v7zm5 0h2V9H9v10zm5 0h2v-12h-2v12zm5 0h2V6h-2v13z" />
                      </svg>
                      <span>{item.views}</span>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`${basePath}/${item.slug}`}
                      className="text-[#f39221] hover:text-[#f39221]/80 font-bold transition-colors"
                    >
                      Chi tiết &raquo;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            Đang cập nhật nội dung...
          </div>
        )}

        {/* Dynamic Pagination Section */}
        {renderPagination()}

      </div>
    </section>
  );
}
