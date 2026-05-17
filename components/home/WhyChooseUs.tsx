interface Strength {
  title: string;
  description: string;
  icon: string;
}

const STRENGTHS: Strength[] = [
  {
    title: 'ĐỘI NGŨ KỸ SƯ, KIẾN TRÚC SƯ KINH NGHỆM',
    description: 'Đội ngũ kỹ sư, kiến trúc sư có kinh nghiệm lâu năm với tư duy sáng tạo',
    icon: '/kita/why1.png',
  },
  {
    title: 'ĐỘI NGŨ GIÁM SÁT NĂNG LỰC CAO',
    description: 'Đội ngũ tư vấn giám sát năng lực cao và tinh thần làm việc nhiệt huyết!',
    icon: '/kita/why2.png',
  },
  {
    title: 'ĐỘI NGŨ CÔNG NHÂN LÀNH NGHỀ',
    description: 'Đội ngũ công nhân đều có tay nghề cao, đã tham gia nhiều dự án.',
    icon: '/kita/why3.png',
  },
  {
    title: 'SẢN PHẨM ĐẠT CHẤT LƯỢNG CAO',
    description: 'Đồng bộ tư thiết kế tới thi công, mang lại sản phẩm đảm bảo chất lượng và thẩm mỹ',
    icon: '/kita/why4.png',
  },
  {
    title: 'ĐƠN GIÁ HỢP LÝ VÀ CẠNH TRANH',
    description: 'Bảng giá của các sản phẩm và dịch vụ cung cấp cạnh tranh.',
    icon: '/kita/why5.png',
  },
  {
    title: 'DỊCH VỤ SAU BÁN HÀNG HOÀN HẢO',
    description: 'Chính sách bảo hành, bảo trì tốt giúp khách hàng yên tâm.',
    icon: '/kita/why6.png',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative py-24 bg-cover bg-center overflow-hidden bg-zinc-950"
      style={{ backgroundImage: "url('/kita/Kita-Home-7.webp')" }}
      id="why-us"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-10" />

      <div className="container-kita relative z-20">

        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider font-serif text-white uppercase text-center leading-tight">
            TẠI SAO CHỌN GAMMA HOME
          </h2>
          <img
            src="/kita/Title.png"
            alt="divider"
            className="h-4 w-auto object-contain my-1"
          />
        </div>

        {/* Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 max-w-6xl mx-auto">
          {STRENGTHS.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 group"
              >
                {/* Circular Gold Icon Container */}
                <div className="w-16 h-16 flex items-center justify-center text-zinc-950 transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-sm md:text-base text-primary-light tracking-wide uppercase leading-snug max-w-xs mt-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-xs md:text-sm font-light leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
