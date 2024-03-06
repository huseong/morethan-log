import { TPosts, TPostStatus, TPostType } from "@/src/types"

type Options = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
}

const initialOption: Options = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}
const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(posts: TPosts, options: Options = initialOption) {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options
  const filteredPosts = posts
    // filter data
    .filter((post) => {
      if (!post.title || !post.slug) return false
      return true
    })
    // filter status
    .filter((post) => {
      return post.status && acceptStatus.includes(post.status[0])
    })
    // filter type
    .filter((post) => {
      return post.type && acceptType.includes(post.type[0])
    })
  return filteredPosts
}
