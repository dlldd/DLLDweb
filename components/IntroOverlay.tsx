
import React, { useState, useEffect } from 'react';

const INTRO_GIF_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/DLLD_%E1%84%86%E1%85%A9%E1%84%89%E1%85%A7%E1%86%AB2.gif';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [isOverlayFading, setIsOverlayFading] = useState(false);

  useEffect(() => {
    // 인트로 활성화 중 스크롤 방지
    document.body.style.overflow = 'hidden';

    // 1. 요청하신 대로 2.4초(2400ms) 동안 GIF 재생 후 로고(GIF)를 숨깁니다.
    const logoHideTimer = setTimeout(() => {
      setShowLogo(false);
    }, 2400);

    // 2. GIF 재생 종료 시점(2.4s)에 맞춰 전체 오버레이의 페이드아웃을 시작합니다.
    const overlayFadeStartTimer = setTimeout(() => {
      setIsOverlayFading(true);
    }, 2400);

    // 3. 요청하신 페이드아웃 지속 시간 0.4초(400ms)가 지난 뒤 컴포넌트를 최종 제거합니다.
    // 2400ms(재생) + 400ms(페이드) = 2800ms
    const finalCompleteTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(logoHideTimer);
      clearTimeout(overlayFadeStartTimer);
      clearTimeout(finalCompleteTimer);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-[#EE3231] flex items-center justify-center transition-opacity duration-400 ease-out ${
        isOverlayFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div 
        className={`w-full max-w-[280px] md:max-w-[400px] p-4 transition-all duration-300 ease-in-out ${
          showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <img 
          src={INTRO_GIF_URL} 
          alt="DLLD Intro Motion" 
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default IntroOverlay;
