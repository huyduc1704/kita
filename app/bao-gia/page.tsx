'use client';

import CategoryPage, { CategoryItem } from '../../components/shared/CategoryPage';

export default function PricingPage() {
  const title = 'BẢNG BÁO GIÁ DỊCH VỤ';
  const description = 'Gamma Home cam kết mang đến dịch vụ thiết kế và thi công xây dựng với bảng giá chi tiết, minh bạch và cạnh tranh nhất trên thị trường. Các gói giải pháp được tối ưu hóa theo từng nhu cầu và ngân sách của chủ đầu tư, cam kết không phát sinh bất kỳ chi phí ngoài hợp đồng.';

  // Pricing packages lists mapped as CategoryItem
  const items: CategoryItem[] = [
    {
      id: 'bg1',
      title: 'BÁO GIÁ THI CÔNG XÂY NHÀ TRỌN GÓI BIỆT THỰ & PHỐ',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Đơn giá xây dựng trọn gói chìa khóa trao tay dao động từ 5.500.000đ - 7.500.000đ/m2 tùy gói vật tư. Nhận ngay ưu đãi miễn phí 100% chi phí thiết kế và cấp phép.',
      views: 124,
      slug: 'bao-gia-xay-nha-tron-goi'
    },
    {
      id: 'bg2',
      title: 'ĐƠN GIÁ THIẾT KẾ KIẾN TRÚC MỚI NHẤT',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Bảng giá thiết kế kiến trúc nhà phố, biệt thự chỉ từ 120.000đ - 220.000đ/m2. Hồ sơ bao gồm phối cảnh 3D ngoại thất, hồ sơ kết cấu, điện nước và tư vấn phong thủy.',
      views: 89,
      slug: 'don-gia-thiet-ke-kien-truc'
    },
    {
      id: 'bg3',
      title: 'BÁO GIÁ THIẾT KẾ VÀ THI CÔNG NỘI THẤT TRỌN GÓI',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Thiết kế nội thất từ 150.000đ/m2. Thi công nội thất trọn gói sử dụng vật liệu gỗ MDF chống ẩm An Cường cao cấp, gỗ tự nhiên gõ đỏ, óc chó chuẩn gu sang trọng.',
      views: 74,
      slug: 'bao-gia-thi-cong-noi-that'
    },
    {
      id: 'bg4',
      title: 'ĐƠN GIÁ THI CÔNG PHẦN THÔ & NHÂN CÔNG HOÀN THIỆN',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      excerpt: 'Đơn giá thi công phần thô tiêu chuẩn từ 3.400.000đ - 3.800.000đ/m2. Cam kết sử dụng vật liệu thô chính hãng chất lượng cao (thép Hòa Phát, xi măng Bút Sơn...).',
      views: 52,
      slug: 'don-gia-thi-cong-phan-tho'
    }
  ];

  return (
    <CategoryPage
      title={title}
      description={description}
      items={items}
      basePath="/bao-gia"
    />
  );
}
