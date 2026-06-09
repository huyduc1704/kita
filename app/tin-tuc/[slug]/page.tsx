'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getNews, getPostBySlug } from '../../../utils/api';
import { NewsItem } from '../../../data/mockData';
import CategoryPage, { CategoryItem } from '../../../components/shared/CategoryPage';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [currentArticle, setCurrentArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Check if the slug is a sub-category list
  const isSubCategory = slug === 'tin-tuc-noi-bo' || slug === 'tin-tuc-du-an';

  useEffect(() => {
    getNews().then(setNewsList);

    if (!isSubCategory) {
      getPostBySlug(slug).then((res) => {
        if (res && res.newsItem) {
          setCurrentArticle(res.newsItem);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug, isSubCategory]);

  if (loading) {
    return <div className="text-center py-20 text-zinc-500">Đang tải bài viết...</div>;
  }

  if (isSubCategory) {
    const targetCat = slug === 'tin-tuc-noi-bo' ? 'tin-noi-bo' : 'tin-du-an';
    const filteredNews = newsList.filter((news) => news.category === targetCat);

    const title = slug === 'tin-tuc-noi-bo' ? 'TIN TỨC NỘI BỘ' : 'TIN TỨC DỰ ÁN THỰC TẾ';
    const desc = slug === 'tin-tuc-noi-bo'
      ? 'Cập nhật các hoạt động văn hóa, sự kiện nội bộ, đào tạo và đời sống văn phòng của cán bộ nhân viên công ty Gamma Home.'
      : 'Tổng hợp tin tức thi công trực tiếp, tiến độ xây dựng, lễ động thổ và bàn giao chìa khóa trao tay các công trình thực tế của Gamma Home.';

    const items: CategoryItem[] = filteredNews.map((news, index) => ({
      id: news.id,
      title: news.title.toUpperCase(),
      image: news.image,
      excerpt: news.excerpt,
      views: 15 + index * 4,
      slug: news.slug,
    }));

    return (
      <CategoryPage
        title={title}
        description={desc}
        items={items}
        basePath="/tin-tuc"
      />
    );
  }

  // 2. Otherwise, treat as an Article Reader Page
  const article = currentArticle || newsList.find((news) => news.slug === slug) || newsList[0] || {
    title: 'Đang cập nhật bài viết...',
    category: 'cam-nang',
    date: '15/05/2026',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Bài viết đang được cập nhật...',
    content: ''
  };
  const relatedArticles = newsList.filter((news) => news.slug !== slug).slice(0, 3);

  return (
    <article className="py-12 bg-white min-h-screen font-sans">
      <div className="container-kita max-w-4xl mx-auto px-4">

        {/* Back navigation */}
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-1 text-zinc-550 hover:text-[#f39221] text-xs font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại danh sách tin tức
        </Link>

        {/* Article header */}
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f39221] bg-amber-500/10 px-3 py-1.5 rounded self-start">
            {article.category === 'cam-nang' ? 'Cẩm nang' : article.category === 'phong-thuy' ? 'Phong thủy' : article.category === 'tin-du-an' ? 'Tin dự án' : 'Tin nội bộ'}
          </span>
          <h1 className="text-xl md:text-3xl font-bold font-serif text-zinc-950 leading-snug uppercase">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 border-y border-zinc-100 py-3 mt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-zinc-400" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-zinc-400" />
              <span>Ban biên tập Gamma Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-zinc-400" />
              <span>45 lượt xem</span>
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
            <>
              <p>
                Đối với bất kỳ gia đình nào, ngôi nhà luôn là công trình trọng đại nhất cả cuộc đời. Để có được một tổ ấm chỉn chu, vững chãi với chi phí tối ưu, quy trình thiết kế và thi công đòi hỏi sự phối hợp nhịp nhàng giữa chủ đầu tư và nhà thầu xây dựng.
              </p>
              <p>
                Tại <strong>Gamma Home</strong>, chúng tôi luôn nỗ lực chuẩn hóa quy trình làm việc từ khâu khảo sát thực tế, tư vấn phong thủy chuyên sâu, thiết kế phối cảnh 3D ngoại thất, hồ sơ kỹ thuật chi tiết đến việc thi công trọn gói bàn giao chìa khóa trao tay.
              </p>
              <p>
                Bằng tâm huyết của những kiến trúc sư giàu kinh nghiệm, kết hợp hệ khung kết cấu sắt thép Hòa Phát chính hãng, xi măng Bút Sơn chất lượng cao và quy trình bảo dưỡng bê tông nghiêm ngặt, mỗi công trình mang thương hiệu Gamma Home đều bền bỉ, thách thức thời gian.
              </p>
            </>
          )}
          <p className="italic text-zinc-500 mt-4 border-t border-zinc-100 pt-4">
            Bài viết được tổng hợp và biên soạn bởi Ban biên tập Truyền thông Công ty Cổ phần Kiến trúc & Xây dựng GAMMA HOME.
          </p>
        </div>

        {/* Related Articles section */}
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
                  <Link href={`/tin-tuc/${rel.slug}`}>{rel.title}</Link>
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
