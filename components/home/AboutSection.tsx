export default function AboutSection() {
  return (
    <section className="relative pt-24 pb-36 overflow-hidden" id="about">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/kita/Kita-Home-9.webp')" }}
      />
      <div className="absolute inset-0 bg-black/85 z-0" />

      <div className="container-kita relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 flex flex-col items-center gap-2">
          <h2 className="text-3xl md:text-4.5xl font-bold font-serif text-white uppercase tracking-wider">
            VỀ CHÚNG TÔI
          </h2>

          <img
            src="/kita/Title.png"
            alt="divider"
            className="h-4 w-auto object-contain my-1"
          />

          <h3 className="text-primary-light font-bold text-sm md:text-base uppercase tracking-widest mt-1">
            CÔNG TY CỔ PHẦN KIẾN TRÚC & XÂY DỰNG KITA HOME
          </h3>
        </div>

        {/* Section Body Copy */}
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-4 text-zinc-300 text-sm md:text-base font-light leading-relaxed mb-16 px-4">
          <p>
            “Tận tâm trong từng viên gạch – Vững trọn niềm tin trong từng mái nhà” là cách chúng tôi sống, làm việc và trưởng thành từng ngày.
          </p>
          <p>
            KITA HOME không đơn thuần là một công ty xây dựng – chúng tôi là những người kiến tạo tổ ấm bằng tất cả trái tim và trách nhiệm nghề nghiệp.
          </p>
        </div>

        {/* 3 White Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 items-start">

          {/* Card 1: Tầm Nhìn */}
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between min-h-[380px] hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 md:mt-12">
            <div className="p-8 flex-grow flex flex-col items-center justify-center">
              <img
                src="/kita/icon-1.png"
                alt="Tầm Nhìn"
                className="h-16 w-16 object-contain mb-6"
              />
              <div className="text-center text-zinc-650 text-xs md:text-sm leading-relaxed font-light">
                <strong className="text-zinc-950 font-bold">Kita Home</strong> định hướng trở thành đơn vị thiết kế và thi công nhà trọn gói uy tín hàng đầu tại Việt Nam – mang đến những ngôi nhà chất lượng, tinh tế, cùng dịch vụ tận tâm và chu đáo, để mỗi gia đình Việt được sống trọn vẹn trong không gian mơ ước của riêng mình.
              </div>
            </div>
            <div className="w-full bg-[#f39221] py-3 text-center text-white font-bold text-sm tracking-wider uppercase">
              TẦM NHÌN
            </div>
          </div>

          {/* Card 2: Sứ Mệnh */}
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between min-h-[380px] hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 md:mt-0">
            <div className="p-8 flex-grow flex flex-col items-center justify-center">
              <img
                src="/kita/icon-2.png"
                alt="Sứ Mệnh"
                className="h-16 w-16 object-contain mb-6"
              />
              <div className="text-center text-zinc-650 text-xs md:text-sm leading-relaxed font-light flex flex-col gap-3">
                <p>
                  Đơn giản hóa công việc xây dựng nhà. Mang tới những ngôi nhà hạnh phúc, công trình xây dựng chất lượng.
                </p>
                <p>
                  Phục vụ cho người dân Việt Nam, phụng sự phát triển đất nước.
                </p>
              </div>
            </div>
            <div className="w-full bg-[#f39221] py-3 text-center text-white font-bold text-sm tracking-wider uppercase">
              SỬ MỆNH
            </div>
          </div>

          {/* Card 3: Giá Trị Cốt Lõi */}
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between min-h-[380px] hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 md:mt-12">
            <div className="p-8 flex-grow flex flex-col items-center justify-center">
              <img
                src="/kita/icon-3.png"
                alt="Giá Trị Cốt Lõi"
                className="h-16 w-16 object-contain mb-6"
              />
              <div className="text-center text-xs md:text-sm text-zinc-650 leading-relaxed font-light flex flex-col gap-1.5">
                <p className="font-bold text-zinc-950 uppercase mb-1">
                  GIÁ TRỊ CỐT LÕI CỦA KITA HOME : TÂM – TÍN – TUỆ – TỐC
                </p>
                <p><strong className="text-zinc-950 font-semibold">TÂM</strong> – Làm nghề bằng cái tâm, sự tử tế</p>
                <p><strong className="text-zinc-950 font-semibold">TÍN</strong> – Lấy uy tín làm nền tảng</p>
                <p><strong className="text-zinc-950 font-semibold">TUỆ</strong> – Làm việc bằng trí tuệ</p>
                <p><strong className="text-zinc-950 font-semibold">TỐC</strong> – Hành động nhanh, hiệu quả cao</p>
              </div>
            </div>
            <div className="w-full bg-[#f39221] py-3 text-center text-white font-bold text-sm tracking-wider uppercase">
              GIÁ TRỊ CỐT LÕI
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
