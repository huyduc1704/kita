export const dynamic = 'force-dynamic';

import { getSystemSetting } from '@/utils/api';
import HeroSlider from "../components/home/HeroSlider";
import DoubleBanner from "../components/home/DoubleBanner";
import AboutSection from "../components/home/AboutSection";
import ProjectsSection from "../components/home/ProjectsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ExperienceSection from "../components/home/ExperienceSection";
import VideoSection from "../components/home/VideoSection";
import ContactForm from "../components/home/ContactForm";

export default async function Home() {
  const setting = await getSystemSetting();
  const config = setting?.homeConfig || {};

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Image & Text Slider */}
      <HeroSlider />

      {/* 2. Double Banner 50/50 right below the slider */}
      <DoubleBanner config={config.doubleBanner} />

      {/* 3. Về chúng tôi (About Section - Vision, Mission, Core Values) */}
      <AboutSection config={config.about} />

      {/* 4. Dự án Kiến trúc & Nội thất Tiêu biểu */}
      <ProjectsSection />

      {/* 5. 6 lợi thế vượt trội (Why Choose Us) */}
      <WhyChooseUs config={config.whyChooseUs} />

      {/* 6. Kinh nghiệm xây dựng */}
      <ExperienceSection />

      {/* 7. Khách hàng nói gì về Gamma Home */}
      <VideoSection config={config.video} />

      {/* 8. Form nhận tư vấn / Quà tặng miễn phí thiết kế */}
      <ContactForm />
    </div>
  );
}
