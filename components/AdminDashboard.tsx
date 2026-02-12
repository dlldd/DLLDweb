import React, { useState, useRef } from 'react';
import { Project, WorkCategory, HeroImages } from '../types';

interface AdminDashboardProps {
  projects: Project[];
  heroImages: HeroImages;
  logoUrl: string;
  accentImageUrl: string;
  aboutContent: { text: string; subText1: string; subText2: string; imageUrl: string };
  growthStats: any[];
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateHeroImages: (heroImages: HeroImages) => void;
  onUpdateLogo: (logoUrl: string) => void;
  onUpdateAccentImage: (url: string) => void;
  onUpdateAbout: (content: any) => void;
  onUpdateGrowth: (stats: any[]) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  projects, 
  heroImages, 
  logoUrl,
  accentImageUrl,
  aboutContent,
  growthStats,
  onUpdateProjects, 
  onUpdateHeroImages, 
  onUpdateLogo,
  onUpdateAccentImage,
  onUpdateAbout,
  onUpdateGrowth,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'works' | 'hero' | 'about' | 'growth'>('works');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '', category: WorkCategory.Brand, year: '2024', imageUrl: '', description: '', hoverImageUrl: '', client: ''
  });

  const resizeImage = (file: File, maxWidth: number = 1200): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          }
          canvas.width = width; canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
      };
    });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } as Project : p));
    } else {
      onUpdateProjects([{ id: Date.now().toString(), ...formData } as Project, ...projects]);
    }
    setEditingId(null);
    setFormData({ title: '', category: WorkCategory.Brand, year: '2024', imageUrl: '', description: '', hoverImageUrl: '', client: '' });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-white font-sans text-black">
      <div className="flex justify-between items-center mb-8 border-b border-black pb-4">
        <h2 className="text-3xl font-black uppercase tracking-tighter adobe-font">Studio Manager</h2>
        <button onClick={onClose} className="px-6 py-2 border-2 border-black font-bold uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all">Exit</button>
      </div>

      <nav className="flex gap-8 mb-12 overflow-x-auto pb-2 border-b border-gray-100">
        {['works', 'hero', 'about', 'growth'].map((tab: any) => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`uppercase tracking-widest text-xs font-black pb-2 transition-all ${activeTab === tab ? 'border-b-2 border-[#EE3231] text-[#EE3231]' : 'text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'works' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-black uppercase mb-6">{editingId ? 'Edit' : 'Add'} Project</h3>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border-b border-black py-2 focus:outline-none" required />
              <div className="grid grid-cols-2 gap-4">
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full border-b border-black py-2 focus:outline-none">
                  {Object.values(WorkCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="text" placeholder="Year" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full border-b border-black py-2 focus:outline-none" />
              </div>
              <input type="text" placeholder="Client" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full border-b border-black py-2 focus:outline-none" />
              <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 p-3 h-32 focus:outline-none text-sm" />
              
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] font-bold uppercase border border-dashed border-gray-300 py-4 hover:bg-gray-50">Upload Main Img</button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={async e => {
                  const f = e.target.files?.[0]; if(f) setFormData({...formData, imageUrl: await resizeImage(f)});
                }} />
              </div>
              
              <button type="submit" className="w-full bg-[#EE3231] text-white py-4 font-black uppercase tracking-widest text-sm hover:bg-black transition-colors">{editingId ? 'Update' : 'Publish'}</button>
            </form>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {projects.map(p => (
              <div key={p.id} className="flex items-center gap-6 p-4 border border-gray-100 group">
                <img src={p.imageUrl} className="w-16 h-16 object-cover bg-gray-50" />
                <div className="flex-1">
                  <h4 className="font-bold uppercase text-sm">{p.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase">{p.category} • {p.year} • {p.client || 'DLLD'}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { setEditingId(p.id); setFormData(p); }} className="text-[10px] font-bold uppercase underline">Edit</button>
                  <button onClick={() => onUpdateProjects(projects.filter(item => item.id !== p.id))} className="text-[10px] font-bold uppercase text-red-500 underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="max-w-2xl space-y-8">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Main Intro Text (Center)</label>
            <textarea 
              value={aboutContent.text} 
              onChange={e => onUpdateAbout({...aboutContent, text: e.target.value})}
              className="w-full border border-gray-200 p-4 h-32 focus:outline-none text-xl font-black text-center"
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-[10px] font-black uppercase mb-2">Left Description</label>
              <textarea 
                value={aboutContent.subText1} 
                onChange={e => onUpdateAbout({...aboutContent, subText1: e.target.value})}
                className="w-full border border-gray-200 p-4 h-32 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase mb-2">Right Description</label>
              <textarea 
                value={aboutContent.subText2} 
                onChange={e => onUpdateAbout({...aboutContent, subText2: e.target.value})}
                className="w-full border border-gray-200 p-4 h-32 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'growth' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {growthStats.map((stat, idx) => (
            <div key={idx} className="p-6 border border-gray-100 space-y-4">
              <input 
                type="text" 
                value={stat.subtitle} 
                onChange={e => {
                  const newStats = [...growthStats];
                  newStats[idx].subtitle = e.target.value;
                  onUpdateGrowth(newStats);
                }}
                className="w-full border-b border-gray-200 py-1 text-[10px] font-black uppercase tracking-widest focus:outline-none"
              />
              <input 
                type="text" 
                value={stat.value} 
                onChange={e => {
                  const newStats = [...growthStats];
                  newStats[idx].value = e.target.value;
                  onUpdateGrowth(newStats);
                }}
                className="w-full border-b border-gray-200 py-1 text-4xl font-black focus:outline-none"
              />
              <textarea 
                value={stat.description} 
                onChange={e => {
                  const newStats = [...growthStats];
                  newStats[idx].description = e.target.value;
                  onUpdateGrowth(newStats);
                }}
                className="w-full border-b border-gray-200 py-1 text-xs focus:outline-none h-16"
              />
            </div>
          ))}
        </div>
      )}
      
      {activeTab === 'hero' && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(heroImages).map(([cat, url]) => (
            <div key={cat} className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat}</p>
              <div 
                className="aspect-[3/4] bg-gray-50 border border-gray-100 overflow-hidden relative group cursor-pointer"
                onClick={async () => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.onchange = async (e: any) => {
                    const f = e.target.files?.[0];
                    if(f) onUpdateHeroImages({...heroImages, [cat]: await resizeImage(f, 1600)});
                  };
                  input.click();
                }}
              >
                <img src={url} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;