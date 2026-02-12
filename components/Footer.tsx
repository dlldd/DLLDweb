
import React, { useEffect, useRef, useState } from 'react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

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
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer 
      id="contact" 
      ref={footerRef}
      className={`px-5 pt-0 pb-12 md:pb-16 bg-white text-black transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 border-t border-gray-100 pt-12">
        <div className="flex flex-col space-y-1 text-sm tracking-widest">
          <a href="mailto:dllddesignstudio@gmail.com" className="font-black hover:text-[#EE3231] transition-colors lowercase">dllddesignstudio@gmail.com</a>
          <p className="font-bold uppercase">Seoul. South Korea</p>
          <div className="flex items-center gap-2">
            <p className="font-bold uppercase">© 2024 DLLD design.</p>
            {/* 관리자 진입 비밀 버튼 */}
            <button 
              onClick={onAdminClick}
              className="w-1.5 h-1.5 rounded-full bg-gray-100 hover:bg-[#EE3231] transition-colors"
              title="Admin Access"
            />
          </div>
        </div>

        <div className="flex space-x-6 text-sm uppercase tracking-widest font-bold">
          <a href="https://www.instagram.com/dlldstudio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#EE3231] transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
