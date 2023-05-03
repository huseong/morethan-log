export type TPostStatus = "Private" | "Public" | "PublicOnDetail"
export type TPostType = "Post" | "Paper" | "Page"

export type TPost = {
  id: string
  date: { start_date: string }
  type: TPostType[]
  slug: string
  tags?: string[]
  categories?: string[]
  summary?: string
  author?: {
    id: string
    name: string
    profile_photo?: string
  }[]
  title: string
  status: TPostStatus[]
  createdTime: string
  fullWidth: boolean
  thumbnail?: string
}

export type TPosts = TPost[]

export type TTags = {
  [tagName: string]: number
}
export type TCategories = {
  [category: string]: number
}
export type TCategory = {
  name: string,
  children: string[],
  count: number
}
export type TCategoryHierarchy = {
  map: { [name: string]: { count: number, children: string[] } },
  topLevelList: string[]
}

export type ThemeType = "dark" | "light"
