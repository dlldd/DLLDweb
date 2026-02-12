
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <section className="min-h-screen w-full pt-[170px] md:pt-[220px] pb-20 px-0 animate-in fade-in duration-700 border-none shadow-none">
      <div className="w-full">
        {/* 2-Column Contact Info Section */}
        <div className="flex flex-col md:flex-row items-stretch border-none pt-0 px-6 md:px-12 mb-20 md:mb-32">
          
          {/* Left Side: Title - Aligned to left to provide more space from the divider */}
          <div className="w-full md:w-[40%] mb-10 md:mb-0 flex flex-col items-start md:pl-16">
            <h2 className="text-[24px] md:text-[32px] font-black text-[#EE3231] tracking-tighter uppercase adobe-font text-left">
              문의하기
            </h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-2 text-left">Contact</p>
          </div>

          {/* Vertical Divider - Desktop Only */}
          <div className="hidden md:block w-[1px] bg-[#e5e5e5] self-stretch my-2 mx-8 lg:mx-12"></div>

          {/* Right Side: Details */}
          <div className="w-full md:w-[60%] md:pl-8 lg:pl-12">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Email</p>
                <a href="mailto:dllddesignstudio@gmail.com" className="text-[18px] md:text-[22px] font-bold text-black hover:text-[#EE3231] transition-colors lowercase border-b-2 border-transparent hover:border-[#EE3231] pb-1">
                  dllddesignstudio@gmail.com
                </a>
              </div>
              
              <div className="pt-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                <p className="text-[18px] md:text-[22px] font-bold text-black">
                  010. 5204. 2108
                </p>
              </div>
            </div>
            
            <div className="mt-20 flex gap-10">
              <a 
                href="https://www.instagram.com/dlldstudio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-[#EE3231] transition-colors">Instagram</span>
                <div className="h-[2px] w-0 group-hover:w-full bg-[#EE3231] transition-all duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group flex flex-col"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-[#EE3231] transition-colors">Behance</span>
                <div className="h-[2px] w-0 group-hover:w-full bg-[#EE3231] transition-all duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
