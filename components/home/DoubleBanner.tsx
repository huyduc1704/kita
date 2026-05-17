export default function DoubleBanner() {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">
      {/* Banner 1: Ý tưởng tổ ấm */}
      <div className="relative h-[280px] md:h-[350px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/kita/Kita-Home-22.jpg')" }} 
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 md:p-12 text-white">
          <p className="text-zinc-300 text-xs md:text-sm font-semibold uppercase tracking-widest mb-3 leading-relaxed">
            BẠN ĐANG ẤP Ủ Ý TƯỞNG VỀ NGÔI NHÀ CỦA MÌNH?
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-wider font-serif mb-3 text-primary-light uppercase drop-shadow">
            HÃY LIÊN LẠC NGAY
          </h2>
          <p className="text-zinc-200 text-xs md:text-sm font-light tracking-wide max-w-md leading-relaxed uppercase">
            CHÚNG TÔI SẼ GIÚP THỰC HIỆN HOÁ ƯỚC MƠ VỀ TỔ ÁM CỦA BẠN
          </p>
        </div>
      </div>

      {/* Banner 2: Miễn phí thiết kế */}
      <div className="relative h-[280px] md:h-[350px] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/kita/Kita-Home-24.jpg')" }} 
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 md:p-12 text-white">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide font-serif leading-snug uppercase max-w-lg">
            MIỄN PHÍ{' '}
            <span className="text-3xl md:text-5xl font-black mx-1 inline-block drop-shadow-[0_2px_10px_rgba(239,68,68,0.5)] animate-gold-red-blink">
              100%
            </span>{' '}
            CHI PHÍ THIẾT KẾ
          </h2>
          <p className="text-primary-light text-xs md:text-sm font-medium tracking-widest mt-4 uppercase">
            Khi Xây Nhà Trọn Gói
          </p>
        </div>
      </div>
    </section>
  );
}
