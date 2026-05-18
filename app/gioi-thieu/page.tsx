'use client';

import { MapPin, Target, Shield, Building, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSystemSetting, SystemSetting } from '@/utils/api';

export default function AboutPage() {
  const [setting, setSetting] = useState<SystemSetting | null>(null);

  useEffect(() => {
    getSystemSetting().then(setSetting);
  }, []);

  const offices = [
    {
      name: 'CN HÀ NỘI',
      address: setting?.addressNorth || 'G29-30, Khu đấu giá Ngô Thì Nhậm, Hà Cầu, Hà Đông, Hà Nội',
    },
    {
      name: 'CN TP. HCM',
      address: setting?.addressSouth || 'Đường T2-41, Khu Biệt Thự Manhattan, Vinhomes Grand Park, P. Long Bình, TP. Thủ Đức, Hồ Chí Minh',
    },
    {
      name: 'CN PHÚ THỌ',
      address: 'Xã Hiền Quan, Tam Nông, Phú Thọ',
    },
    {
      name: 'CN HẢI PHÒNG',
      address: 'Hà Nhuận 4, An Hòa, An Dương, Hải Phòng',
    },
  ];

  return (
    <section className="bg-white min-h-screen font-sans">

      {/* 1. Header Banner */}
      <div className="relative bg-zinc-900 py-16 md:py-24 text-center overflow-hidden">
        {/* Decorative background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative container-kita max-w-4xl mx-auto px-4 z-10">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-white tracking-widest uppercase mb-4">
            GIỚI THIỆU VỀ GAMMA HOME
          </h1>
          <div className="w-16 h-1 bg-[#f39221] mx-auto mb-4" />
          <p className="text-zinc-300 text-xs md:text-sm font-light uppercase tracking-wider italic">
            “{setting?.slogan || 'Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà'}”
          </p>
        </div>
      </div>

      {/* 2. General Introduction Section */}
      <div className="py-16 container-kita max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Intro Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Award className="text-[#f39221]" size={24} />
              <span className="text-[#f39221] font-bold text-xs uppercase tracking-wider">
                Về Chúng Tôi
              </span>
            </div>

            <h2 className="text-2xl font-bold font-serif text-zinc-900 leading-tight uppercase">
              KIẾN TẠO KHÔNG GIAN SỐNG HOÀN MỸ
            </h2>

            <div className="flex flex-col gap-4 text-zinc-650 text-xs md:text-sm font-light leading-relaxed text-justify">
              <p>
                <strong>Công ty Cổ phần Kiến trúc & Xây dựng GAMMA HOME</strong> là đơn vị thiết kế và thi công trọn gói các công trình nhà ở hàng đầu Việt Nam. Tính đến thời điểm hiện tại GAMMA HOME đã triển khai hàng trăm dự án từ Bắc đến Nam, mang lại những không gian sống hiện đại, bền vững, đáp ứng đồng thời yếu tố thẩm mỹ và công năng cho gia chủ.
              </p>
              <p>
                Đến với GAMMA HOME, quý khách hàng sẽ được làm việc trực tiếp với đội ngũ kiến trúc sư giàu kinh nghiệm, am hiểu xu hướng kiến trúc toàn cầu, cùng quy trình làm việc chuyên nghiệp, minh bạch, tối ưu chi phí và đúng tiến độ. Bên cạnh đó, sau khi hoàn thiện và bàn giao nhà quý khách hàng còn được hưởng chính sách bảo hành của công ty.
              </p>
              <p className="border-l-4 border-[#f39221] pl-4 italic text-zinc-700 bg-zinc-50 py-3 rounded-r">
                Với phương châm <strong>“Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà”</strong> đó là cách chúng tôi vận hành, phát triển và lớn mạnh từng ngày.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Image */}
          <div className="lg:col-span-5 relative group">
            {/* Soft decorative shadow frame */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-[#007ba1] rounded-lg blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-white rounded-lg overflow-hidden shadow-xl border border-zinc-200">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Gamma Home Office Interior Design"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Vision & Mission Section */}
      <div className="py-16 bg-zinc-50 border-y border-zinc-150">
        <div className="container-kita max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Vision Card */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-zinc-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-[#f39221] shrink-0">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-serif tracking-wider uppercase border-b border-zinc-100 pb-2">
                TẦM NHÌN
              </h3>
              <p className="text-zinc-650 text-xs md:text-sm font-light leading-relaxed text-justify">
                GAMMA HOME hướng tới trở thành doanh nghiệp hàng đầu Việt Nam trong lĩnh vực thiết kế và thi công nhà ở, đồng thời từng bước mở rộng hoạt động ra thị trường quốc tế. Chúng tôi định hướng phát triển hệ thống chi nhánh phủ khắp các tỉnh thành, đảm bảo phục vụ khách hàng một cách nhanh chóng, chuyên nghiệp nhất. Và đặc biệt bước tiến chiến lược tiếp theo của chúng tôi đó là hình thành nhà máy sản xuất vật tư xây dựng, chủ động nguồn cung, kiểm soát chất lượng, tối ưu chi phí cho khách hàng.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-zinc-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-[#007ba1] shrink-0">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-zinc-950 font-serif tracking-wider uppercase border-b border-zinc-100 pb-2">
                SỨ MỆNH
              </h3>
              <p className="text-zinc-650 text-xs md:text-sm font-light leading-relaxed text-justify">
                Mang trong mình sứ mệnh nâng tầm chất lượng sống của cộng đồng thông qua những giải pháp xây dựng toàn diện, hiện đại và bền vững. Chúng tôi không chỉ làm nên những ngôi nhà mà còn xây dựng tổ ấm hạnh phúc, nơi khởi nguồn của yêu thương, gắn kết và thịnh vượng. Bằng tâm huyết, trí tuệ và trách nhiệm xã hội, GAMMA HOME mong muốn được phục vụ hàng triệu người dân Việt Nam, góp phần kiến thiết diện mạo kiến trúc bản địa và đóng góp vào sự phát triển hưng thịnh của đất nước.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Branches / Offices Section */}
      <div className="py-16 container-kita max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
            <Building className="text-[#007ba1]" size={20} />
            <span className="text-[#007ba1] font-bold text-xs uppercase tracking-wider">
              Hệ Thống Chi Nhánh
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif text-zinc-900 tracking-wider uppercase">
            ĐỊA CHỈ VĂN PHÒNG
          </h2>
          <div className="w-12 h-1 bg-[#007ba1] mx-auto" />
        </div>

        {/* 4-column offices grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md border-t-4 border-[#007ba1] hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-[#007ba1] group-hover:bg-[#007ba1] group-hover:text-white transition-all duration-300">
                <MapPin size={20} />
              </div>
              <h4 className="font-bold text-zinc-900 text-sm tracking-wider uppercase">
                {office.name}
              </h4>
              <p className="text-zinc-600 text-xs md:text-sm font-light leading-relaxed">
                {office.address}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
