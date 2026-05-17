'use client';

import { useState, useEffect } from 'react';
import { getNews } from '../../utils/api';
import { NewsItem } from '../../data/mockData';
import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

export default function KnowledgePage() {
  const title = 'KIẾN THỨC XÂY DỰNG';
  const description = 'Chuyên mục chia sẻ cẩm nang xây nhà, kinh nghiệm chọn vật liệu, phong thủy nhà ở khoa học và các hướng dẫn kỹ thuật thiết thực giúp chủ đầu tư trang bị đầy đủ kiến thức trước khi bước vào hành trình kiến tạo tổ ấm mơ ước.';
  const [articles, setArticles] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNews().then(items => {
      // Filter for knowledge/ feng-shui / handbook categories
      const filtered = items.filter(item => ['cam-nang', 'phong-thuy'].includes(item.category));
      setArticles(filtered);
    });
  }, []);

  const defaultMockItems: CategoryItem[] = [
    {
      id: 'kt1',
      title: 'KINH NGHIỆM LỰA CHỌN VẬT LIỆU XÂY THÔ ĐẠT CHUẨN CHẤT LƯỢNG',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Hướng dẫn chi tiết cách nhận biết cát sạch xây tô, thép xây dựng chính hãng Hòa Phát, xi măng chất lượng cao giúp hệ khung bê tông cốt thép của ngôi nhà bền bỉ trăm năm.',
      views: 95,
      slug: 'kinh-nghiem-lua-chon-vat-lieu-xay-tho'
    },
    {
      id: 'kt2',
      title: 'PHONG THỦY XÂY DỰNG NHÀ Ở: NHỮNG NGUYÊN TẮC VÀNG CẦN BIẾT',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Tìm hiểu phong thủy phòng khách, phòng thờ, hướng bếp và cách bố trí cửa chính - cửa sổ chuẩn khí động học giúp đón nhận trọn vẹn luồng vượng khí, tài lộc dồi dào.',
      views: 142,
      slug: 'phong-thuy-xay-dung-nha-o-nguyen-tac-vang'
    },
    {
      id: 'kt3',
      title: 'QUY TRÌNH GIÁM SÁT THI CÔNG ÉP CỌC BÊ TÔNG MÓNG NHÀ PHỐ',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Móng nhà là nền tảng cốt lõi của công trình. Khám phá quy trình giám sát lực ép cọc đầu cọc bê tông cốt thép, khoảng cách cọc và các tiêu chí nghiệm thu phần móng chuẩn kỹ thuật.',
      views: 68,
      slug: 'quy-trinh-giam-sat-thi-cong-ep-coc-mong'
    },
    {
      id: 'kt4',
      title: 'HƯỚNG DẪN DỰ TOÁN CHI PHÍ XÂY NHÀ TRỌN GÓI KHÔNG PHÁT SINH',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Cách tính diện tích xây dựng theo hệ số mái, móng, ban công và lập bảng dự toán vật tư hoàn thiện chi tiết. Các mẹo thương thảo hợp đồng giúp kiểm soát chặt chẽ ngân sách.',
      views: 110,
      slug: 'huong-dan-du-toan-chi-chi-xay-nha'
    }
  ];

  const items: CategoryItem[] = articles.length > 0 
    ? articles.map((art, index) => ({
        id: art.id,
        title: art.title.toUpperCase(),
        image: art.image,
        excerpt: art.excerpt,
        views: 85 + index * 10,
        slug: art.slug
      }))
    : defaultMockItems;

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/kien-thuc"
    />
  );
}
