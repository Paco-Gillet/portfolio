export interface ModrinthGalleryItem {
  url: string
  raw_url: string
  featured: boolean
  title: string
  description: string
  created: string
  ordering: number
}

export interface ModrinthProject {
  id: string
  slug: string
  project_type: string
  title: string
  description: string
  body: string
  downloads: number
  followers: number
  loaders: string[]
  game_versions: string[]
  icon_url: string
  updated?: string
  published?: string
  source_url?: string
  issues_url?: string
  discord_url?: string
  gallery: ModrinthGalleryItem[]
}
