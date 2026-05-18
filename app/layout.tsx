import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingContact from "../components/shared/FloatingContact";
import ConsultationModal from "../components/shared/ConsultationModal";

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  subsets: ["vietnamese", "latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Gamma Home | Thiết kế và Thi công trọn gói nhà phố, biệt thự đẹp",
  description: "Gamma Home chuyên thiết kế kiến trúc, thiết kế & thi công nội thất, xây nhà trọn gói uy tín hàng đầu Việt Nam. Tận tâm trong từng viên gạch - Vững trọn niềm tin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${baiJamjuree.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-800 font-sans antialiased">
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <ConsultationModal />
      </body>
    </html>
  );
}
