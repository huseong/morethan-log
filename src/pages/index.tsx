import {
  getAllSelectItemsFromPosts,
  filterPosts,
} from "@/src/libs/utils/notion"
import Layout from "@components/Layout"
import Feed from "@containers/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "./_app"
import {TCategories, TCategoryHierarchy, TPosts, TTags} from "../types"
import { getPosts } from "../libs/apis"
import { DEFAULT_CATEGORY } from "../constants"
import {getCategoryHierarchyFromPosts} from "@libs/utils/notion/getCategoryMapFromPosts";

export async function getStaticProps() {
  try {
    const posts = await getPosts()
    console.log(posts.length)
    console.log(posts.filter(post => post.title.includes('API')))
    const filteredPost = filterPosts(posts)
    const tags = getAllSelectItemsFromPosts("tags", filteredPost)
    const categories = getCategoryHierarchyFromPosts(filteredPost)

    return {
      props: {
        tags: {
          ...tags,
        },
        categories: {
          [DEFAULT_CATEGORY]: filteredPost.length,
          ...categories,
        },
        posts: filteredPost,
      },
      revalidate: 1,
    }
  } catch (error) {
    throw error
  }
}

type Props = {
  categories: TCategoryHierarchy
  tags: TTags
  posts: TPosts
}

const FeedPage: NextPageWithLayout<Props> = ({ categories, tags, posts }) => {
  return <Feed categories={categories} tags={tags} posts={posts} />
}

FeedPage.getLayout = function getlayout(page) {
  return (
    <Layout
      metaConfig={{
        title: CONFIG.blog.title,
        description: CONFIG.blog.description,
        type: "website",
        url: CONFIG.link,
      }}
    >
      {page}
    </Layout>
  )
}

export default FeedPage
