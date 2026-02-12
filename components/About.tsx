
import React, { useEffect, useRef, useState } from 'react';

interface AboutProps {
  content: {
    text: string;
    subText1: string;
    subText2: string;
    imageUrl: string;
  };
}

const About: React.FC<AboutProps> = ({ content }) => {
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

  const renderHighlightedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(목적|메시지|시각적)/g);
    return parts.map((part, i) => 
      (part === '목적' || part === '메시지' || part === '시각적') ? 
      <span key={i} className="text-[#EE3231]">{part}</span> : part
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`w-full pt-12 md:pt-16 pb-16 md:pb-24 border-t border-gray-100 transition-all duration-1000 ease-out px-5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="w-full flex flex-col items-center">
        <p className="text-2xl md:text-4xl font-black leading-[1.6] mb-16 tracking-tight text-center break-keep adobe-font whitespace-pre-line w-full">
          {renderHighlightedText(content.text)}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-600 font-light leading-[1.8] w-full">
          <p className="whitespace-pre-line">{content.subText1}</p>
          <p className="whitespace-pre-line">{content.subText2}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
