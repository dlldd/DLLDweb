
import React, { useState, useEffect } from 'react';
import Header, { ViewType as BaseViewType } from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import GrowthSection from './components/GrowthSection';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import ProjectDetail from './components/ProjectDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import IntroOverlay from './components/IntroOverlay';
import { Project, HeroImages, WorkCategory } from './types';

export type ViewType = BaseViewType | 'project-detail' | 'admin-login' | 'admin-dashboard';

const BRAND_HERO_IMAGE_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_therabbit%2022.png';
const PACKAGE_HERO_IMAGE_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_gs-02.jpg';
const CHARACTER_HERO_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.54.33.png';
const GRAPHIC_HERO_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/sbs%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%AD%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A13.jpg';
const LOGO_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/DLLD%E1%84%85%E1%85%A9%E1%84%80%E1%85%A92.png'; 
const ACCENT_IMAGE_URL = 'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/DLLD%E1%84%85%E1%85%A9%E1%84%80%E1%85%A93.png';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const STORAGE_KEYS = {
    PROJECTS: 'dlld_projects',
    HERO: 'dlld_hero_images',
    LOGO: 'dlld_logo',
    ACCENT: 'dlld_accent',
    ABOUT: 'dlld_about',
    GROWTH: 'dlld_growth'
  };

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : [
      {
        id: '9',
        title: "프렌차이즈 디저트 브랜드\n'치키차카초코' 브랜딩",
        category: WorkCategory.Brand,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.18.13.png',
        description: "프렌차이즈 디저트 카페 치키차카초코의 통합 브랜드 아이덴티티 디자인입니다.",
        client: '치키차카초코',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.54.56.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.55.10.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.18.13.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/4_102844.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/SU1HXzk4MDAuanBlZw%3D%3D.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/output_2197159711.jpg'
        ]
      },
      {
        id: '5',
        title: 'GS25x치키차카초코\n찰깨크림빵 패키지',
        category: WorkCategory.Package,
        year: '2024',
        imageUrl: PACKAGE_HERO_IMAGE_URL,
        description: "GS25와 디저트 브랜드 치키차카초코의 컬래버레이션 패키지 디자인입니다. 힙하고 트렌디한 감각을 패키지에 담았습니다.",
        client: 'GS25',
        hideMainImageInDetail: true,
        galleryImages: ['https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_gs2.png']
      },
      {
        id: '4',
        title: '2023 SBS 가요대전\n굿즈 디자인',
        category: WorkCategory.Graphic,
        year: '2023',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/sbs%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%AD%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A15.jpg',
        description: "2023 SBS 가요대전 캐릭터 달토를 이용한 굿즈 디자인 B안 입니다. 축제의 생동감을 굿즈 아이템 전반에 녹여냈습니다.",
        client: 'SBS',
        hideMainImageInDetail: true,
        galleryImages: [
          GRAPHIC_HERO_URL,
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/sbs%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%AD%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A15.jpg'
        ]
      }
    ];
  });

  const [heroImages, setHeroImages] = useState<HeroImages>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HERO);
    return saved ? JSON.parse(saved) : {
      [WorkCategory.Brand]: BRAND_HERO_IMAGE_URL,
      [WorkCategory.Package]: PACKAGE_HERO_IMAGE_URL,
      [WorkCategory.Character]: CHARACTER_HERO_URL,
      [WorkCategory.Graphic]: GRAPHIC_HERO_URL
    };
  });

  const [logoUrl, setLogoUrl] = useState(() => localStorage.getItem(STORAGE_KEYS.LOGO) || LOGO_URL);
  const [accentImageUrl, setAccentImageUrl] = useState(() => localStorage.getItem(STORAGE_KEYS.ACCENT) || ACCENT_IMAGE_URL);
  
  const [aboutContent, setAboutContent] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ABOUT);
    return saved ? JSON.parse(saved) : {
      text: "DLLD는 시각적 메시지의 본질을 탐구하고\n브랜드의 진정한 가치를 전달하는 디자인을 추구합니다.",
      subText1: "우리는 단순한 아름다움을 넘어 브랜드가 지닌 고유한 서사를 발견합니다.",
      subText2: "DLLD는 파트너와 함께 성장하며 지속 가능한 디자인 솔루션을 만들어갑니다.",
      imageUrl: BRAND_HERO_IMAGE_URL
    };
  });

  const [growthStats, setGrowthStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GROWTH);
    return saved ? JSON.parse(saved) : [
      { subtitle: "Completed Projects", value: "150+", description: "다양한 산업군의 브랜드와 함께한 성공적인 프로젝트들" },
      { subtitle: "Happy Clients", value: "80+", description: "DLLD의 디자인 철학을 믿고 함께해주신 소중한 파트너들" }
    ];
  });

  useEffect(() => localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroImages)), [heroImages]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.LOGO, logoUrl), [logoUrl]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.ACCENT, accentImageUrl), [accentImageUrl]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutContent)), [aboutContent]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.GROWTH, JSON.stringify(growthStats)), [growthStats]);

  const handleNavClick = (view: string) => {
    setCurrentView(view as ViewType);
    window.scrollTo(0, 0);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project-detail');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero 
              heroImages={heroImages} 
              projects={projects} 
              onProjectClick={handleProjectClick} 
              accentImageUrl={accentImageUrl} 
            />
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
              <About content={aboutContent} />
              <GrowthSection stats={growthStats} onNavClick={handleNavClick} />
              <WorkGrid projects={projects} onProjectClick={handleProjectClick} />
            </div>
          </>
        );
      case 'works':
        return (
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
            <WorkGrid projects={projects} onProjectClick={handleProjectClick} />
          </div>
        );
      case 'contact':
        return <ContactPage />;
      case 'project-detail':
        return selectedProject ? <ProjectDetail project={selectedProject} onBack={() => handleNavClick('home')} /> : null;
      case 'admin-login':
        return <AdminLogin onLogin={() => setIsAdmin(true)} onCancel={() => setCurrentView('home')} />;
      case 'admin-dashboard':
        return isAdmin ? (
          <AdminDashboard 
            projects={projects} 
            heroImages={heroImages} 
            logoUrl={logoUrl}
            accentImageUrl={accentImageUrl}
            aboutContent={aboutContent}
            growthStats={growthStats}
            onUpdateProjects={setProjects}
            onUpdateHeroImages={setHeroImages}
            onUpdateLogo={setLogoUrl}
            onUpdateAccentImage={setAccentImageUrl}
            onUpdateAbout={setAboutContent}
            onUpdateGrowth={setGrowthStats}
            onClose={() => setCurrentView('home')} 
          />
        ) : <AdminLogin onLogin={() => setIsAdmin(true)} onCancel={() => setCurrentView('home')} />;
      default:
        return null;
    }
  };

  const isMinimalView = currentView === 'admin-login' || currentView === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-white">
      {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      
      <div className={showIntro ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {!isMinimalView && (
          <Header 
            onNavClick={handleNavClick as any} 
            currentView={currentView as BaseViewType} 
            logoUrl={logoUrl} 
          />
        )}
        
        <main className="min-h-screen">
          {renderContent()}
        </main>

        {!isMinimalView && <Footer onAdminClick={() => setCurrentView('admin-login')} />}
      </div>
    </div>
  );
};

export default App;