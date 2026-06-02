'use client';

import { useState, useEffect } from 'react';
import { X, Home, User, Phone, Layers, MapPin, Mail, CheckCircle } from 'lucide-react';
import { submitConsultationLead } from '@/utils/api';

export default function ConsultationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [nhuCau, setNhuCau] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [dienTich, setDienTich] = useState('');
  const [tinhThanh, setTinhThanh] = useState('');
  const [yeuCau, setYeuCau] = useState('');

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
    };

    window.addEventListener('open-consultation-modal', handleOpen);
    return () => window.removeEventListener('open-consultation-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Reset Form
    setNhuCau('');
    setHoTen('');
    setSoDienThoai('');
    setDienTich('');
    setTinhThanh('');
    setYeuCau('');
  };

  const [submitting, setSubmitting] = useState(false);

  const REQUIREMENT_MAP: Record<string, 'build' | 'design' | 'interior' | 'consult'> = {
    'Xây nhà trọn gói': 'build',
    'Thiết kế kiến trúc': 'design',
    'Thiết kế & thi công nội thất': 'interior',
    'Thi công phần thô': 'consult',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!soDienThoai || !nhuCau) {
      alert('Vui lòng điền các thông tin bắt buộc (*)');
      return;
    }
    setSubmitting(true);
    try {
      await submitConsultationLead({
        name: hoTen || 'Khách hàng',
        phone: soDienThoai,
        requirement: REQUIREMENT_MAP[nhuCau],
        area: dienTich || undefined,
        province: tinhThanh || undefined,
        detailNote: yeuCau || undefined,
      });
      setIsSubmitted(true);
      setTimeout(() => handleClose(), 2500);
    } catch {
      alert('Có lỗi xảy ra, vui lòng thử lại hoặc gọi hotline trực tiếp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      
      {/* Modal Wrapper */}
      <div className="relative w-full max-w-[420px] bg-[#007ba1] rounded-2xl overflow-hidden shadow-2xl p-6 border-2 border-white/20 transition-all transform scale-100 duration-300">
        
        {/* Close Button (Circle with X) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <div className="w-7 h-7 rounded-full border border-white/40 flex items-center justify-center bg-black/20">
            <X size={16} />
          </div>
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-sm">
            
            {/* Header Content */}
            <div className="text-center mb-2 flex flex-col gap-1">
              <h3 className="text-[#fbbf24] text-lg md:text-xl font-bold tracking-wider leading-snug">
                MIỄN PHÍ 100% <br /> PHÍ THIẾT KẾ
              </h3>
              <p className="text-white text-xs md:text-sm font-semibold tracking-wide uppercase">
                KHI THI CÔNG TRỌN GÓI
              </p>
            </div>

            {/* Input 1: Nhu Cầu Select */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <Home size={18} />
              </div>
              <select
                value={nhuCau}
                onChange={(e) => setNhuCau(e.target.value)}
                required
                className="w-full px-3 text-zinc-700 bg-white focus:outline-none cursor-pointer text-xs md:text-sm h-full"
              >
                <option value="" disabled hidden>Nhu cầu: (*)</option>
                <option value="Xây nhà trọn gói">Xây nhà trọn gói</option>
                <option value="Thiết kế kiến trúc">Thiết kế kiến trúc</option>
                <option value="Thiết kế & thi công nội thất">Thiết kế & thi công nội thất</option>
                <option value="Thi công phần thô">Thi công phần thô</option>
              </select>
            </div>

            {/* Input 2: Họ và Tên */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Họ và Tên"
                value={hoTen}
                onChange={(e) => setHoTen(e.target.value)}
                className="w-full px-3 text-zinc-700 focus:outline-none text-xs md:text-sm h-full"
              />
            </div>

            {/* Input 3: Số Điện Thoại */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                placeholder="Số điện thoại (*)"
                value={soDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
                required
                className="w-full px-3 text-zinc-700 focus:outline-none text-xs md:text-sm h-full"
              />
            </div>

            {/* Input 4: Diện tích & Số Tầng */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <Layers size={18} />
              </div>
              <input
                type="text"
                placeholder="Diện tích đất và Số tầng muốn xây"
                value={dienTich}
                onChange={(e) => setDienTich(e.target.value)}
                className="w-full px-3 text-zinc-700 focus:outline-none text-xs md:text-sm h-full"
              />
            </div>

            {/* Input 5: Tỉnh Thành */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="Tỉnh thành"
                value={tinhThanh}
                onChange={(e) => setTinhThanh(e.target.value)}
                className="w-full px-3 text-zinc-700 focus:outline-none text-xs md:text-sm h-full"
              />
            </div>

            {/* Input 6: Yêu cầu chi tiết */}
            <div className="flex bg-white rounded-lg overflow-hidden border-0 shadow-sm items-center h-11">
              <div className="w-12 flex items-center justify-center border-r border-zinc-200 text-zinc-650 shrink-0">
                <Mail size={18} />
              </div>
              <input
                type="text"
                placeholder="Yêu cầu chi tiết (Nếu có)"
                value={yeuCau}
                onChange={(e) => setYeuCau(e.target.value)}
                className="w-full px-3 text-zinc-700 focus:outline-none text-xs md:text-sm h-full"
              />
            </div>

            {/* Gold Gradient Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 text-white font-bold tracking-wider uppercase text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center border border-amber-300/35 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? 'ĐANG GỬI...' : 'NHẬN TƯ VẤN'}
            </button>

          </form>
        ) : (
          /* Success Message Content */
          <div className="flex flex-col items-center justify-center text-center py-8 gap-4 font-sans">
            <CheckCircle size={56} className="text-[#fbbf24] animate-bounce" />
            <div className="flex flex-col gap-1">
              <h4 className="text-white text-lg font-bold">GỬI THÔNG TIN THÀNH CÔNG!</h4>
              <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed">
                Gamma Home đã nhận được yêu cầu tư vấn của bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất!
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
