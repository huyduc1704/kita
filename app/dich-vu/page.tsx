'use client';

import { useState, useEffect } from 'react';
import { getServices } from '../../utils/api';
import { Service } from '../../data/mockData';
import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

export default function ServicesPage() {
  const title = 'DỊCH VỤ CỦA KITA HOME';
  const description = 'KITA HOME cung cấp các giải pháp toàn diện về tư vấn thiết kế kiến trúc, thiết kế nội thất, thi công phần thô và xây nhà trọn gói chìa khóa trao tay. Với triết lý "Tận tâm trong từng viên gạch", chúng tôi cam kết mang lại sản phẩm đạt chất lượng cao, thẩm mỹ vượt trội, giá thành hợp lý và chính sách bảo hành bảo trì hoàn hảo.';
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  // Map services to CategoryItem interface
  const items: CategoryItem[] = services.map((srv, index) => ({
    id: srv.id,
    title: srv.title.toUpperCase(),
    image: index === 0 
      ? 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
      : index === 1
      ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      : index === 2
      ? 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
      : 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    excerpt: srv.description,
    views: 45 + index * 12,
    slug: srv.slug
  }));

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/dich-vu"
    />
  );
}
