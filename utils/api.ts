import {
  MOCK_PROJECTS,
  MOCK_SERVICES,
  MOCK_NEWS,
  Project,
  Service,
  NewsItem
} from '@/data/mockData';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Hàm gọi API an toàn, nếu lỗi kết nối hoặc không có dữ liệu sẽ tự động trả về giá trị mặc định (Mock Data)
 */
async function safeFetch<T>(url: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(url, {
      cache: 'no-store', // Tắt cache để cập nhật dữ liệu mới từ Strapi lập tức khi tải lại trang
    });

    if (!res.ok) {
      console.warn(`[Strapi API] Gọi ${url} không thành công (Status: ${res.status}). Sử dụng Mock Data.`);
      return fallbackData;
    }

    const json = await res.json();
    if (!json || !json.data || (Array.isArray(json.data) && json.data.length === 0)) {
      return fallbackData;
    }

    return json.data as T;
  } catch (error) {
    console.warn(`[Strapi API] Không thể kết nối tới ${url}. Sử dụng Mock Data.`);
    return fallbackData;
  }
}

/**
 * 1. LẤY DANH SÁCH DỰ ÁN (PROJECTS)
 * Tự động đồng bộ hóa cấu hình giữa Strapi và MOCK_PROJECTS
 */
export async function getProjects(): Promise<Project[]> {
  const url = `${STRAPI_URL}/api/posts?filters[category][slug][$in][0]=nha-pho&filters[category][slug][$in][1]=mai-nhat&filters[category][slug][$in][2]=mai-thai&filters[category][slug][$in][3]=biet-thu&filters[category][slug][$in][4]=nha-vuon&filters[category][slug][$in][5]=noi-that&populate=*&sort=publishedAt:desc`;

  const strapiData = await safeFetch<any[] | null>(url, null);

  if (!strapiData) {
    return MOCK_PROJECTS;
  }

  return strapiData.map(post => ({
    id: post.documentId || String(post.id),
    title: post.title,
    slug: post.slug,
    category: (post.category?.slug || 'nha-pho') as any,
    image: post.thumbnail?.url
      ? (post.thumbnail.url.startsWith('http') ? post.thumbnail.url : `${STRAPI_URL}${post.thumbnail.url}`)
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt: post.excerpt || '',
    description: post.content || '',
    details: post.details || {
      client: 'Khách hàng Gamma Home',
      location: 'Việt Nam',
      scale: 'Hiện đại',
      area: 'Liên hệ',
      year: '2026'
    },
    gallery: post.gallery?.map((img: any) =>
      img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`
    ) || []
  }));
}

/**
 * 2. LẤY DANH SÁCH DỊCH VỤ (SERVICES)
 */
export async function getServices(): Promise<Service[]> {
  const url = `${STRAPI_URL}/api/posts?filters[category][slug]=dich-vu&populate=*&sort=publishedAt:asc`;

  const strapiData = await safeFetch<any[] | null>(url, null);

  if (!strapiData) {
    return MOCK_SERVICES;
  }

  return strapiData.map(post => ({
    id: post.documentId || String(post.id),
    title: post.title,
    slug: post.slug,
    description: post.excerpt || '',
    icon: post.iconName || 'Home',
    highlight: post.highlightText || undefined,
    features: post.featuresList ? post.featuresList.split('\n').filter(Boolean) : []
  }));
}

/**
 * 3. LẤY DANH SÁCH TIN TỨC / CẨM NANG (NEWS)
 */
export async function getNews(): Promise<NewsItem[]> {
  const url = `${STRAPI_URL}/api/posts?filters[category][slug][$in][0]=tin-noi-bo&filters[category][slug][$in][1]=tin-du-an&filters[category][slug][$in][2]=phong-thuy&filters[category][slug][$in][3]=cam-nang&populate=*&sort=publishedAt:desc`;

  const strapiData = await safeFetch<any[] | null>(url, null);

  if (!strapiData) {
    return MOCK_NEWS;
  }

  return strapiData.map(post => ({
    id: post.documentId || String(post.id),
    title: post.title,
    slug: post.slug,
    category: (post.category?.slug || 'cam-nang') as any,
    image: post.thumbnail?.url
      ? (post.thumbnail.url.startsWith('http') ? post.thumbnail.url : `${STRAPI_URL}${post.thumbnail.url}`)
      : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : '15/05/2026',
    excerpt: post.excerpt || '',
    content: post.content || ''
  }));
}

/**
 * 4. LẤY CHI TIẾT BÀI VIẾT / DỰ ÁN / DỊCH VỤ THEO SLUG
 */
export async function getPostBySlug(slug: string): Promise<{
  project?: Project;
  newsItem?: NewsItem;
  service?: Service;
} | null> {
  const url = `${STRAPI_URL}/api/posts?filters[slug]=${slug}&populate=*`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.length > 0) {
        const post = json.data[0];
        const categorySlug = post.category?.slug || '';

        // Phân loại kiểu dữ liệu dựa trên slug danh mục của bài viết trong Strapi
        if (['nha-pho', 'mai-nhat', 'mai-thai', 'biet-thu', 'nha-vuon', 'noi-that'].includes(categorySlug)) {
          return {
            project: {
              id: post.documentId || String(post.id),
              title: post.title,
              slug: post.slug,
              category: categorySlug as any,
              image: post.thumbnail?.url
                ? (post.thumbnail.url.startsWith('http') ? post.thumbnail.url : `${STRAPI_URL}${post.thumbnail.url}`)
                : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
              excerpt: post.excerpt || '',
              description: post.content || '',
              details: post.details || {
                client: 'Khách hàng Gamma Home',
                location: 'Việt Nam',
                scale: 'Hiện đại',
                area: 'Liên hệ',
                year: '2026'
              },
              gallery: post.gallery?.map((img: any) =>
                img.url.startsWith('http') ? img.url : `${STRAPI_URL}${img.url}`
              ) || []
            }
          };
        } else if (categorySlug === 'dich-vu') {
          return {
            service: {
              id: post.documentId || String(post.id),
              title: post.title,
              slug: post.slug,
              description: post.excerpt || '',
              icon: post.iconName || 'Home',
              highlight: post.highlightText || undefined,
              features: post.featuresList ? post.featuresList.split('\n').filter(Boolean) : []
            }
          };
        } else {
          return {
            newsItem: {
              id: post.documentId || String(post.id),
              title: post.title,
              slug: post.slug,
              category: categorySlug as any,
              image: post.thumbnail?.url
                ? (post.thumbnail.url.startsWith('http') ? post.thumbnail.url : `${STRAPI_URL}${post.thumbnail.url}`)
                : 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
              date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : '15/05/2026',
              excerpt: post.excerpt || '',
              content: post.content || ''
            }
          };
        }
      }
    }
  } catch (e) {
    console.warn(`[Strapi API] Lỗi lấy bài viết chi tiết theo slug ${slug}. Đang tìm kiếm trong Mock Data...`);
  }

  // FALLBACK: Nếu không có dữ liệu từ Strapi, tìm kiếm trong Mock Data
  const mockProject = MOCK_PROJECTS.find(p => p.slug === slug);
  if (mockProject) return { project: mockProject };

  const mockNews = MOCK_NEWS.find(n => n.slug === slug);
  if (mockNews) return { newsItem: mockNews };

  const mockService = MOCK_SERVICES.find(s => s.slug === slug);
  if (mockService) return { service: mockService };

  return null;
}

/**
 * 5. LẤY CẤU HÌNH HỆ THỐNG (HOTLINE, SOCIALS...)
 */
export interface SystemSetting {
  hotline: string;
  zaloUrl?: string;
  messengerUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  facebookPage?: string;
  facebookUrl?: string;
  companyName: string;
  taxCode?: string;
  slogan: string;
  addressList?: string;
  addressNorth?: string;
  addressSouth?: string;
  email?: string;
}

export async function getSystemSetting(): Promise<SystemSetting> {
  const url = `${STRAPI_URL}/api/setting`;

  const defaultFallback: SystemSetting = {
    hotline: '0827.972.555',
    zaloUrl: 'https://zalo.me/0827972555',
    messengerUrl: 'https://www.messenger.com/t/100076260787549/',
    tiktokUrl: 'https://www.tiktok.com/@kitahome',
    facebookUrl: 'https://www.facebook.com/profile.php?id=100076260787549',
    companyName: 'CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ XÂY DỰNG GAMMA HOME',
    slogan: 'Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà',
    addressList: 'VPGD Hà Nội: Cổ Loa, Đông Anh, Hà Nội\nHotline: 0827.972.555',
    addressNorth: 'G29-30 - Khu đấu giá Ngô Thì Nhậm - Hà Cầu - Hà Đông - TP Hà Nội',
    addressSouth: 'Đường T2-41 Khu Biệt Thự Manhattan - Vinhomes Grand Park - P.Long Bình - TP.Thủ Đức - Hồ Chí Minh',
    email: 'Nhadepgamma@gmail.com'
  };

  const strapiData = await safeFetch<any | null>(url, null);

  if (!strapiData) {
    return defaultFallback;
  }

  return {
    hotline: strapiData.hotline || defaultFallback.hotline,
    zaloUrl: strapiData.zaloUrl || defaultFallback.zaloUrl,
    messengerUrl: strapiData.messengerUrl || defaultFallback.messengerUrl,
    tiktokUrl: strapiData.tiktokUrl || defaultFallback.tiktokUrl,
    youtubeUrl: strapiData.youtubeUrl || undefined,
    facebookPage: strapiData.facebookPage || undefined,
    facebookUrl: strapiData.facebookUrl || strapiData.facebookPage || defaultFallback.facebookUrl,
    companyName: strapiData.companyName || defaultFallback.companyName,
    taxCode: strapiData.taxCode || undefined,
    slogan: strapiData.slogan || defaultFallback.slogan,
    addressList: strapiData.addressList || defaultFallback.addressList,
    addressNorth: strapiData.addressNorth || defaultFallback.addressNorth,
    addressSouth: strapiData.addressSouth || defaultFallback.addressSouth,
    email: strapiData.email || defaultFallback.email
  };
}

/**
 * 6. LẤY DANH SÁCH BANNER SLIDES TRANG CHỦ (HERO SLIDES)
 */
export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  highlight: string;
  ctaText: string;
  ctaLink: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const url = `${STRAPI_URL}/api/hero-slides?populate=*&sort=orderNumber:asc`;

  const defaultFallback: HeroSlide[] = [
    {
      image: '/kita/kita-baner1.webp',
      title: 'KIẾN TẠO TỔ ẤM TRỌN NIỀM TIN',
      subtitle: '“Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà”',
      highlight: 'GAMMA HOME',
      ctaText: 'Xem các dự án',
      ctaLink: '#projects',
    },
    {
      image: '/kita/kita-baner2-2.webp',
      title: 'MIỄN PHÍ 100% CHI PHÍ THIẾT KẾ',
      subtitle: 'Nhận ngay ưu đãi thiết kế trọn gói khi ký hợp đồng thi công trọn gói.',
      highlight: 'XÂY NHÀ TRỌN GÓI',
      ctaText: 'Đăng ký tư vấn',
      ctaLink: '#contact-form',
    },
    {
      image: '/kita/kita-baner3.webp',
      title: 'NỘI THẤT SANG TRỌNG ĐẲNG CẤP',
      subtitle: 'Thiết kế thi công nội thất tinh tế, chất lượng cao, chuẩn gu thượng lưu.',
      highlight: 'ĐỘC BẢN & TINH TẾ',
      ctaText: 'Xem bảng báo giá',
      ctaLink: '/bao-gia',
    },
    {
      image: '/kita/kita-baner4.webp',
      title: 'THI CÔNG TRỌN GÓI CHUYÊN NGHIỆP',
      subtitle: 'Cam kết không phát sinh chi phí, bàn giao đúng tiến độ, vật liệu chính hãng.',
      highlight: 'BÀN GIAO CHÌA KHÓA TRAO TAY',
      ctaText: 'Xem bảng dự toán',
      ctaLink: '#contact-form',
    },
    {
      image: '/kita/kita-baner5.webp',
      title: 'ĐỘI NGŨ KIẾN TRÚC SƯ KINH NGHIỆM',
      subtitle: 'Hiện thực hóa mọi ý tưởng thiết kế độc bản, mang đậm dấu ấn cá nhân của bạn.',
      highlight: 'TƯ VẤN KHẢO SÁT MIỄN PHÍ',
      ctaText: 'Liên hệ ngay',
      ctaLink: '#contact-form',
    },
  ];

  const strapiData = await safeFetch<any[] | null>(url, null);

  if (!strapiData) {
    return defaultFallback;
  }

  return strapiData.map(slide => ({
    image: slide.image?.url
      ? (slide.image.url.startsWith('http') ? slide.image.url : `${STRAPI_URL}${slide.image.url}`)
      : '/kita/kita-baner1.webp',
    title: slide.title || '',
    subtitle: slide.subtitle || '',
    highlight: slide.highlight || '',
    ctaText: slide.ctaText || 'Xem thêm',
    ctaLink: slide.ctaLink || '#',
  }));
}

