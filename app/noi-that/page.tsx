'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PROJECTS } from '../../data/mockData';
import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

function InteriorContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat');

  // Filter all interior projects
  const allInterior = MOCK_PROJECTS.filter((proj) => proj.category === 'noi-that');

  // Dynamically filter by sub-category query parameter (?cat=nha-pho, ?cat=biet-thu, etc.)
  const filteredInterior = cat
    ? allInterior.filter((proj) => {
        const titleLower = proj.title.toLowerCase();
        const scaleLower = proj.details.scale.toLowerCase();
        
        if (cat === 'nha-pho') return titleLower.includes('nhà phố') || scaleLower.includes('nhà phố');
        if (cat === 'biet-thu') return titleLower.includes('biệt thự') || scaleLower.includes('biệt thự');
        if (cat === 'chung-cu') return titleLower.includes('chung cư') || titleLower.includes('penthouse') || scaleLower.includes('penthouse');
        if (cat === 'khach-san') return titleLower.includes('khách sạn') || scaleLower.includes('khách sạn');
        if (cat === 'van-phong') return titleLower.includes('văn phòng') || scaleLower.includes('văn phòng');
        return true;
      })
    : allInterior;

  const categoryTitles: Record<string, string> = {
    'nha-pho': 'NỘI THẤT NHÀ PHỐ',
    'biet-thu': 'NỘI THẤT BIỆT THỰ',
    'chung-cu': 'NỘI THẤT CHUNG CƯ',
    'khach-san': 'NỘI THẤT KHÁCH SẠN',
    'van-phong': 'NỘI THẤT VĂN PHÒNG',
  };

  const title = cat ? categoryTitles[cat] || 'THIẾT KẾ NỘI THẤT' : 'THIẾT KẾ NỘI THẤT';
  const description = 'Không gian nội thất là tâm hồn của ngôi nhà. Kita Home mang đến những mẫu thiết kế nội thất phòng khách, phòng bếp, phòng ngủ sang trọng và độc bản. Chúng tôi đề cao sự tinh tế, việc sử dụng các vật liệu cao cấp an toàn và giải pháp tối ưu công năng sinh hoạt tối đa cho mọi gia đình.';

  // Map filtered projects to CategoryItem
  const items: CategoryItem[] = filteredInterior.map((proj, index) => ({
    id: proj.id,
    title: proj.title,
    image: proj.image,
    excerpt: proj.excerpt,
    views: 32 + index * 14,
    slug: proj.slug
  }));

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/noi-that"
    />
  );
}

export default function InteriorPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500">Đang tải danh mục nội thất...</div>}>
      <InteriorContent />
    </Suspense>
  );
}
