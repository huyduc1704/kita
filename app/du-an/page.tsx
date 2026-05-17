'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_PROJECTS } from '../../data/mockData';
import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

function ProjectsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat');

  // Filter projects by category query parameter if active
  const filteredProjects = cat
    ? MOCK_PROJECTS.filter((proj) => proj.category === cat)
    : MOCK_PROJECTS;

  const categoryTitles: Record<string, string> = {
    'nha-pho': 'DỰ ÁN NHÀ PHỐ',
    'mai-nhat': 'DỰ ÁN NHÀ MÁI NHẬT',
    'mai-thai': 'DỰ ÁN NHÀ MÁI THÁI',
    'biet-thu': 'DỰ ÁN BIỆT THỰ',
    'nha-vuon': 'DỰ ÁN NHÀ VƯỜN',
    'noi-that': 'DỰ ÁN NỘI THẤT',
  };

  const title = cat ? categoryTitles[cat] || 'DỰ ÁN TIÊU BIỂU' : 'DỰ ÁN TIÊU BIỂU';
  const description = 'Các Công trình và Dự án thiết kế kiến trúc dưới bàn tay tài hoa của các kiến trúc sư tại KITA HOME mang đến một phong cách Đặc biệt - Sang trọng và Cá tính riêng. Xây dựng kiến trúc tốt là nền tảng cho sự phát triển của mọi gia đình. Một không gian sống tốt hòa hợp với Thiên nhiên - Tinh tế trong thẩm mỹ và vô cùng tiện ích cho không gian sống độc đáo.';

  // Map filtered projects to CategoryItem interface
  const items: CategoryItem[] = filteredProjects.map((proj, index) => ({
    id: proj.id,
    title: proj.title,
    image: proj.image,
    excerpt: proj.excerpt,
    views: 12 + index * 6,
    slug: proj.slug
  }));

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/du-an"
    />
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500">Đang tải danh mục dự án...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
