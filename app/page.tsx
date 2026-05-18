import HeroSlider from "../components/home/HeroSlider";
import DoubleBanner from "../components/home/DoubleBanner";
import AboutSection from "../components/home/AboutSection";
import ProjectsSection from "../components/home/ProjectsSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ExperienceSection from "../components/home/ExperienceSection";
import VideoSection from "../components/home/VideoSection";
import ContactForm from "../components/home/ContactForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Image & Text Slider */}
      <HeroSlider />

      {/* 2. Double Banner 50/50 right below the slider */}
      <DoubleBanner />

      {/* 3. Về chúng tôi (About Section - Vision, Mission, Core Values) */}
      <AboutSection />

      {/* 4. Dự án Kiến trúc & Nội thất Tiêu biểu */}
      <ProjectsSection />

      {/* 5. 6 lợi thế vượt trội (Why Choose Us) */}
      <WhyChooseUs />

      {/* 6. Kinh nghiệm xây dựng */}
      <ExperienceSection />

      {/* 7. Khách hàng nói gì về Gamma Home */}
      <VideoSection />

      {/* 8. Form nhận tư vấn / Quà tặng miễn phí thiết kế */}
      <ContactForm />
    </div>
  );
}
