import { getSystemSetting } from '@/utils/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/home/ContactForm';

export const revalidate = 0; // Luôn lấy dữ liệu mới nhất từ Strapi

export default async function ContactPage() {
  const setting = await getSystemSetting();

  const companyName = setting.companyName || 'CÔNG TY CỔ PHẦN KIẾN TRÚC & XÂY DỰNG GAMMA HOME';
  const addressNorth = setting.addressNorth || 'G29-30 - Khu đấu giá Ngô Thì Nhậm - Hà Cầu - Hà Đông - TP Hà Nội';
  const addressSouth = setting.addressSouth || 'Đường T2-41 Khu Biệt Thự Manhattan - Vinhomes Grand Park - P.Long Bình - TP.Thủ Đức - Hồ Chí Minh';
  const hotline = setting.hotline || '0827.972.555';
  const email = setting.email || 'Nhadepgamma@gmail.com';

  return (
    <main className="min-h-screen bg-zinc-50 pt-24 md:pt-28 pb-12">
      {/* Banner đầu trang */}
      <section className="relative py-16 md:py-24 bg-zinc-900 overflow-hidden text-center">
        {/* Lớp phủ sang trọng */}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 -z-10" 
          style={{ backgroundImage: "url('/kita/FT.webp')" }}
        />
        
        <div className="container-kita relative z-20 flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-5xl font-bold font-serif tracking-widest text-[#bd8b1b] uppercase">
            LIÊN HỆ
          </h1>
          <img src="/kita/Title.png" alt="Divider" className="h-3 w-auto object-contain brightness-110" />
          <p className="text-zinc-300 text-xs md:text-sm max-w-lg font-light tracking-wide leading-relaxed mt-2 uppercase">
            Kiến tạo tổ ấm sang trọng và trọn vẹn niềm tin cùng Gamma Home
          </p>
        </div>
      </section>

      {/* Thông tin liên hệ chi tiết */}
      <section className="py-16">
        <div className="container-kita max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Box 1: Trụ sở Miền Bắc */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-zinc-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bd8b1b]/10 flex items-center justify-center text-[#bd8b1b] mb-2">
                <MapPin size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 uppercase tracking-wide">
                Trụ Sở Miền Bắc
              </h3>
              <p className="text-zinc-650 text-sm font-light leading-relaxed text-justify">
                {addressNorth}
              </p>
            </div>

            {/* Box 2: Trụ sở Miền Nam */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-zinc-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bd8b1b]/10 flex items-center justify-center text-[#bd8b1b] mb-2">
                <MapPin size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 uppercase tracking-wide">
                Trụ Sở Miền Nam
              </h3>
              <p className="text-zinc-650 text-sm font-light leading-relaxed text-justify">
                {addressSouth}
              </p>
            </div>

            {/* Box 3: Thông tin liên lạc */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-zinc-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-[#bd8b1b]/10 flex items-center justify-center text-[#bd8b1b] mb-2">
                <Phone size={24} />
              </div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 uppercase tracking-wide">
                Kết Nối Nhanh
              </h3>
              
              <div className="flex flex-col gap-3 text-sm text-zinc-650 font-light">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-[#bd8b1b]" />
                  <span><strong>Hotline:</strong> {hotline}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#bd8b1b]" />
                  <span><strong>Email:</strong> {email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-[#bd8b1b]" />
                  <span><strong>Làm việc:</strong> 8:00 - 18:00 (T2 - CN)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Form đăng ký dự toán tích hợp */}
      <section className="bg-white py-6 rounded-lg max-w-6xl mx-auto shadow-sm border border-zinc-100 overflow-hidden">
        <ContactForm />
      </section>

      {/* Google Map bản đồ nhúng sang trọng */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-white p-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2678685160867!2d105.7766946!3d20.9818859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acce6533dfb1%3A0xe53fa28ad4d17ec6!2zTmdwIFRo4buLIE5o4bqtbSwgSMOgIMSQw7RuZywgSMOgIE7hu5lp!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gamma Home Map Location"
          />
        </div>
      </section>
    </main>
  );
}
