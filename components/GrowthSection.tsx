
import React, { useEffect, useRef, useState } from 'react';

interface GrowthSectionProps {
  stats: { subtitle: string; value: string; description: string }[];
  onNavClick: (view: string) => void;
}

const GrowthSection: React.FC<GrowthSectionProps> = ({ stats, onNavClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full pt-12 md:pt-16 pb-12 md:pb-16 bg-white overflow-hidden px-5">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center w-full">
        <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black tracking-tighter leading-[1.3] text-black mb-8 adobe-font">
            DLLD design은 다양한 브랜드와의<br />협업을 통해 성장해왔습니다.
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed mb-10 w-full">
            우리는 브랜드의 본질을 이해하고 최적의 시각적 솔루션을 제안합니다. 스타트업부터 글로벌 기업까지, 각기 다른 스토리를 디자인으로 연결합니다.
          </p>
          <button 
            onClick={() => onNavClick('works')}
            className="group flex items-center text-[#EE3231] font-black text-[10px] uppercase tracking-widest gap-2"
          >
            <span>View All Projects</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gray-50 p-8 md:p-10 rounded-2xl border border-gray-100 transition-all duration-1000 ease-out hover:shadow-xl hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">{stat.subtitle}</p>
              <h3 className="text-5xl md:text-6xl font-black text-black mb-4 tracking-tighter adobe-font">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium leading-snug">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthSection;
