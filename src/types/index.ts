export type CategoryId =
  | 'technology'
  | 'ai-tools'
  | 'blogging-seo'
  | 'freelancing'
  | 'ecommerce'
  | 'health-fitness'
  | 'education'
  | 'travel'
  | 'home-lifestyle'
  | 'business-finance';

export interface Category {
  id: CategoryId;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  focusArea: string;
  accentColor: string;
  topics: string[];
  featuredImage: string;
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface ArticleSection {
  heading: string;
  subheadings?: {
    title: string;
    text: string;
  }[];
  paragraphs: string[];
  keyTakeaways?: string[];
  steps?: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  readTime: string;
  publishedDate: string;
  updatedDate: string;
  author: Author;
  focusKeyword: string;
  metaDescription: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  tags: string[];
  isFeatured?: boolean;
  isEditorsPick?: boolean;
  isPopular?: boolean;
  hasAffiliateDisclosure?: boolean;
  hasHealthDisclaimer?: boolean;
  hasFinancialDisclaimer?: boolean;
  introduction: string;
  sections: ArticleSection[];
  practicalTips: string[];
  faqs: ArticleFAQ[];
  conclusion: string;
  relatedArticleSlugs: string[];
}

export type PageRoute =
  | 'home'
  | 'category'
  | 'article'
  | 'about'
  | 'contact'
  | 'search'
  | 'bookmarks'
  | 'privacy-policy'
  | 'terms'
  | 'disclaimer'
  | 'affiliate-disclosure'
  | 'editorial-policy'
  | 'sitemap'
  | '404';

export interface RouteState {
  page: PageRoute;
  param?: string; // slug for category or article
  query?: string; // search query
}
