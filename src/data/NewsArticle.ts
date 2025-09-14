/**
 * Interface for a news article
 */
export interface NewsArticle {
  id: string
  slug: string
  title: string
  previewText?: string|undefined
  content: string
  createdAt: string
  createdBy: string
  heroImage?: string|undefined
  isArchived: boolean
  isFeatured: boolean
}
