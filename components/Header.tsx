
import React, { useState, useEffect } from 'react';

export type ViewType = 'home' | 'works' | 'about' | 'contact';

interface HeaderProps {
  onNavClick: (view: ViewType) => void;
  currentView: ViewType;
  logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ onNavClick, currentView, logoUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 60px 이상 스크롤 시 상태 변경
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isContactView = currentView === 'contact';

  // 배경 및 그림자 스타일
  // Contact 페이지일 때는 스크롤 전에도 은은한 그림자를 적용
  const headerBgStyles = isScrolled 
    ? 'bg-[#EE3231] border-transparent shadow-lg' 
    : `bg-white ${isContactView ? 'shadow-[0_2px_15px_rgba(0,0,0,0.05)] border-transparent' : 'border-transparent'}`;

  const textColor = isScrolled ? 'text-white' : 'text-black';
  const logoFilter = isScrolled ? 'brightness-0 invert' : '';

  // 수직 여백 및 로고 크기 정의 (부드러운 전환을 위해 클래스 분리)
  const logoPadding = isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6';
  const navPadding = isScrolled ? 'pb-2 md:pb-3' : 'pb-4 md:pb-5';
  const logoHeight = isScrolled ? 'h-[50px] md:h-[80px]' : 'h-[70px] md:h-[110px]';

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out flex justify-between items-stretch border-b ${headerBgStyles}`}
    >
      {/* 로고 영역: 크기와 패딩 전환 */}
      <div className={`flex items-center px-6 md:px-12 transition-all duration-700 ease-in-out ${logoPadding}`}>
        <button 
          onClick={() => onNavClick('home')} 
          className="flex items-center focus:outline-none"
        >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="DLLD Logo" 
              className={`w-auto object-contain transition-all duration-700 ease-in-out ${logoFilter} ${logoHeight}`} 
            />
          ) : (
            <span className={`font-black tracking-tighter uppercase transition-all duration-700 ease-in-out ${
              isScrolled ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'
            } ${textColor}`}>
              DLLD
            </span>
          )}
        </button>
      </div>
      
      {/* 네비게이션 영역: 하단 정렬 및 패딩 전환 */}
      <nav className={`flex items-end px-6 md:px-12 transition-all duration-700 ease-in-out ${navPadding}`}>
        <ul className={`flex items-center space-x-8 md:space-x-14 font-black tracking-widest uppercase transition-colors duration-700 ${textColor}`}>
          <li>
            <button 
              onClick={() => onNavClick('home')} 
              className={`text-[13px] md:text-[18px] font-black leading-none transition-all duration-500 ease-in-out ${
                isScrolled 
                ? (currentView === 'home' ? 'text-black/40' : 'text-white/80 hover:text-white')
                : (currentView === 'home' ? 'text-[#EE3231]' : 'text-black/40 hover:text-black')
              }`}
            >
              Works
            </button>
          </li>
          <li>
            <button 
              onClick={() => onNavClick('contact')} 
              className={`text-[13px] md:text-[18px] font-black leading-none transition-all duration-500 ease-in-out ${
                isScrolled 
                ? (currentView === 'contact' ? 'text-black/40' : 'text-white/80 hover:text-white')
                : (currentView === 'contact' ? 'text-[#EE3231]' : 'text-black/40 hover:text-black')
              }`}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
