'use client';

import { MOCK_NEWS } from '../../data/mockData';
import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

export default function NewsPage() {
  const title = 'TIN TỨC HOẠT ĐỘNG';
  const description = 'Cập nhật nhanh chóng các tin tức hoạt động, sự kiện nổi bật, lễ ký kết hợp đồng, lễ bàn giao chìa khóa trao tay công trình thực tế và các hoạt động nội bộ đầy năng động của đội ngũ cán bộ nhân viên công ty cổ phần kiến trúc & xây dựng KITA HOME.';

  // Map mock news items to CategoryItem interface
  const items: CategoryItem[] = MOCK_NEWS.map((news, index) => ({
    id: news.id,
    title: news.title.toUpperCase(),
    image: news.image,
    excerpt: news.excerpt,
    views: 18 + index * 5,
    slug: news.slug
  }));

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/tin-tuc"
    />
  );
}
