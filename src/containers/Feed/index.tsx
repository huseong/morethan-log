import { useState } from "react"

import * as Cards from "./components/cards"
import * as Lists from "./components/lists"

import {TCategories, TCategoryHierarchy, TPosts, TTags} from "@customTypes/index"
import SearchInput from "./components/SearchInput"
import { FeedHeader } from "./components/FeedHeader"
import Footer from "./components/Footer"
import {CategoryList} from "./components/lists";

type Props = {
  categories: TCategoryHierarchy
  tags: TTags
  posts: TPosts
}

const Feed: React.FC<Props> = ({ categories, tags, posts }) => {
  const [q, setQ] = useState("")

  //   .box {
  //     -ms-overflow-style: none;
  //     scrollbar-width: none;
  // }
  // .box::-webkit-scrollbar {
  //     display: none;
  // }
  return (
    <div className="block md:grid grid-cols-12 gap-6">
      <div
        className="common-no-scroll-bar sticky top-[73px] hidden lg:block col-span-2 overflow-scroll"
        style={{
          height: "calc(100vh - 73px)",
        }}
      >
        <CategoryList data={categories} />
        <Lists.TagList data={tags} />
      </div>
      <div className="col-span-12 lg:col-span-7">
        <Cards.MobileProfileCard />
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
        <Lists.TagList className="block lg:hidden" data={tags} />
        <Lists.PostList q={q} posts={posts} />
        <Footer className="block lg:hidden flex justify-center pb-8" />
      </div>
      <div
        className="common-no-scroll-bar sticky top-[73px] hidden lg:block lg:col-span-3 overflow-scroll"
        style={{
          height: "calc(100vh - 73px)",
        }}
      >
        <Cards.ProfileCard />
        <Cards.ContactCard />
        <Footer className="pt-4" />
      </div>
    </div>
  )
}

export default Feed
