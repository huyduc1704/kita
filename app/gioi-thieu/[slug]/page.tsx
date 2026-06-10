'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAboutPosts, getPostBySlug } from '../../../utils/api';
import { NewsItem } from '../../../data/mockData';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';

export default function AboutDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [aboutPosts, setAboutPosts] = useState<NewsItem[]>([]);
  const [currentArticle, setCurrentArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutPosts().then(setAboutPosts);

    getPostBySlug(slug).then((res) => {
      if (res && res.newsItem) {
        setCurrentArticle(res.newsItem);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-zinc-500">Đang tải bài viết...</div>;
  }

  const article = currentArticle || aboutPosts.find((news) => news.slug === slug) || {
    id: 0,
    title: 'Không tìm thấy bài viết',
    category: 'gioi-thieu',
    date: '',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Bài viết không tồn tại hoặc đã bị xóa.',
    content: '',
    slug: '',
    views: 0
  };
  const relatedArticles = aboutPosts.filter((news) => news.slug !== slug).slice(0, 3);

  if (!currentArticle && !aboutPosts.find((news) => news.slug === slug)) {
    return <div className="text-center py-20 text-zinc-500 font-sans">Không tìm thấy dữ liệu bài viết.</div>;
  }

  return (
    <article className="py-12 bg-white min-h-screen font-sans">
      <div className="container-kita max-w-4xl mx-auto px-4">

        {/* Back navigation */}
        <Link
          href="/gioi-thieu"
          className="inline-flex items-center gap-1 text-zinc-550 hover:text-[#f39221] text-xs font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại trang Giới thiệu
        </Link>

        {/* Article header */}
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f39221] bg-amber-500/10 px-3 py-1.5 rounded self-start">
            Giới thiệu
          </span>
          <h1 className="text-xl md:text-3xl font-bold font-serif text-zinc-950 leading-snug uppercase">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 border-y border-zinc-100 py-3 mt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-zinc-400" />
              <span>{article.date || 'Cập nhật gần đây'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-zinc-400" />
              <span>Ban biên tập Gamma Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-zinc-400" />
              <span>Lượt xem: {article.views || 45}</span>
            </div>
          </div>
        </div>

        {/* Large featured photo */}
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-zinc-100 mb-8 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article content body */}
        <div className="text-zinc-700 text-sm md:text-base font-light leading-relaxed flex flex-col gap-6 text-justify">
          <p className="font-semibold text-zinc-900 border-l-4 border-[#f39221] pl-4 py-1.5 bg-zinc-50 rounded-r">
            {article.excerpt}
          </p>
          {article.content ? (
            <div 
              className="rich-content ck-content"
              dangerouslySetInnerHTML={{ __html: article.content }} 
            />
          ) : (
            <p>Nội dung đang được cập nhật...</p>
          )}
          <p className="italic text-zinc-500 mt-4 border-t border-zinc-100 pt-4">
            Bài viết được tổng hợp và biên soạn bởi Ban biên tập Truyền thông Công ty Cổ phần Kiến trúc & Xây dựng GAMMA HOME.
          </p>
        </div>

        {/* Related Articles section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 border-t border-zinc-100 pt-10">
            <h3 className="text-lg font-bold font-serif uppercase tracking-wider text-zinc-950 mb-6">
              BÀI VIẾT LIÊN QUAN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="flex flex-col gap-3 group">
                  <div className="relative h-36 overflow-hidden bg-zinc-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-xs md:text-sm text-zinc-900 group-hover:text-[#f39221] transition-colors uppercase line-clamp-2">
                    <Link href={`/gioi-thieu/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
