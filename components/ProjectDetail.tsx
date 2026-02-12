
import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-[100px] md:pt-[158px] pb-32 animate-in fade-in duration-700">
      {/* 중앙 집중형 컨테이너 및 좌우 안전 여백 */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 xl:px-24">
        
        {/* 상단 네비게이션 */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-[#EE3231] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Gallery
          </button>
        </div>

        {/* 헤더 섹션: 타이틀 및 설명 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-8">
            {/* 모든 상세페이지 제목 폰트 크기를 20pt로 고정 */}
            <h1 className="text-[20pt] font-black uppercase tracking-tighter leading-[1.2] mb-10 adobe-font whitespace-pre-line">
              {project.title}
            </h1>
            {/* 페이지 설명 폰트 크기 13pt 유지 */}
            <div className="text-[13pt] text-gray-700 font-light leading-relaxed max-w-3xl whitespace-pre-line tracking-tight">
              {project.description || "프로젝트에 대한 상세 설명이 준비 중입니다."}
            </div>
          </div>
          
          {/* 프로젝트 메타 정보 */}
          <div className="lg:col-span-4 flex flex-col gap-8 pt-2">
            <div className="border-t border-gray-200 pt-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category</p>
              <p className="font-bold text-lg md:text-xl">{project.category}</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Year</p>
              <p className="font-bold text-lg md:text-xl">{project.year}</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Client</p>
              <p className="font-bold text-lg md:text-xl">{project.client || "DLLD Partners"}</p>
            </div>
          </div>
        </div>

        {/* 갤러리 이미지 섹션: 이미지 사이 간격 제거, 그림자/둥글기 완전 제거 */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="flex flex-col w-full m-0 p-0" style={{ boxShadow: 'none' }}>
            {project.galleryImages.map((img, idx) => (
              <img 
                key={idx}
                src={img} 
                alt={`${project.title} gallery ${idx}`} 
                className="w-full h-auto block m-0 p-0 rounded-none border-none outline-none" 
                style={{ 
                  boxShadow: 'none', 
                  appearance: 'none', 
                  display: 'block',
                  marginBottom: '0',
                  paddingBottom: '0'
                }}
              />
            ))}
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-32 pt-16 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest bg-black text-white px-10 py-5 rounded-none hover:bg-[#EE3231] transition-all duration-300 active:scale-95 shadow-none"
            style={{ boxShadow: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Explore More Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
