
export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  hoverImageUrl?: string;
  year: string;
  description?: string;
  galleryImages?: string[];
  client?: string;
  hideMainImageInDetail?: boolean;
}

export enum WorkCategory {
  Brand = 'Brand Design',
  Character = 'Character Design',
  Graphic = 'Graphic Design',
  Package = 'Package Design'
}

export type HeroImages = Record<WorkCategory, string>;
