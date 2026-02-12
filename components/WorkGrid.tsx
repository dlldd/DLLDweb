
import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';

interface WorkGridProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

const ProjectCard: React.FC<{ project: Project; index: number; onClick?: () => void }> = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="animate-in fade-in slide-in-from-bottom-6 duration-1000 cursor-pointer"
      style={{ animationDelay: `${(index % 9) * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-white group aspect-[4/3] shadow-none rounded-none border-none" style={{ boxShadow: 'none' }}>
        {/* Main Image - Central Cropped 4:3 */}
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-out group-hover:scale-105 rounded-none"
          draggable="false"
          style={{ boxShadow: 'none' }}
        />
        
        {/* Hover Image (if available) */}
        {project.hoverImageUrl && (
          <img 
            src={project.hoverImageUrl} 
            alt={`${project.title} hover`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out rounded-none ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            draggable="false"
            style={{ boxShadow: 'none' }}
          />
        )}
        
        {/* Project Info Overlay - Minimalist style */}
        <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-8 text-center transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`transform transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
            <h3 className="text-white text-lg md:text-xl font-black uppercase tracking-tight leading-tight mb-3 adobe-font px-4 whitespace-pre-line">
              {project.title}
            </h3>
            <p className="text-white/80 text-[9px] uppercase font-bold tracking-[0.3em]">
              {project.category}
            </p>
            <div className="mt-4 mx-auto w-8 h-[2px] bg-[#EE3231]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkGrid: React.FC<WorkGridProps> = ({ projects, onProjectClick }) => {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="works" 
      ref={sectionRef}
      className={`w-full pt-[100px] md:pt-[158px] pb-32 bg-white px-5 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 3열 그리드 레이아웃 적용 (md:grid-cols-2 lg:grid-cols-3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2 w-full mx-auto">
        {projects.length === 0 ? (
          <p className="text-gray-400 italic font-black text-center col-span-full py-20">No projects to display.</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => onProjectClick?.(project)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default WorkGrid;
