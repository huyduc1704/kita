'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getProjects, getPostBySlug, getNews, submitConsultationLead, Project, NewsItem } from '../../../utils/api';
import { Calendar, User, Eye, ArrowLeft, Home, Phone, Layers, MapPin, Mail, CheckCircle } from 'lucide-react';

export default function InteriorDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // States
  const [project, setProject] = useState<Project | null>(null);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Side Consultation Form States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nhuCau, setNhuCau] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [dienTich, setDienTich] = useState('');
  const [tinhThanh, setTinhThanh] = useState('');
  const [yeuCau, setYeuCau] = useState('');

  useEffect(() => {
    setLoading(true);
    
    // Fetch current project by slug
    getPostBySlug(slug).then((res) => {
      if (res && res.project) {
        setProject(res.project);
      }
      setLoading(false);
    });

    // Fetch latest news for right column
    getNews().then((news) => {
      setLatestNews(news.slice(0, 6));
    });

    // Fetch all projects for related section
    getProjects().then(setAllProjects);
  }, [slug]);

  const REQUIREMENT_MAP: Record<string, 'build' | 'design' | 'interior' | 'consult'> = {
    'Xây nhà trọn gói': 'build',
    'Thiết kế kiến trúc': 'design',
    'Thiết kế & thi công nội thất': 'interior',
    'Thi công phần thô': 'consult',
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!soDienThoai || !nhuCau) {
      alert('Vui lòng điền các thông tin bắt buộc (*)');
      return;
    }
    try {
      await submitConsultationLead({
        name: hoTen || 'Khách hàng',
        phone: soDienThoai,
        requirement: REQUIREMENT_MAP[nhuCau],
        area: dienTich || undefined,
        province: tinhThanh || undefined,
        detailNote: yeuCau || undefined,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setNhuCau(''); setHoTen(''); setSoDienThoai('');
        setDienTich(''); setTinhThanh(''); setYeuCau('');
      }, 4000);
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline trực tiếp.');
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-zinc-500 font-sans">Đang tải chi tiết nội thất...</div>;
  }

  // Fallback if not found
  const currentProject = project || allProjects.find((p) => p.slug === slug) || allProjects[0];

  if (!currentProject) {
    return <div className="text-center py-20 text-zinc-500 font-sans">Không tìm thấy dữ liệu nội thất.</div>;
  }

  // Related projects: interior category, excluding current project, capped at 3
  const relatedProjects = allProjects
    .filter((p) => p.category === 'noi-that' && p.slug !== currentProject.slug)
    .slice(0, 3);

  return (
    <article className="py-10 bg-zinc-50 min-h-screen font-sans">
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-1 text-zinc-500 text-xs font-semibold mb-6">
          <Link href="/" className="hover:text-[#f39221] transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link href="/noi-that" className="hover:text-[#f39221] transition-colors">Nội thất</Link>
          <span>/</span>
          <span className="text-zinc-800">Chi tiết nội thất</span>
        </div>

        {/* Dynamic Header Section */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#f39221] bg-amber-500/10 px-2.5 py-1 rounded">
              Thiết kế
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#007ba1] bg-sky-500/10 px-2.5 py-1 rounded">
              Nội thất
            </span>
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-zinc-900 leading-snug uppercase">
            {currentProject.title}
          </h1>

          {/* Meta Details */}
          <div className="flex items-center gap-4 text-xs text-zinc-500 border-y border-zinc-200/60 py-3 mt-1 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-zinc-400" />
              <span>Năm thực hiện: {currentProject.details.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-zinc-400" />
              <span>Gamma Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={14} className="text-zinc-400" />
              <span>185 lượt xem</span>
            </div>
          </div>
        </div>

        {/* TWO COLUMN GRID: 70% Content | 30% Contact & Latest Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          
          {/* LEFT COLUMN: 70% (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 bg-white p-4 md:p-6 rounded-xl border border-zinc-200/50 shadow-sm">
            
            {/* Primary Featured Image */}
            <div className="relative w-full overflow-hidden bg-zinc-100 rounded-lg shadow-inner">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-auto object-cover max-h-[500px] w-full"
              />
            </div>

            {/* Premium Project Specifications Table */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-5">
              <h3 className="text-sm font-bold text-zinc-900 mb-3 border-b border-zinc-200 pb-2 uppercase tracking-wide">
                Thông số nội thất chi tiết
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs md:text-sm text-zinc-700">
                <div className="flex justify-between border-b border-zinc-200/50 pb-2">
                  <span className="font-semibold text-zinc-500">Chủ đầu tư:</span>
                  <span className="font-bold text-zinc-800">{currentProject.details.client}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 pb-2">
                  <span className="font-semibold text-zinc-500">Địa điểm:</span>
                  <span className="font-bold text-zinc-800">{currentProject.details.location}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 pb-2">
                  <span className="font-semibold text-zinc-500">Quy mô thiết kế:</span>
                  <span className="font-bold text-zinc-800">{currentProject.details.scale}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/50 pb-2">
                  <span className="font-semibold text-zinc-500">Diện tích thiết kế:</span>
                  <span className="font-bold text-zinc-800">{currentProject.details.area}</span>
                </div>
              </div>
            </div>

            {/* Project Content Description */}
            <div className="text-zinc-700 text-sm md:text-base font-light leading-relaxed flex flex-col gap-6 text-justify">
              <p className="font-semibold text-zinc-900 border-l-4 border-[#f39221] pl-4 py-1.5 bg-zinc-50 rounded-r">
                {currentProject.excerpt}
              </p>
              
              {/* Dynamic Rich Text Content from Strapi */}
              {currentProject.description ? (
                <div 
                  className="rich-content ck-content"
                  dangerouslySetInnerHTML={{ __html: currentProject.description }} 
                />
              ) : (
                <div className="flex flex-col gap-4">
                  <p>
                    Không gian nội thất đẳng cấp này được thiết kế và bài trí bởi đội ngũ kiến trúc sư chuyên nghiệp của <strong>Gamma Home</strong>. Chúng tôi mang tới giải pháp kiến trúc ấn tượng, cá nhân hóa thẩm mỹ và tối ưu hóa không gian sống.
                  </p>
                  <p>
                    Với tôn chỉ chất lượng vượt trội, Gamma Home sử dụng các loại gỗ công nghiệp cao cấp chính hãng An Cường, kết hợp phụ kiện thông minh cùng chất liệu bọc da, nỉ nhập khẩu mang lại trải nghiệm hoàn hảo cho cả gia đình.
                  </p>
                </div>
              )}
            </div>

            {/* Project Gallery Showcase */}
            {currentProject.gallery && currentProject.gallery.length > 0 && (
              <div className="mt-6 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">
                  Hình ảnh không gian nội thất
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentProject.gallery.map((imgUrl, index) => (
                    <div key={index} className="overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200 shadow-sm group">
                      <img
                        src={imgUrl}
                        alt={`${currentProject.title} - Không gian ${index + 1}`}
                        className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300 max-h-[300px] w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share Buttons - Centered */}
            <div className="flex items-center justify-center gap-3 my-6 pt-6 border-t border-zinc-200/65">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#1877f2] hover:border-[#1877f2] hover:bg-[#1877f2]/5 transition-all duration-300"
                title="Chia sẻ Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(currentProject.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#1da1f2] hover:border-[#1da1f2] hover:bg-[#1da1f2]/5 transition-all duration-300"
                title="Chia sẻ Twitter"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(currentProject.title)}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#ea4335] hover:border-[#ea4335] hover:bg-[#ea4335]/5 transition-all duration-300"
                title="Chia sẻ Email"
              >
                <Mail size={18} />
              </a>

              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&media=${encodeURIComponent(currentProject.image)}&description=${encodeURIComponent(currentProject.excerpt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#bd081c] hover:border-[#bd081c] hover:bg-[#bd081c]/5 transition-all duration-300"
                title="Chia sẻ Pinterest"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.907 2.17-2.907 1.02 0 1.513.769 1.513 1.687 0 1.029-.652 2.561-.99 3.99-.282 1.189.599 2.16 1.77 2.16 2.124 0 3.757-2.243 3.757-5.487 0-2.868-2.062-4.878-5.01-4.878-3.417 0-5.422 2.563-5.422 5.21 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z"/>
                </svg>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-[#0a66c2] hover:border-[#0a66c2] hover:bg-[#0a66c2]/5 transition-all duration-300"
                title="Chia sẻ LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: 30% (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            
            {/* Inline Consultation/Contact Form */}
            <div className="w-full bg-[#007ba1] rounded-2xl overflow-hidden shadow-lg p-5 border border-white/10">
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 font-sans text-xs md:text-sm">
                  
                  {/* Header */}
                  <div className="text-center mb-2 flex flex-col gap-1">
                    <h3 className="text-[#fbbf24] text-base md:text-lg font-bold tracking-wider leading-snug">
                      MIỄN PHÍ 100% <br /> PHÍ THIẾT KẾ
                    </h3>
                    <p className="text-white text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                      KHI THI CÔNG TRỌN GÓI
                    </p>
                  </div>

                  {/* Nhu Cầu */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <Home size={16} />
                    </div>
                    <select
                      value={nhuCau}
                      onChange={(e) => setNhuCau(e.target.value)}
                      required
                      className="w-full px-2 text-zinc-700 bg-white focus:outline-none cursor-pointer text-xs h-full"
                    >
                      <option value="" disabled hidden>Nhu cầu: (*)</option>
                      <option value="Xây nhà trọn gói">Xây nhà trọn gói</option>
                      <option value="Thiết kế kiến trúc">Thiết kế kiến trúc</option>
                      <option value="Thiết kế & thi công nội thất">Thiết kế & thi công nội thất</option>
                      <option value="Thi công phần thô">Thi công phần thô</option>
                    </select>
                  </div>

                  {/* Họ và Tên */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Họ và Tên"
                      value={hoTen}
                      onChange={(e) => setHoTen(e.target.value)}
                      className="w-full px-2.5 text-zinc-700 focus:outline-none text-xs h-full"
                    />
                  </div>

                  {/* Số điện thoại */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại (*)"
                      value={soDienThoai}
                      onChange={(e) => setSoDienThoai(e.target.value)}
                      required
                      className="w-full px-2.5 text-zinc-700 focus:outline-none text-xs h-full"
                    />
                  </div>

                  {/* Diện tích */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <Layers size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Diện tích đất & Số tầng"
                      value={dienTich}
                      onChange={(e) => setDienTich(e.target.value)}
                      className="w-full px-2.5 text-zinc-700 focus:outline-none text-xs h-full"
                    />
                  </div>

                  {/* Tỉnh thành */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <MapPin size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Tỉnh thành"
                      value={tinhThanh}
                      onChange={(e) => setTinhThanh(e.target.value)}
                      className="w-full px-2.5 text-zinc-700 focus:outline-none text-xs h-full"
                    />
                  </div>

                  {/* Yêu cầu */}
                  <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-10">
                    <div className="w-10 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                      <Mail size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Yêu cầu chi tiết"
                      value={yeuCau}
                      onChange={(e) => setYeuCau(e.target.value)}
                      className="w-full px-2.5 text-zinc-700 focus:outline-none text-xs h-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-white font-bold tracking-wider uppercase text-xs transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center border border-amber-300/35"
                  >
                    NHẬN TƯ VẤN
                  </button>

                </form>
              ) : (
                /* Success Message Content */
                <div className="flex flex-col items-center justify-center text-center py-6 gap-3 font-sans">
                  <CheckCircle size={48} className="text-[#fbbf24] animate-bounce" />
                  <div className="flex flex-col gap-1 px-1">
                    <h4 className="text-white text-sm font-bold">GỬI THÀNH CÔNG!</h4>
                    <p className="text-white/80 text-[11px] leading-relaxed font-light">
                      Gamma Home đã nhận được thông tin đăng ký tư vấn của bạn. Chúng tôi sẽ phản hồi lập tức!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Latest Articles list ("bài viết mới nhất") */}
            <div className="w-full bg-white rounded-xl p-5 border border-zinc-200/50 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-bold text-zinc-900 border-b border-zinc-200 pb-2 uppercase tracking-wide">
                Bài viết mới nhất
              </h3>
              <div className="flex flex-col gap-4">
                {latestNews.map((news) => (
                  <Link key={news.id} href={`/tin-tuc/${news.slug}`} className="flex gap-3 group items-start">
                    <div className="relative w-16 h-12 overflow-hidden bg-zinc-100 rounded shrink-0">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-semibold text-zinc-800 group-hover:text-[#f39221] line-clamp-2 uppercase leading-snug transition-colors">
                        {news.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-medium">{news.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Related Articles / Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16 border-t border-zinc-200/60 pt-10">
            <h3 className="text-lg font-bold font-serif uppercase tracking-wider text-zinc-950 mb-6">
              Bài viết liên quan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((proj) => (
                <div 
                  key={proj.id} 
                  className="flex flex-col gap-3 group bg-white border border-zinc-200/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-zinc-100">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#f39221] bg-amber-500/10 px-2 py-0.5 rounded">
                        Nội thất
                      </span>
                    </div>
                    <h4 className="font-semibold text-xs md:text-sm text-zinc-900 group-hover:text-[#f39221] transition-colors uppercase line-clamp-2 min-h-[40px] leading-snug">
                      <Link href={`/noi-that/${proj.slug}`}>{proj.title}</Link>
                    </h4>
                    <p className="text-xs text-zinc-500 line-clamp-2 font-light">
                      {proj.excerpt}
                    </p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-100 text-xs">
                      <span className="text-[#f39221] font-bold hover:underline">
                        <Link href={`/noi-that/${proj.slug}`}>Chi tiết &raquo;</Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
