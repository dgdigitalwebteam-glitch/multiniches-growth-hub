import { Article, CategoryId } from '../../types';
import { techArticles } from './tech';
import { aiArticles } from './ai';
import { bloggingArticles } from './blogging';
import { freelancingArticles } from './freelancing';
import { ecommerceArticles } from './ecommerce';
import { healthArticles } from './health';
import { educationArticles } from './education';
import { travelArticles } from './travel';
import { homeArticles } from './home';
import { businessArticles } from './business';

export const ALL_ARTICLES: Article[] = [
  ...techArticles,
  ...aiArticles,
  ...bloggingArticles,
  ...freelancingArticles,
  ...ecommerceArticles,
  ...healthArticles,
  ...educationArticles,
  ...travelArticles,
  ...homeArticles,
  ...businessArticles,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find(
    (a) => a.slug.toLowerCase() === slug.toLowerCase() || a.id.toLowerCase() === slug.toLowerCase()
  );
}

export function getArticlesByCategory(categoryId: CategoryId): Article[] {
  return ALL_ARTICLES.filter((a) => a.category === categoryId);
}

export function getFeaturedArticles(): Article[] {
  return ALL_ARTICLES.filter((a) => a.isFeatured);
}

export function getEditorsPicks(): Article[] {
  return ALL_ARTICLES.filter((a) => a.isEditorsPick);
}

export function getPopularArticles(): Article[] {
  return ALL_ARTICLES.filter((a) => a.isPopular);
}

export function getRelatedArticles(slug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return ALL_ARTICLES.slice(0, limit);

  // First check specific relatedArticleSlugs
  const explicitRelated = current.relatedArticleSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is Article => a !== undefined);

  if (explicitRelated.length >= limit) {
    return explicitRelated.slice(0, limit);
  }

  // Fallback to same category
  const sameCategory = ALL_ARTICLES.filter(
    (a) => a.category === current.category && a.slug !== current.slug && !explicitRelated.some((er) => er.slug === a.slug)
  );

  return [...explicitRelated, ...sameCategory].slice(0, limit);
}

export function searchArticles(query: string, categoryId?: CategoryId | 'all'): Article[] {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery && (!categoryId || categoryId === 'all')) {
    return ALL_ARTICLES;
  }

  return ALL_ARTICLES.filter((article) => {
    const matchesCategory = !categoryId || categoryId === 'all' || article.category === categoryId;
    if (!matchesCategory) return false;
    if (!cleanQuery) return true;

    const inTitle = article.title.toLowerCase().includes(cleanQuery);
    const inExcerpt = article.excerpt.toLowerCase().includes(cleanQuery);
    const inTags = article.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
    const inKeyword = article.focusKeyword.toLowerCase().includes(cleanQuery);
    const inAuthor = article.author.name.toLowerCase().includes(cleanQuery);

    return inTitle || inExcerpt || inTags || inKeyword || inAuthor;
  });
}
