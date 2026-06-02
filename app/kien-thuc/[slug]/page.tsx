'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getNews, getPostBySlug } from '../../../utils/api';
import { NewsItem } from '../../../data/mockData';
import CategoryPage, { CategoryItem } from '../../../components/shared/CategoryPage';
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react';

export default function KnowledgeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [currentArticle, setCurrentArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Define sub-categories list under Knowledge
  const subCategoryMappings: Record<string, { title: string; desc: string }> = {
    'kien-thuc-xay-nha': {
      title: 'KIẾN THỨC XÂY NHÀ',
      desc: 'Tổng hợp các bài viết cẩm nang kỹ thuật thi công móng, lựa chọn vật tư xây thô, quy trình nghiệm thu cốt thép và giám sát công trình chuẩn kỹ thuật.',
    },
    'kien-thuc-phong-thuy': {
      title: 'KIẾN THỨC PHONG THỦY',
      desc: 'Chia sẻ kiến thức phong thủy nhà ở khoa học, phong thủy phòng khách, hướng phòng bếp, bố trí cổng cửa chính đón trọn vượng khí cát tường.',
    },
    'thu-tuc-phap-ly': {
      title: 'THỦ TỤC PHÁP LÝ XÂY DỰNG',
      desc: 'Hướng dẫn chuẩn bị hồ sơ xin cấp phép xây dựng nhà phố, thủ tục hoàn công đổi sổ hồng và các quy định pháp luật xây dựng mới nhất.',
    },
    'du-toan-chi-phi': {
      title: 'DỰ TOÁN CHI PHÍ XÂY DỰNG',
      desc: 'Cẩm nang tính diện tích xây dựng theo hệ số, phương pháp lập dự toán báo giá vật tư hoàn thiện chi tiết giúp gia chủ kiểm soát ngân sách tối đa.',
    },
    'cau-hoi-thuong-gap': {
      title: 'CÂU HỎI THƯỜNG GẶP (FAQs)',
      desc: 'Giải đáp nhanh các thắc mắc phổ biến của chủ đầu tư về đơn giá xây nhà trọn gói, thủ tục xin phép, lựa chọn phong cách thiết kế phù hợp.',
    },
  };

  const isSubCategory = slug in subCategoryMappings;

  useEffect(() => {
    getNews().then(items => {
      // Filter for knowledge/ feng-shui / handbook categories
      const filtered = items.filter(item => ['cam-nang', 'phong-thuy'].includes(item.category));
      setArticles(filtered);
    });

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

  const defaultMockItems: NewsItem[] = [
    {
      id: 'kt1',
      title: 'KINH NGHIỆM LỰA CHỌN VẬT LIỆU XÂY THÔ ĐẠT CHUẨN CHẤT LƯỢNG',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Hướng dẫn chi tiết cách nhận biết cát sạch xây tô, thép xây dựng chính hãng Hòa Phát, xi măng chất lượng cao giúp hệ khung bê tông cốt thép của ngôi nhà bền bỉ trăm năm.',
      slug: 'kinh-nghiem-lua-chon-vat-lieu-xay-tho',
      category: 'cam-nang',
      date: '18/05/2026'
    },
    {
      id: 'kt2',
      title: 'PHONG THỦY XÂY DỰNG NHÀ Ở: NHỮNG NGUYÊN TẮC VÀNG CẦN BIẾT',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Tìm hiểu phong thủy phòng khách, phòng thờ, hướng bếp và cách bố trí cửa chính - cửa sổ chuẩn khí động học giúp đón nhận trọn vẹn luồng vượng khí, tài lộc dồi dào.',
      slug: 'phong-thuy-xay-dung-nha-o-nguyen-tac-vang',
      category: 'phong-thuy',
      date: '18/05/2026'
    },
    {
      id: 'kt3',
      title: 'QUY TRÌNH GIÁM SÁT THI CÔNG ÉP CỌC BÊ TÔNG MÓNG NHÀ PHỐ',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Móng nhà là nền tảng cốt lõi của công trình. Khám phá quy trình giám sát lực ép cọc đầu cọc bê tông cốt thép, khoảng cách cọc và các tiêu chí nghiệm thu phần móng chuẩn kỹ thuật.',
      slug: 'quy-trinh-giam-sat-thi-cong-ep-coc-mong',
      category: 'cam-nang',
      date: '18/05/2026'
    },
    {
      id: 'kt4',
      title: 'HƯỚNG DẪN DỰ TOÁN CHI PHÍ XÂY NHÀ TRỌN GÓI KHÔNG PHÁT SINH',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Cách tính diện tích xây dựng theo hệ số mái, móng, ban công và lập bảng dự toán vật tư hoàn thiện chi tiết. Các mẹo thương thảo hợp đồng giúp kiểm soát chặt chẽ ngân sách.',
      slug: 'huong-dan-du-toan-chi-chi-xay-nha',
      category: 'cam-nang',
      date: '18/05/2026'
    },
  ];

  if (loading) {
    return <div className="text-center py-20 text-zinc-500">Đang tải kiến thức xây dựng...</div>;
  }

  if (isSubCategory) {
    const subCat = subCategoryMappings[slug];

    // Filter articles representing that category dynamically (e.g. show relevant articles)
    const activeArticles = articles.length > 0 ? articles : defaultMockItems;
    const filteredItems = slug === 'kien-thuc-phong-thuy'
      ? activeArticles.filter((p) => p.slug.includes('phong-thuy') || p.category === 'phong-thuy')
      : slug === 'du-toan-chi-phi'
        ? activeArticles.filter((p) => p.slug.includes('du-toan') || p.slug.includes('chi-phi'))
        : activeArticles;

    return (
      <CategoryPage
        title={subCat.title}
        description={subCat.desc}
        items={filteredItems.map((art, idx) => ({
          id: art.id,
          title: art.title.toUpperCase(),
          image: art.image,
          excerpt: art.excerpt,
          views: 90 + idx * 5,
          slug: art.slug
        }))}
        basePath="/kien-thuc"
      />
    );
  }

  // 2. Otherwise, treat as dynamic Article Detail page
  const activeList = articles.length > 0 ? articles : defaultMockItems;
  const article = currentArticle || activeList.find((item) => item.slug === slug) || activeList[0] || {
    title: 'Đang cập nhật bài viết...',
    views: 45,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Đang cập nhật bài viết...',
    content: ''
  };
  const relatedArticles = activeList.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <article className="py-12 bg-white min-h-screen font-sans">
      <div className="container-kita max-w-4xl mx-auto px-4">

        {/* Back link */}
        <Link
          href="/kien-thuc"
          className="inline-flex items-center gap-1 text-zinc-550 hover:text-[#f39221] text-xs font-semibold mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Quay lại danh sách kiến thức
        </Link>

        {/* Article header */}
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#f39221] bg-amber-500/10 px-3 py-1.5 rounded self-start">
            Kiến thức xây dựng
          </span>
          <h1 className="text-xl md:text-3xl font-bold font-serif text-zinc-950 leading-snug uppercase">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 border-y border-zinc-100 py-3 mt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-zinc-400" />
              <span>18/05/2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-zinc-400" />
              <span>Ban kỹ thuật Gamma Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-zinc-400" />
              <span>{(article as any).views || 142} lượt xem</span>
            </div>
          </div>
        </div>

        {/* Article Banner photo */}
        <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-zinc-100 mb-8 shadow-sm">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content body */}
        <div className="text-zinc-700 text-sm md:text-base font-light leading-relaxed flex flex-col gap-6 text-justify">
          <p className="font-semibold text-zinc-900 border-l-4 border-[#f39221] pl-4 py-1.5 bg-zinc-50 rounded-r">
            {article.excerpt}
          </p>
          {(article as any).content ? (
            <div 
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: (article as any).content }} 
            />
          ) : (
            <>
              <p>
                Trước khi tiến hành xây dựng ngôi nhà mơ ước, việc hiểu rõ các tiêu chuẩn kỹ thuật thi công xây dựng và nghiệm thu vật tư là vô cùng thiết thực. Điều này giúp gia chủ chủ động kiểm soát tiến độ, hạn chế tối đa các chi phí phát sinh vô lý và giám sát nhà thầu thi công hiệu quả.
              </p>
              <p>
                Trong khuôn khổ bài viết này, đội ngũ kỹ sư xây dựng giàu kinh nghiệm của <strong>Gamma Home</strong> xin chia sẻ chi tiết các hạng mục cẩm nang cần ghi nhớ.
              </p>
              <p>
                Bằng việc sử dụng thép Việt Nhật, Hòa Phát chính hãng, xi măng cường độ cao cùng cấp phối bê tông chuẩn kỹ thuật và sự giám sát sát sao của đội ngũ kỹ sư tại hiện trường, mỗi mái nhà do Gamma Home hoàn thiện đều mang lại sự vững tâm tuyệt đối cho gia chủ qua nhiều thế hệ.
              </p>
            </>
          )}
          <p className="italic text-zinc-500 mt-4 border-t border-zinc-100 pt-4">
            Bài viết được tổng hợp từ cẩm nang kỹ thuật thi công thực tế của Ban Giám sát Kỹ thuật Công ty Cổ phần Kiến trúc & Xây dựng GAMMA HOME.
          </p>
        </div>

        {/* Related articles grid */}
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
                  <Link href={`/kien-thuc/${rel.slug}`}>{rel.title}</Link>
                </h4>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
