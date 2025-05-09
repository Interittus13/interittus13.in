export type TPostStatus = "Private" | "Public";

export type TPost = {
  id: string;
  date: { start_date: string };
  slug: string;
  tags?: string[];
  category?: string[];
  summary?: string;
  title: string;
  status: TPostStatus[];
  createdTime: string;
  fullWidth: boolean;
  thumbnail?: string;
  cover?: string;
};

export type TPosts = TPost[];

export type TTags = {
  [tagName: string]: number;
};

export type TagCardProps = {
  name: string;
  color: string;
  count: number;
};

export type TCategories = { [category: string]: number };
export type CategoriesProps = { categories: TCategories };
export type CategoryCardProps = { name: string; color: string; count: number };

export interface SocialLinks {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  shadow: string;
}

export interface Location {
  name: string;
  map: { light: string; dark: string };
}

export interface MeConfig {
  name: string;
  image: string;
  location: Location;
  social: SocialLinks[];
  skills: Skill[][];
  education: Education[];
  openSources: OpenSource[];
  projects: Project[];
}

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Education {
  name: string;
  degree: string;
  color: string;
}

export interface OpenSource {
  title: string;
  link: string;
  website: string;
  description: string;
  // authors: { name: string; me?: boolean }[];
  tags: { name: string; color: string }[];
}

export interface Project {
  name: string;
  description: string;
  link: string;
  image?: string;
  logo: { light: string; dark: string };
  video?: string;
  tip?: string;
  tags?: string[];
  spotlight?: boolean;
}

export type ThemeType = "dark" | "light";
