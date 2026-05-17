'use client';

import { useState } from 'react';
import { Home, User, Phone, Layers, MapPin, Mail, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('Xây nhà trọn gói');
  const [areaAndFloors, setAreaAndFloors] = useState('');
  const [province, setProvince] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsLoading(true);
    // Giả lập gửi dữ liệu dự toán
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setName('');
      setPhone('');
      setAreaAndFloors('');
      setProvince('');
      setMessage('');

      // Tự động tắt thông báo thành công sau 5 giây
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-white" id="contact-form">
      <div className="container-kita">

        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider font-serif text-zinc-900 uppercase text-center leading-tight">
            DỰ TOÁN CHI PHÍ
          </h2>
          <img src="/kita/Title.png" alt="Divider" className="h-3 w-auto object-contain" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 w-full items-stretch max-w-[1170px] mx-auto">

          {/* Cột Trái: Form nhập liệu dự toán (50%) */}
          <div className="px-[15px] bg-white w-full flex flex-col justify-center">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-zinc-50 border border-zinc-100 rounded gap-4 h-full">
                <div className="p-4 bg-emerald-50 text-emerald-500 rounded-full shadow-inner">
                  <CheckCircle size={48} className="animate-pulse" />
                </div>
                <h4 className="font-serif font-bold text-xl text-zinc-900">
                  Gửi Thông Tin Thành Công!
                </h4>
                <p className="text-zinc-550 text-sm font-light leading-relaxed max-w-sm">
                  Cảm ơn bạn đã tin tưởng Kita Home. Kiến trúc sư của chúng tôi sẽ liên hệ lại với bạn qua số điện thoại sớm nhất có thể để tư vấn dự toán chi phí chi tiết!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[10px] text-sm"
              >
                {/* Nhu cầu select */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-5">
                    <Home size={18} />
                  </div>
                  <select
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm appearance-none cursor-pointer"
                  >
                    <option value="Xây nhà trọn gói">Xây nhà trọn gói</option>
                    <option value="Thiết kế kiến trúc">Thiết kế kiến trúc</option>
                    <option value="Thiết kế nội thất">Thiết kế nội thất</option>
                    <option value="Thi công phần thô">Thi công phần thô</option>
                    <option value="Khác">Nhu cầu khác</option>
                  </select>
                  <div className="absolute right-0 flex items-center pr-4 pointer-events-none text-zinc-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Họ và tên */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-5">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Họ và Tên"
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-zinc-400"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-5">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Số điện thoại (*)"
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-zinc-400"
                  />
                </div>

                {/* Diện tích đất */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-5">
                    <Layers size={18} />
                  </div>
                  <input
                    type="text"
                    value={areaAndFloors}
                    onChange={(e) => setAreaAndFloors(e.target.value)}
                    placeholder="Diện tích đất và Số tầng muốn xây"
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-zinc-400"
                  />
                </div>

                {/* Tỉnh thành */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 pl-4 flex items-center pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-5">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    placeholder="Tỉnh thành"
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-zinc-400"
                  />
                </div>

                {/* Yêu cầu chi tiết */}
                <div className="relative flex items-start">
                  <div className="absolute left-0 pl-4 flex items-start pointer-events-none text-zinc-400 border-r border-zinc-200 pr-3 h-[calc(100%-16px)] mt-2">
                    <Mail size={18} />
                  </div>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Yêu cầu chi tiết (Nếu có)"
                    className="pl-14 w-full bg-white border border-zinc-250 rounded px-4 py-[10px] text-zinc-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm placeholder:text-zinc-400 resize-none"
                  />
                </div>

                {/* Nút Nhận tư vấn */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-[10px] rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-zinc-400 disabled:to-zinc-500 text-white font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ĐANG XỬ LÝ...
                    </span>
                  ) : (
                    'NHẬN TƯ VẤN'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Cột Phải: Ảnh Feedback khách hàng (50%) */}
          <div className="px-[15px] w-full flex flex-col items-stretch">
            <div className="w-full h-full relative overflow-hidden rounded shadow-lg border border-zinc-200/50 p-1 bg-white hover:shadow-xl transition-shadow duration-300 min-h-[350px] lg:min-h-full flex">
              <img
                src="/kita/FB-600x400.jpg"
                alt="Khách hàng bàn giao chìa khóa trao tay Kita Home"
                className="w-full h-full object-cover lg:absolute lg:inset-0 rounded"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
