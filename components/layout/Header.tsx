'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { getCategoriesByGroup } from '@/utils/api';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  {
    label: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { label: 'Về Gamma Home', href: '/gioi-thieu' },
      { label: 'Gamma Home Profile', href: '/gioi-thieu#profile' },
      { label: 'Sơ đồ tổ chức', href: '/gioi-thieu#so-do' },
      { label: 'Giá trị cốt lõi', href: '/gioi-thieu#gia-tri' },
    ],
  },
  {
    label: 'Dịch vụ',
    href: '/dich-vu',
    children: [
      { label: 'Xây nhà trọn gói', href: '/dich-vu/xay-nha-tron-goi' },
      { label: 'Thiết kế kiến trúc', href: '/dich-vu/thiet-ke-kien-truc' },
      { label: 'Thiết kế nội thất', href: '/dich-vu/thiet-ke-noi-that' },
      { label: 'Thi công phần thô', href: '/dich-vu/thi-cong-phan-tho' },
    ],
  },
  {
    label: 'Dự án',
    href: '/du-an',
    children: [
      { label: 'Nhà phố', href: '/du-an?cat=nha-pho' },
      { label: 'Nhà mái Nhật', href: '/du-an?cat=mai-nhat' },
      { label: 'Nhà mái Thái', href: '/du-an?cat=mai-thai' },
      { label: 'Biệt thự', href: '/du-an?cat=biet-thu' },
      { label: 'Nhà vườn', href: '/du-an?cat=nha-vuon' },
      { label: 'Dự án Nội thất', href: '/du-an?cat=noi-that' },
    ],
  },
  {
    label: 'Nội thất',
    href: '/noi-that',
    children: [
      { label: 'Nội thất nhà phố', href: '/noi-that?cat=nha-pho' },
      { label: 'Nội thất biệt thự', href: '/noi-that?cat=biet-thu' },
      { label: 'Nội thất chung cư', href: '/noi-that?cat=chung-cu' },
      { label: 'Nội thất khách sạn', href: '/noi-that?cat=khach-san' },
      { label: 'Nội thất văn phòng', href: '/noi-that?cat=van-phong' },
    ],
  },
  { label: 'Báo giá', href: '/bao-gia' },
  {
    label: 'Kiến thức',
    href: '/kien-thuc',
    children: [
      { label: 'Kiến thức xây nhà', href: '/kien-thuc/kien-thuc-xay-nha' },
      { label: 'Kiến thức phong thuỷ', href: '/kien-thuc/kien-thuc-phong-thuy' },
      { label: 'Thủ tục pháp lý', href: '/kien-thuc/thu-tuc-phap-ly' },
      { label: 'Dự toán chi phí', href: '/kien-thuc/du-toan-chi-phi' },
      { label: 'Câu hỏi thường gặp', href: '/kien-thuc/cau-hoi-thuong-gap' },
    ],
  },
  {
    label: 'Tin tức',
    href: '/tin-tuc',
    children: [
      { label: 'Tin tức nội bộ', href: '/tin-tuc/tin-tuc-noi-bo' },
      { label: 'Tin tức dự án', href: '/tin-tuc/tin-tuc-du-an' },
    ],
  },
  { label: 'Liên hệ', href: '/lien-he' },
];

function MobileNavItem({ item }: { item: NavItem }) {
  const hasChildren = !!item.children;
  const [isSubOpen, setIsSubOpen] = useState(false);

  return (
    <div className="border-b border-zinc-50 last:border-0 py-1">
      <div className="flex justify-between items-center">
        <Link
          href={item.href}
          className="block py-2.5 text-zinc-800 font-medium uppercase text-sm tracking-wider hover:text-primary"
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsSubOpen(!isSubOpen)}
            className="p-2 text-zinc-500 hover:text-primary cursor-pointer"
          >
            <ChevronDown size={18} className={`transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {hasChildren && isSubOpen && (
        <div className="pl-4 bg-zinc-50 rounded-md py-1 mt-1 mb-2 flex flex-col">
          {item.children?.map((child) => (
            <Link
              key={child.label}
              href={child.href}
              className="py-2 text-sm text-zinc-600 hover:text-primary transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [navItems, setNavItems] = useState<NavItem[]>(DEFAULT_NAV_ITEMS);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const [duAnCats, noiThatCats, dichVuCats] = await Promise.all([
          getCategoriesByGroup('du-an'),
          getCategoriesByGroup('noi-that'),
          getCategoriesByGroup('dich-vu'),
        ]);

        setNavItems(prevItems => {
          return prevItems.map(item => {
            if (item.label === 'Dự án' && duAnCats.length > 0) {
              return { ...item, children: duAnCats };
            }
            if (item.label === 'Nội thất' && noiThatCats.length > 0) {
              return { ...item, children: noiThatCats };
            }
            if (item.label === 'Dịch vụ' && dichVuCats.length > 0) {
              return { ...item, children: dichVuCats };
            }
            return item;
          });
        });
      } catch (error) {
        console.error('Lỗi khi lấy danh mục từ backend', error);
      }
    }
    
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const openConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-consultation-modal'));
  };

  return (
    <>
      {/* Main navigation header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-zinc-900'
          : 'bg-white shadow-sm py-5 text-zinc-900'
          }`}
      >
        <div className="container-kita flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/kita/gamma-home.jpg"
              alt="Gamma Home Logo"
              className="h-15 w-auto object-cover"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 font-semibold">
            {navItems.map((item) => {
              const hasChildren = !!item.children;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasChildren && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 py-2 text-[13px] xl:text-sm uppercase tracking-wider transition-colors hover:text-primary-light ${isActive
                      ? 'text-primary font-bold'
                      : 'text-zinc-800'
                      }`}
                  >
                    {item.label}
                    {hasChildren && <ChevronDown size={13} className="transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Dropdown Menu (Continuous Hover Bridge) */}
                  {hasChildren && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-1.5 w-64 z-50">
                      <div className="bg-white text-zinc-800 rounded-lg shadow-xl border border-zinc-100 overflow-hidden py-2 transition-all duration-200">
                        {item.children?.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-3 text-sm hover:bg-zinc-50 hover:text-primary transition-colors border-b border-zinc-50 last:border-0"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Icon flush to the right */}
          <div className="hidden lg:block">
            <button
              aria-label="Search"
              className="p-2 text-zinc-800 hover:text-[#f39221] transition-colors cursor-pointer"
            >
              <Search size={20} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} className="text-zinc-900" />}
          </button>
        </div>

        {/* Mobile Menu Panel (Absolute Overlay) */}
        {isOpen && (
          <div className="absolute left-0 top-full w-full lg:hidden bg-white border-t border-b border-zinc-100 shadow-2xl transition-all duration-300 z-50 max-h-[calc(100vh-70px)] overflow-y-auto">
            <div className="container-kita py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} />
              ))}
              <button
                onClick={openConsultation}
                className="mt-4 w-full text-center py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-medium uppercase text-sm tracking-wider transition-all cursor-pointer"
              >
                Nhận tư vấn miễn phí
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
