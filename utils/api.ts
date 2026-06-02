import {
  MOCK_PROJECTS,
  MOCK_SERVICES,
  MOCK_NEWS,
  Project,
  Service,
  NewsItem
} from '@/data/mockData';

export type { Project, Service, NewsItem };

// ─── Base URL ──────────────────────────────────────────────────────────────
// Dùng proxy /api/* → kita-be (4000) thay vì gọi thẳng Strapi
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// ─── Helpers ───────────────────────────────────────────────────────────────

// Content từ Quill là HTML (bắt đầu bằng tag), content cũ là Markdown
function renderContent(raw: string): string {
  if (!raw) return '';
  if (raw.trimStart().startsWith('<')) {
    // Quill đôi khi encode space thành &nbsp; khiến text không xuống dòng
    return raw.replace(/&nbsp;/g, ' ');
  }
  return formatRichText(raw);
}

export function formatRichText(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => {
    const encodedUrl = url.trim().replace(/_/g, '%%UNDERSCORE%%');
    return `<img src="${encodedUrl}" alt="${alt}" class="w-full h-auto object-cover rounded-xl shadow-md my-6 max-h-[500px] block mx-auto" />`;
  });
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    const encodedUrl = url.trim().replace(/_/g, '%%UNDERSCORE%%');
    return `<a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="text-[#f39221] hover:underline font-semibold">${text}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\b_([^_]+)_\b/g, '<em>$1</em>');
  html = html.replace(/%%UNDERSCORE%%/g, '_');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-base md:text-lg font-bold text-zinc-950 mt-6 mb-3 font-serif uppercase tracking-wide">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg md:text-xl font-bold text-zinc-950 mt-8 mb-4 font-serif uppercase tracking-wide border-b border-zinc-200 pb-2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl md:text-2xl font-bold text-zinc-950 mt-10 mb-4 font-serif uppercase tracking-wide">$1</h1>');
  html = html.replace(/^\s*[*+-]\s+(.*$)/gim, '<li class="ml-5 list-disc text-zinc-700 pl-1 py-1 font-light text-sm md:text-base">$1</li>');
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-5 list-decimal text-zinc-700 pl-1 py-1 font-light text-sm md:text-base">$1</li>');

  const blocks = html.split(/\n\n+/);
  return blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<img') || trimmed.startsWith('<li')) return trimmed;
    return `<p class="mb-4 text-justify font-light leading-relaxed text-zinc-700 text-sm md:text-base">${trimmed.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');
}

export function parseCustomSpecs(text: string): { label: string; value: string }[] | undefined {
  if (!text?.trim()) return undefined;
  const list = text.split('\n').flatMap(line => {
    const i = line.indexOf(':');
    if (i === -1) return [];
    const label = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim();
    return label && value ? [{ label, value }] : [];
  });
  return list.length > 0 ? list : undefined;
}

async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

// ─── Mappers ───────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(post: any): Project {
  const meta = (post.metadata as Record<string, string>) || {};
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    category: (post.category?.slug || 'nha-pho') as Project['category'],
    image: post.thumbnailUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt: post.excerpt || '',
    description: renderContent(post.content || ''),
    details: {
      client:   meta.client   || 'Khách hàng Gamma Home',
      location: meta.location || 'Việt Nam',
      scale:    meta.scale    || 'Hiện đại',
      area:     meta.area     || 'Liên hệ',
      year:     meta.year     || String(new Date().getFullYear()),
    },
    gallery: post.gallery || [],
    customSpecsList: undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(post: any): Service {
  const meta = (post.metadata as Record<string, string[]>) || {};
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    description: post.excerpt || '',
    icon: 'Home',
    highlight: undefined,
    features: meta.features || [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapNews(post: any): NewsItem {
  return {
    id: String(post.id),
    title: post.title,
    slug: post.slug,
    category: (post.category?.slug || 'cam-nang') as NewsItem['category'],
    image: post.thumbnailUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN'),
    excerpt: post.excerpt || '',
    content: renderContent(post.content || ''),
  };
}

// ─── 1. Dự án ──────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  const data = await apiFetch<{ items: unknown[] } | null>(
    '/posts?type=project&active=true&limit=100', null
  );
  if (!data?.items?.length) return MOCK_PROJECTS;
  return data.items.map(mapPost);
}

// ─── 2. Dịch vụ ────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const data = await apiFetch<{ items: unknown[] } | null>(
    '/posts?type=service&active=true&limit=50', null
  );
  if (!data?.items?.length) return MOCK_SERVICES;
  return data.items.map(mapService);
}

// ─── 3. Tin tức / Kiến thức ────────────────────────────────────────────────

export async function getNews(): Promise<NewsItem[]> {
  const data = await apiFetch<{ items: unknown[] } | null>(
    '/posts?type=news&active=true&limit=50', null
  );
  if (!data?.items?.length) return MOCK_NEWS;
  return data.items.map(mapNews);
}

// ─── 4. Chi tiết bài viết theo slug ───────────────────────────────────────

export async function getPostBySlug(slug: string): Promise<{
  project?: Project;
  newsItem?: NewsItem;
  service?: Service;
} | null> {
  const post = await apiFetch<Record<string, unknown> | null>(`/posts/${slug}`, null);

  if (post?.id) {
    const type = post.type as string;
    if (type === 'project') return { project: mapPost(post) };
    if (type === 'service') return { service: mapService(post) };
    if (type === 'news' || type === 'knowledge') return { newsItem: mapNews(post) };
  }

  // Fallback mock data
  const mockProject = MOCK_PROJECTS.find(p => p.slug === slug);
  if (mockProject) return { project: mockProject };
  const mockNews = MOCK_NEWS.find(n => n.slug === slug);
  if (mockNews) return { newsItem: mockNews };
  const mockService = MOCK_SERVICES.find(s => s.slug === slug);
  if (mockService) return { service: mockService };

  return null;
}

// ─── 5. System Settings ────────────────────────────────────────────────────

export interface SocialButton {
  id: number;
  type: 'phone' | 'zalo' | 'messenger' | 'facebook' | 'tiktok' | 'youtube' | 'custom';
  label: string;
  value: string;
  iconUrl?: string | null;
  position: 'floating' | 'footer' | 'both';
  order: number;
  isActive: boolean;
  resolvedLink: string;
}

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
  feedbackImage?: string;
  faviconUrl?: string;
  logoUrl?: string;
  socialButtons?: SocialButton[];
}

const SETTING_DEFAULT: SystemSetting = {
  hotline: '0827.972.555',
  zaloUrl: 'https://zalo.me/0827972555',
  messengerUrl: 'https://www.messenger.com/t/100076260787549/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100076260787549',
  tiktokUrl: 'https://www.tiktok.com/@nhadepkita1',
  youtubeUrl: 'https://www.youtube.com/@nhadepkita',
  companyName: 'CÔNG TY CỔ PHẦN KIẾN TRÚC VÀ XÂY DỰNG GAMMA HOME',
  slogan: 'Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà',
  addressNorth: 'G29-30 - Khu đấu giá Ngô Thì Nhậm - Hà Cầu - Hà Đông - TP Hà Nội',
  addressSouth: 'Đường T2-41 Khu Biệt Thự Manhattan - Vinhomes Grand Park - P.Long Bình - TP.Thủ Đức - Hồ Chí Minh',
  email: 'Nhadepgamma@gmail.com',
};

export async function getSystemSetting(): Promise<SystemSetting> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await apiFetch<any | null>('/system-settings', null);
  if (!data) return SETTING_DEFAULT;

  // Map social buttons từ kita-be sang các URL mà kita-fe đang dùng
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttons: any[] = data.resolvedSocialButtons || [];
  const findLink = (type: string) => buttons.find((b: { type: string }) => b.type === type)?.resolvedLink;

  return {
    hotline:      data.hotline      || SETTING_DEFAULT.hotline,
    email:        data.email        || SETTING_DEFAULT.email,
    companyName:  data.companyName  || SETTING_DEFAULT.companyName,
    taxCode:      data.taxCode      || undefined,
    slogan:       data.slogan       || SETTING_DEFAULT.slogan,
    addressNorth: data.addressNorth || SETTING_DEFAULT.addressNorth,
    addressSouth: data.addressSouth || SETTING_DEFAULT.addressSouth,
    // Social — ưu tiên lấy từ social buttons, fallback về default
    zaloUrl:      findLink('zalo')      || SETTING_DEFAULT.zaloUrl,
    messengerUrl: findLink('messenger') || SETTING_DEFAULT.messengerUrl,
    facebookUrl:  findLink('facebook')  || SETTING_DEFAULT.facebookUrl,
    facebookPage: findLink('facebook')  || SETTING_DEFAULT.facebookPage,
    tiktokUrl:    findLink('tiktok')    || SETTING_DEFAULT.tiktokUrl,
    youtubeUrl:   findLink('youtube')   || SETTING_DEFAULT.youtubeUrl,
    feedbackImage: data.feedbackImageUrl || undefined,
    faviconUrl:    data.faviconUrl       || undefined,
    logoUrl:       data.logoUrl          || undefined,
    socialButtons: data.resolvedSocialButtons?.length ? data.resolvedSocialButtons : undefined,
  };
}

// ─── 6. Hero Slides ────────────────────────────────────────────────────────

export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  highlight: string;
  ctaText: string;
  ctaLink: string;
}

const HERO_DEFAULT: HeroSlide[] = [
  { image: '/kita/kita-baner1.webp', title: 'KIẾN TẠO TỔ ẤM TRỌN NIỀM TIN', subtitle: '"Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà"', highlight: 'GAMMA HOME', ctaText: 'Xem các dự án', ctaLink: '#projects' },
  { image: '/kita/kita-baner2-2.webp', title: 'MIỄN PHÍ 100% CHI PHÍ THIẾT KẾ', subtitle: 'Nhận ngay ưu đãi thiết kế trọn gói khi ký hợp đồng thi công trọn gói.', highlight: 'XÂY NHÀ TRỌN GÓI', ctaText: 'Đăng ký tư vấn', ctaLink: '#contact-form' },
  { image: '/kita/kita-baner3.webp', title: 'NỘI THẤT SANG TRỌNG ĐẲNG CẤP', subtitle: 'Thiết kế thi công nội thất tinh tế, chất lượng cao.', highlight: 'ĐỘC BẢN & TINH TẾ', ctaText: 'Xem bảng báo giá', ctaLink: '/bao-gia' },
  { image: '/kita/kita-baner4.webp', title: 'THI CÔNG TRỌN GÓI CHUYÊN NGHIỆP', subtitle: 'Cam kết không phát sinh chi phí, bàn giao đúng tiến độ.', highlight: 'BÀN GIAO CHÌA KHÓA TRAO TAY', ctaText: 'Xem bảng dự toán', ctaLink: '#contact-form' },
  { image: '/kita/kita-baner5.webp', title: 'ĐỘI NGŨ KIẾN TRÚC SƯ KINH NGHIỆM', subtitle: 'Hiện thực hóa mọi ý tưởng thiết kế độc bản, mang đậm dấu ấn cá nhân.', highlight: 'TƯ VẤN KHẢO SÁT MIỄN PHÍ', ctaText: 'Liên hệ ngay', ctaLink: '#contact-form' },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await apiFetch<any[] | null>('/hero-slides?active=true', null);
  if (!data?.length) return HERO_DEFAULT;
  return data.map(slide => ({
    image:    slide.imageUrl  || '/kita/kita-baner1.webp',
    title:    slide.title     || '',
    subtitle: slide.subtitle  || '',
    highlight: slide.highlight || '',
    ctaText:  slide.ctaText   || 'Xem thêm',
    ctaLink:  slide.ctaLink   || '#',
  }));
}

// ─── 7. Categories theo nhóm (dùng cho header menu) ───────────────────────

export async function getCategoriesByGroup(group: string): Promise<{ label: string; href: string }[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await apiFetch<any[] | null>(`/categories?group=${group}&active=true`, null);
  if (!data?.length) return [];
  return data.map(cat => ({
    label: cat.name,
    href: `/${group}?cat=${cat.slug}`,
  }));
}

// ─── 8. Submit form tư vấn ────────────────────────────────────────────────

export interface ConsultationLeadPayload {
  name: string;
  phone: string;
  email?: string;
  requirement?: 'build' | 'design' | 'interior' | 'consult';
  area?: string;
  province?: string;
  detailNote?: string;
}

export async function submitConsultationLead(payload: ConsultationLeadPayload): Promise<void> {
  const res = await fetch(`${API_URL}/consultation-leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Gửi form thất bại' }));
    throw new Error(err.message || 'Gửi form thất bại');
  }
}
