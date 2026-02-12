
import React, { useState, useEffect } from 'react';
import { WorkCategory, HeroImages, Project } from '../types';

interface HeroProps {
  heroImages: HeroImages;
  projects?: Project[];
  onProjectClick?: (project: Project) => void;
  accentImageUrl?: string; 
}

const LOGO_CLICK_IMAGE = 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/85x55-mm-Business-Card-Mockups%20%E1%84%87%E1%85%A9%E1%86%A8%E1%84%89%E1%85%A1.jpg';

const Hero: React.FC<HeroProps> = ({ heroImages, projects = [], onProjectClick }) => {
  const categories = Object.values(WorkCategory);
  // 초기 상태를 null과 LOGO_CLICK_IMAGE로 설정하여 로고를 클릭한 상태로 시작
  const [activeCategory, setActiveCategory] = useState<WorkCategory | null>(null);
  const [displayImage, setDisplayImage] = useState<string>(LOGO_CLICK_IMAGE);

  // Props로 전달된 heroImages가 변경될 때 (Admin에서 수정 등) 현재 표시 중인 이미지 업데이트
  useEffect(() => {
    if (activeCategory) {
      setDisplayImage(heroImages[activeCategory]);
    }
  }, [heroImages, activeCategory]);

  const handleCategoryClick = (cat: WorkCategory) => {
    setActiveCategory(cat);
    setDisplayImage(heroImages[cat]);
  };

  const handleLogoClick = () => {
    // 로고 클릭 시 사용자가 요청한 특정 이미지 표시 및 카테고리 선택 해제
    setActiveCategory(null);
    setDisplayImage(LOGO_CLICK_IMAGE);
  };

  const handleImageClick = () => {
    if (activeCategory && onProjectClick) {
      // 현재 선택된 카테고리에 해당하는 프로젝트를 찾아 상세 페이지로 이동
      const targetProject = projects.find(p => p.category === activeCategory);
      if (targetProject) {
        onProjectClick(targetProject);
      }
    }
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-stretch bg-white overflow-hidden pt-[84px] md:pt-[116px]">
      {/* Left Area: Main Image Area */}
      <div 
        className="w-full md:w-[58%] overflow-hidden relative bg-gray-50 h-[50vh] md:h-[calc(100vh-116px)] flex items-center justify-center cursor-pointer group"
        onClick={handleImageClick}
      >
        <img 
          key={displayImage} // 이미지 URL 변경 시 애니메이션 트리거
          src={displayImage} 
          alt="Featured Graphic Work" 
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out animate-in fade-in duration-700"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      </div>

      {/* Right Area: Intro & Category List */}
      <div className="w-full md:w-[42%] flex flex-col justify-between pt-8 md:pt-12 pb-12 md:pb-0 px-8 md:px-16 relative md:h-[calc(100vh-116px)]">
        
        {/* Intro Text Container */}
        <div className="flex flex-col pt-0">
          <div 
            onClick={handleLogoClick}
            className="animate-in fade-in slide-in-from-left-4 duration-1000 ease-out cursor-pointer hover:opacity-80 transition-opacity w-fit"
          >
            <img 
              src="https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/DLLD_2.png" 
              alt="Do What You Love, Love What You Do" 
              className="w-full max-w-[220px] md:max-w-[320px] h-auto object-contain"
            />
          </div>

          <p className="text-gray-400 text-lg md:text-2xl font-black max-w-md leading-tight mt-1">
            그래픽디자인스튜디오 DLLD
          </p>
        </div>

        {/* Category List Container */}
        <div className="w-full relative mt-16 md:mt-0">
          <ul className="border-t border-gray-200">
            {categories.map((cat, index) => (
              <li 
                key={index}
                onClick={() => handleCategoryClick(cat as WorkCategory)}
                className="group border-b border-gray-200 py-3 md:py-4 flex justify-between items-center cursor-pointer overflow-hidden transition-colors duration-300"
              >
                <span className={`text-lg md:text-xl font-black tracking-tight transition-all duration-500 ease-out adobe-font ${
                  activeCategory === cat 
                    ? 'pl-2 text-[#EE3231]' 
                    : 'group-hover:pl-2 text-black opacity-60 group-hover:opacity-100 group-hover:text-black'
                }`}>
                  {cat}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
