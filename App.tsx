
import React, { useState, useEffect } from 'react';
import Header, { ViewType as BaseViewType } from './components/Header';
import WorkGrid from './components/WorkGrid';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import ProjectDetail from './components/ProjectDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import IntroOverlay from './components/IntroOverlay';
import { Project, HeroImages, WorkCategory } from './types';

export type ViewType = BaseViewType | 'project-detail' | 'admin-login' | 'admin-dashboard';

// 초기 이미지 URL들
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
      },
      { 
        id: '2', 
        title: '요거트 퍼플\n캐릭터 디자인', 
        category: WorkCategory.Character, 
        year: '2025', 
        imageUrl: CHARACTER_HERO_URL, 
        description: "프리미엄 디저트 브랜드 '요거트퍼플'의 브랜딩 전반을 새롭게 리디자인했습니다. 캐릭터를 활용한 친근한 커뮤니케이션 전략을 수립했습니다.", 
        galleryImages: [CHARACTER_HERO_URL, 'https://raw.githubusercontent.com/dlldd/DLLD-web/refs/heads/main/222.jpg'],
        client: '에이앤디',
        hideMainImageInDetail: true
      },
      {
        id: '12',
        title: '‘탄소예산과 탄소감축경로 톺아보기’\n행사 포스터 디자인',
        category: WorkCategory.Graphic,
        year: '2025',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/turntable2.png',
        description: "2025년 주한독일대사관과 기후커뮤니티 턴테이블이 공동 주최하는 ‘탄소예산과 탄소감축경로 톺아보기’ 행사의 공식 포스터 및 키 비주얼 디자인입니다. 청년들이 기후위기 핵심 키워드가 쓰인 깃발을 들고 함께 달려가는 이미지로 청년들의 행동을 상징적으로 표현하였으며, 배경 하단에 위치한 산은 계속 줄어드는 탄소예산을 이중적으로 표현하였습니다.",
        client: '주한독일대사관, 턴테이블',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/turntable.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/turntable2.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Subway%20Poster%20Mockup%20copy.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/IMG_0717.jpeg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/IMG_0719.jpeg'
        ]
      },
      { 
        id: '3', 
        title: "'비건잔치'\n제 12회 비건페스티벌", 
        category: 'Visual Identity', 
        year: '2024', 
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8E%E1%85%B5-04%20(1).jpg',
        description: "국내 최대 비건 문화 축제인 '비건페스티벌'의 12회 디자인을 담당했습니다. '잔치'라는 테마에 맞춰 활기차고 다채로운 비주얼을 선보였습니다.",
        client: 'Vegan Festival Korea',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8E%E1%85%B5-01.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8E%E1%85%B5-02.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%AB-07.jpg'
        ]
      },
      {
        id: '6',
        title: '뉴당 NEWDANG\n아이스크림 카페 브랜딩',
        category: WorkCategory.Brand,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-01.jpg',
        description: "연남동에 오픈한 저당 전문 아이스크림 브랜드 뉴당의 브랜드 아이덴티티입니다. 달콤함과 건강함의 균형을 시각화했습니다.",
        client: '달당',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-01.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-02.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-03.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-04.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-05.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-06.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-07.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-08.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-09.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-10.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%82%E1%85%B2%E1%84%83%E1%85%A1%E1%86%BC-11.jpg'
        ]
      },
      { 
        id: '1', 
        title: '프리미엄 비건 고메 브랜드\n더래빗 브랜딩', 
        category: WorkCategory.Brand, 
        year: '2024', 
        imageUrl: BRAND_HERO_IMAGE_URL, 
        description: "우리는 브랜드의 핵심 키워드인 '연결'과 '성장'을 시각화하기 위해 유연한 곡선과 정갈한 서체를 제안했습니다. 비건 고메의 본질을 담아낸 디자인입니다.", 
        galleryImages: ['https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_therabbit%202%20(1).png'],
        client: '남미컴퍼니',
        hideMainImageInDetail: true
      },
      {
        id: '7',
        title: '올바른 감탄 비건장\n비주얼 아이덴티티',
        category: WorkCategory.Graphic,
        year: '2025',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.38.45.png',
        description: "비건 문화의 확산을 목표로 하는 '올바른 감탄 비건장'의 통합 브랜딩입니다. 자연과 상생하는 가치를 따뜻하고 정갈한 그래픽 언어로 표현했습니다.",
        client: 'Reblank,올바른농부장,Vegan Festival Korea',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202026-02-02%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%208.38.45.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B5%E1%84%80%E1%85%A5%E1%86%AB%E1%84%8C%E1%85%A1%E1%86%AB%E1%84%8E%E1%85%B5-04%20(1).jpg'
        ]
      },
      {
        id: '8',
        title: '프렌차이즈 디저트 브랜드\n치키차카초코 패키지 디자인',
        category: WorkCategory.Package,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-01.jpg',
        description: "프렌차이즈 디저트 카페 치키차카초코의 코르네 파이 패키지 리뉴얼 디자인입니다.",
        client: '치키차카초코',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-05.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-06.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-01.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-02.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%8E%E1%85%B5%E1%84%8E%E1%85%A1%E1%84%8E%E1%85%A9%E1%84%91%E1%85%A2%E1%84%8F%E1%85%B5%E1%84%8C%E1%85%B5-03.jpg'
        ]
      },
      {
        id: '10',
        title: '부산 전포 카페 "Heap.p"브랜딩',
        category: WorkCategory.Brand,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Heapp3.jpg',
        description: "부산 전포동에 위치한 카페 'Heap.p'의 브랜드 아이덴티티 디자인입니다.",
        client: 'Heap.p',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Heapp3.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%B5%E1%86%B8%E1%84%91%E1%85%B5-04.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%B5%E1%86%B8%E1%84%91%E1%85%B5-05.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%B5%E1%86%B8%E1%84%91%E1%85%B5-06.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%B5%E1%86%B8%E1%84%91%E1%85%B5-09.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%92%E1%85%B5%E1%86%B8%E1%84%91%E1%85%B5-10.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Heapp1.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Heapp2.png'
        ]
      },
      {
        id: '11',
        title: "'도봉구성평등활동센터'\n몸 다양성 워크숍 포스터 디자인",
        category: WorkCategory.Graphic,
        year: '2021',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Thumbnail.gif',
        description: "‘몸 다양성’과 여성 자기방어 훈련이라는 주제를 긍정적이고 역동적인 이미지로 풀어내기 위해, 강한 컬러 대비와 운동의 순간을 포착한 그래픽을 중심으로 시리즈 아이덴티티를 구축했습니다. 각 연도의 프로그램 성격에 맞춰 메시지 톤을 조정하면서도, 통일된 비주얼 언어를 유지해 연속성 있는 캠페인 이미지를 완성했습니다.",
        client: '도봉구성평등활동센터',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/Thumbnail.gif',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/dobong1.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/dobong2.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/dobong3.jpg',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/dobong4.jpg'
        ]
      },
      {
        id: '17',
        title: "제주도 '블루메베이글'\n브랜딩",
        category: WorkCategory.Brand,
        year: '2023',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-01.png',
        description: "제주도 제주공항 근처에 위치한 베이글집 블루메베이글의 브랜딩을 했습니다.",
        client: '블루메베이글',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-01.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-02.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-03.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-04.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-05.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-06.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-09.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-10.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-11.png',
          'https://raw.githubusercontent.com/dlldd/DLLD-web/main/%E1%84%82%E1%85%A9%E1%84%90%E1%85%B3%E1%84%91%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A9_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%AE%E1%84%86%E1%85%A6-12.png'
        ]
      },
      {
        id: '16',
        title: "제9회 비건페스티벌 'Vegan Now' 디자인",
        category: WorkCategory.Package,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/coming%20soon.jpg',
        description: "오설록의 프리미엄 라인을 위한 지함 패키지 디자인입니다. 제주의 사계절을 담은 서정적인 컬러와 정갈한 레이아웃을 통해 차(Tea)가 주는 평온한 가치를 시각화했습니다.",
        client: 'Amorepacific (Osulloc)',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://images.unsplash.com/photo-1594631252845-29fc45865157?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1544787210-2213d2427507?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1974&auto=format&fit=crop'
        ]
      },
      {
        id: '15',
        title: 'Coming Soon',
        category: WorkCategory.Graphic,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/coming%20soon.jpg',
        description: "글로벌 K-컬처 페스티벌 KCON의 2024년 메인 그래픽입니다. '연결'과 '확장'이라는 키워드를 입체적인 기하학 패턴과 강렬한 타이포그래피로 표현하여 축제의 현장감을 극대화했습니다.",
        client: 'CJ ENM',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1514525253344-f814d0743b17?q=80&w=2064&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop'
        ]
      },
      {
        id: '14',
        title: 'Coming Soon',
        category: WorkCategory.Brand,
        year: '2023',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/coming%20soon.jpg',
        description: "현대카드 디자인 라이브러리의 아이덴티티를 공간과 인쇄물 전반에 유기적으로 연결했습니다. 정제된 레이아웃과 서체 사용을 통해 몰입감 있는 브랜드 경험을 제공합니다.",
        client: 'Hyundai Card',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1517502474097-f9b30659dadb?q=80&w=1927&auto=format&fit=crop'
        ]
      },
      {
        id: '13',
        title: 'Coming Soon',
        category: WorkCategory.Character,
        year: '2024',
        imageUrl: 'https://raw.githubusercontent.com/dlldd/DLLD-web/main/coming%20soon.jpg',
        description: "삼양식품의 상징적인 캐릭터 '호치'를 현대적인 3D 스타일과 플랫 그래픽으로 리디자인했습니다. 캐릭터의 위트와 에너지를 유지하면서도 다양한 매체에 최적화된 비주얼 시스템을 구축했습니다.",
        client: 'Samyang Foods',
        hideMainImageInDetail: true,
        galleryImages: [
          'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1585298723682-7115561c51b7?q=80&w=1964&auto=format&fit=crop'
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
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)), [projects]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(heroImages)), [heroImages]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.LOGO, logoUrl), [logoUrl]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.ACCENT, accentImageUrl), [accentImageUrl]);
  useEffect(() => localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(aboutContent)), [aboutContent]);

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
      case 'works':
        return <WorkGrid projects={projects} onProjectClick={handleProjectClick} />;
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
      {/* Intro Overlay */}
      {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      
      {/* Main UI: 인트로가 끝나거나 진행 중일 때 투명하게 뒤에 존재 */}
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
