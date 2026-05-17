'use client';

import { useParams } from 'next/navigation';
import { MOCK_PROJECTS } from '../../../data/mockData';
import CategoryPage, { CategoryItem } from '../../../components/shared/CategoryPage';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const serviceMappings: Record<string, { title: string; desc: string; filter: (p: any) => boolean }> = {
    'xay-nha-tron-goi': {
      title: 'DỰ ÁN XÂY NHÀ TRỌN GÓI',
      desc: 'Tổng hợp các công trình Xây nhà trọn gói tiêu biểu được bàn giao chìa khóa trao tay bởi Kita Home, cam kết kết cấu chịu lực an toàn bền bỉ và chất lượng hoàn thiện tuyệt hảo.',
      filter: (p) => p.category !== 'noi-that',
    },
    'thiet-ke-kien-truc': {
      title: 'HỒ SƠ THIẾT KẾ KIẾN TRÚC',
      desc: 'Các mẫu hồ sơ thiết kế kiến trúc nhà phố hiện đại, biệt thự sang trọng, nhà vườn mái Nhật, mái Thái được sáng tạo bởi đội ngũ kiến trúc sư Kita Home.',
      filter: (p) => p.category !== 'noi-that',
    },
    'thiet-ke-noi-that': {
      title: 'DỰ ÁN THIẾT KẾ NỘI THẤT',
      desc: 'Tuyển tập các mẫu thiết kế và thi công nội thất căn hộ penthouse, phòng khách, phòng bếp, phòng ngủ sang trọng sử dụng gỗ công nghiệp An Cường cao cấp.',
      filter: (p) => p.category === 'noi-that',
    },
    'thi-cong-phan-tho': {
      title: 'CÔNG TRÌNH THI CÔNG PHẦN THÔ',
      desc: 'Các công trình đang và đã triển khai phần thô kết cấu thép móng, cột dầm sàn chất lượng bê tông cao cấp của công ty cổ phần kiến trúc xây dựng Kita Home.',
      filter: (p) => p.category !== 'noi-that',
    },
  };

  const service = serviceMappings[slug] || {
    title: 'DỊCH VỤ CỦA KITA HOME',
    desc: 'Kita Home cung cấp các giải pháp toàn diện về tư vấn thiết kế kiến trúc, thiết kế nội thất, thi công xây thô và xây dựng trọn gói uy tín chất lượng.',
    filter: () => true,
  };

  const filteredProjects = MOCK_PROJECTS.filter(service.filter);

  const items: CategoryItem[] = filteredProjects.map((proj, index) => ({
    id: proj.id,
    title: proj.title,
    image: proj.image,
    excerpt: proj.excerpt,
    views: 24 + index * 8,
    slug: proj.slug,
  }));

  return (
    <CategoryPage
      title={service.title}
      description={service.desc}
      items={items}
      basePath="/du-an"
    />
  );
}
