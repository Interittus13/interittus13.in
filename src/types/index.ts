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
  seoTitle?: string;
  seoDescription?: string;
  cover?: string;
  coverBlur?: {
    blurLight?: string;
    blurDark?: string;
  }
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

export interface SocialLink {
  url: string;
  icon: any;
  color: string;
  fill: string;
  border: string;
  text: string;
  shadow: string;
  id?: string;
  name?: string;
}


export interface SkillGroup {
  title: string;
  items: Skill[];
}

export interface MeConfig {
  site: string;
  name: string;
  nickname: string;
  image: string;
  email: string;
  bio: string;
  social: SocialLink[];
  overview: any[];
  skills: SkillGroup[];
  education: Education[];
  intro: {
    line1: string;
    highlight: string;
    line2: string;
  };
  titles: Record<string, string>;
  roles: string[];
  projects: {
    employee: Project[];
    freelancer: Project[];
    openSource: Project[];
    other: Project[];
  };
}

export interface Skill {
  name: string;
  icon: any;
  color: string;
}

export interface Education {
  name: string;
  degree: string;
  color: string;
  time: string;
}

export interface OpenSource {
  title: string;
  link: string;
  website: string;
  description: string;
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
  category?: string;
}

export type ThemeType = "dark" | "light";
