export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'nha-pho' | 'mai-nhat' | 'mai-thai' | 'biet-thu' | 'nha-vuon' | 'noi-that';
  image: string;
  excerpt: string;
  description?: string;
  details: {
    client: string;
    location: string;
    scale: string;
    year: string;
    area?: string;
  };
  gallery?: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  highlight?: string;
  features: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'tin-noi-bo' | 'tin-du-an' | 'phong-thuy' | 'cam-nang';
  image: string;
  date: string;
  excerpt: string;
  content?: string;
}

// 1. MOCK DATA DỰ ÁN (PROJECTS)
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'NHÀ PHỐ HIỆN ĐẠI 8X28M | ANH NGHĨA – BÌNH PHƯỚC',
    slug: 'nha-pho-2-tang-hien-dai-8x28m-anh-nghia-binh-phuoc',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sở hữu mảnh đất rộng lớn kích thước 8x28m tại Bình Phước, anh Nghĩa mong muốn một không gian sống hiện đại, thoáng đãng và ngập tràn cây xanh.',
    details: {
      client: 'Anh Nghĩa',
      location: 'Bình Phước',
      scale: '2 Tầng, 1 Tum',
      area: '224 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '2',
    title: 'MẪU THIẾT KẾ NHÀ PHỐ 4 TẦNG 1 TUM HIỆN ĐẠI | CHỊ THU – ĐÔNG ANH',
    slug: 'thiet-ke-nha-pho-4-tang-1-tum-dong-anh-chi-thu',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Giải quyết bài toán mặt tiền hẹp ở khu đô thị đông đúc, Kita Home mang đến mẫu thiết kế 4 tầng 1 tum hiện đại kết hợp giếng trời đón gió tự nhiên.',
    details: {
      client: 'Chị Thu',
      location: 'Đông Anh, Hà Nội',
      scale: '4 Tầng, 1 Tum',
      area: '85 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '3',
    title: 'MẪU THIẾT KẾ NGOẠI THẤT NHÀ PHỐ 3 TẦNG HIỆN ĐẠI | CHỊ CHI – NINH BÌNH',
    slug: 'mau-nha-pho-3-tang-hien-dai-chi-chi-ninh-binh',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Thiết kế mặt tiền độc đáo với hệ lam gỗ chống nắng hiệu quả, kiến tạo vẻ đẹp thời thượng bền bỉ theo thời gian tại TP. Ninh Bình.',
    details: {
      client: 'Chị Chi',
      location: 'Ninh Bình',
      scale: '3 Tầng',
      area: '90 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '4',
    title: 'MẪU NHÀ PHỐ 2 TẦNG 1 TUM KIẾN TRÚC ĐỘC BẢN | CHỊ NGA – ĐẮK LẮK',
    slug: 'mau-nha-pho-2-tang-1-tum-chi-nga-dak-lak',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Giữa nắng gió Tây Nguyên, ngôi nhà phố 2 tầng hiện lên ấn tượng với những đường nét bo tròn mềm mại và ban công ngập tràn hoa lá.',
    details: {
      client: 'Chị Nga',
      location: 'Đắk Lắk',
      scale: '2 Tầng, 1 Tum',
      area: '110 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '5',
    title: 'MẪU THIẾT KẾ NHÀ PHỐ 2 TẦNG HIỆN ĐẠI | ANH DŨNG – QUẢNG NINH',
    slug: 'mau-nha-pho-2-tang-hien-dai-anh-dung-quang-ninh',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Thiết kế nhà phố 2 tầng hiện đại, đường nét vuông vức, khỏe khoắn kết hợp hệ thống cây cảnh xanh mát tại Quảng Ninh.',
    details: {
      client: 'Anh Dũng',
      location: 'Quảng Ninh',
      scale: '2 Tầng',
      area: '120 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '6',
    title: 'MẪU THIẾT KẾ NHÀ PHỐ 2 TẦNG HIỆN ĐẠI | ANH TRÍ – QUẢNG TRỊ',
    slug: 'mau-nha-pho-2-tang-hien-dai-anh-tri-quang-tri',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Ngôi nhà mang thiết kế trẻ trung, phóng khoáng, đón trọn ánh sáng tự nhiên cho toàn bộ các phòng chức năng.',
    details: {
      client: 'Anh Trí',
      location: 'Quảng Trị',
      scale: '2 Tầng',
      area: '100 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '7',
    title: 'TUYỆT PHẨM NHÀ MÁI NHẬT 2 TẦNG HIỆN ĐẠI TẠI THẠCH THẤT – CHỦ ĐẦU TƯ ANH ĐỨC',
    slug: 'mau-nha-mai-nhat-2-tang-anh-duc-thach-that',
    category: 'mai-nhat',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Sự kết hợp hoàn hảo giữa nét trẻ trung của phong cách hiện đại và sự vững chãi của hệ mái Nhật thanh lịch tại vùng đất Thạch Thất.',
    details: {
      client: 'Anh Đức',
      location: 'Thạch Thất, Hà Nội',
      scale: '2 Tầng',
      area: '135 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '8',
    title: 'NGOẠI THẤT ĐẲNG CẤP TẠI MẪU NHÀ MÁI NHẬT 2 TẦNG | ANH KIÊN – PHÚ THỌ',
    slug: 'mau-nha-mai-nhat-2-tang-anh-kien-phu-tho',
    category: 'mai-nhat',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Công trình thu hút mọi ánh nhìn với sự kết hợp hài hòa giữa màu sơn trắng tuyết và mái ngói xanh than thanh nhã.',
    details: {
      client: 'Anh Kiên',
      location: 'Phú Thọ',
      scale: '2 Tầng',
      area: '140 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '9',
    title: 'NHÀ PHỐ 2 TẦNG 1 TUM HIỆN ĐẠI, KHÔNG GIAN XANH LÝ TƯỞNG | ANH TUÂN – BẮC GIANG',
    slug: 'thiet-ke-nha-pho-2-tang-1-tum-anh-tuan-bac-giang',
    category: 'nha-pho',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Ngôi nhà phố hiện đại ngập tràn ánh sáng nhờ hệ cửa kính tấm lớn đón trọn nguồn sinh khí, tạo cảm giác thư giãn tuyệt đối cho gia chủ.',
    details: {
      client: 'Anh Tuân',
      location: 'Bắc Giang',
      scale: '2 Tầng, 1 Tum',
      area: '100 m2 / sàn',
      year: '2025'
    }
  },
  {
    id: '10',
    title: 'NỘI THẤT BIỆT THỰ MANHATTAN VINHOMES GRAND PARK | KITA HOME',
    slug: 'noi-that-biet-thu-manhattan-vinhomes-grand-park',
    category: 'noi-that',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Thiết kế nội thất phong cách Tân cổ điển Luxury siêu sang tại phân khu Manhattan, khẳng định vị thế đỉnh cao của gia chủ.',
    details: {
      client: 'Anh Minh',
      location: 'Quận 9, TP. HCM',
      scale: 'Biệt thự đơn lập',
      area: '350 m2',
      year: '2025'
    }
  },
  {
    id: '11',
    title: 'THIẾT KẾ NỘI THẤT NHÀ PHỐ HIỆN ĐẠI | CHỊ VY – QUẬN 7',
    slug: 'thiet-ke-noi-that-nha-pho-hien-dai-chi-vy-quan-7',
    category: 'noi-that',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Tối ưu hóa công năng và mang lại cảm giác ấm cúng, sang trọng với chất liệu gỗ công nghiệp cao cấp An Cường và đá vân mây.',
    details: {
      client: 'Chị Vy',
      location: 'Quận 7, TP. HCM',
      scale: 'Nội thất trọn gói nhà phố',
      area: '180 m2',
      year: '2025'
    }
  },
  {
    id: '12',
    title: 'THIẾT KẾ NỘI THẤT PHÒNG KHÁCH BẾP LUXURY CỰC ĐẲNG CẤP | ANH HOÀNG – CIPUTRA',
    slug: 'thiet-ke-noi-thiet-luxury-anh-hoang-ciputra',
    category: 'noi-that',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Giải pháp thiết kế không gian sinh hoạt chung rộng rãi, siêu sang trọng sử dụng đá tự nhiên và nội thất dát vàng.',
    details: {
      client: 'Anh Hoàng',
      location: 'Ciputra, Hà Nội',
      scale: 'Nội thất Penthouse',
      area: '250 m2',
      year: '2025'
    }
  }
];


// 2. MOCK DATA DỊCH VỤ (SERVICES)
export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Xây Nhà Trọn Gói',
    slug: 'xay-nha-tron-goi',
    description: 'Chìa khóa trao tay - Giải pháp xây dựng toàn diện từ khâu pháp lý, thiết kế đến thi công hoàn thiện hoàn hảo nhất.',
    icon: 'Home',
    highlight: 'Miễn phí 100% chi phí thiết kế',
    features: [
      'Miễn phí 100% phí thiết kế kiến trúc và nội thất.',
      'Bao trọn gói thủ tục xin cấp phép xây dựng.',
      'Cam kết không phát sinh chi phí ngoài hợp đồng.',
      'Bảo hành kết cấu công trình lên đến 5 năm.'
    ]
  },
  {
    id: 's2',
    title: 'Thiết Kế Kiến Trúc',
    slug: 'thiet-ke-kien-truc',
    description: 'Sáng tạo những không gian sống độc bản, tinh tế, tối ưu hóa công năng và chuẩn phong thủy cho gia đình bạn.',
    icon: 'Compass',
    features: [
      'Bản vẽ 3D ngoại thất chân thực, sắc nét.',
      'Hồ sơ bản vẽ kỹ thuật thi công chi tiết đầy đủ.',
      'Thiết kế mặt bằng công năng tối ưu khí động học.',
      'Tư vấn phong thủy chuyên sâu bởi chuyên gia.'
    ]
  },
  {
    id: 's3',
    title: 'Thiết Kế Nội Thất',
    slug: 'thiet-ke-noi-that',
    description: 'Biến ngôi nhà thành tổ ấm đích thực với không gian nội thất sang trọng, tiện nghi mang dấu ấn cá nhân đậm nét.',
    icon: 'Palette',
    features: [
      'Phối cảnh 3D các phòng khách, bếp, ngủ tinh tế.',
      'Bản vẽ kỹ thuật chi tiết kích thước đồ gỗ sản xuất.',
      'Tư vấn lựa chọn vật liệu tối ưu chi phí & thẩm mỹ.',
      'Giám sát tác giả đảm bảo thi công đúng bản vẽ.'
    ]
  },
  {
    id: 's4',
    title: 'Thi Công Phần Thô',
    slug: 'thi-cong-phan-tho',
    description: 'Nền móng vững chãi cho tương lai bền vững. Thi công kết cấu chuẩn kỹ thuật xây dựng với độ chính xác tuyệt đối.',
    icon: 'Layers',
    features: [
      'Đội ngũ kỹ sư kết cấu nhiều năm kinh nghiệm giám sát.',
      'Vật tư xây dựng phần thô chính hãng chất lượng cao.',
      'Quy trình thi công ép cọc, đổ bê tông chuẩn mực.',
      'Đảm bảo an toàn lao động và tiến độ cam kết.'
    ]
  }
];

// 3. MOCK DATA TIN TỨC (NEWS)
export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Kinh nghiệm xây nhà phố trọn gói tiết kiệm chi phí năm 2026',
    slug: 'kinh-nghiem-xay-nha-pho-tron-goi-tiet-kiem-chi-phi-2026',
    category: 'cam-nang',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    date: '15/05/2026',
    excerpt: 'Tổng hợp cẩm nang và bí quyết lập dự toán, quản lý vật liệu khi xây nhà phố giúp gia chủ tránh các phát sinh không đáng có.'
  },
  {
    id: 'n2',
    title: 'Những lưu ý phong thủy quan trọng khi thiết kế phòng khách biệt thự',
    slug: 'nhung-luu-y-phong-thuy-quan-trong-khi-thiet-ke-phong-khach',
    category: 'phong-thuy',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    date: '12/05/2026',
    excerpt: 'Phong thủy phòng khách là yếu tố quyết định tài lộc, sức khỏe của cả gia đình. Khám phá ngay cách bố trí hướng sofa, màu sơn chuẩn phong thủy.'
  },
  {
    id: 'n3',
    title: 'Kita Home hoàn thiện bàn giao biệt thự mái Nhật tại Thạch Thất',
    slug: 'kita-home-ban-giao-biet-thu-mai-nhat-thach-that',
    category: 'tin-du-an',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    date: '08/05/2026',
    excerpt: 'Lễ bàn giao chìa khóa trao tay công trình biệt thự mái Nhật sang trọng của gia đình anh Đức, ghi nhận sự hài lòng tuyệt đối từ phía chủ đầu tư.'
  }
];
