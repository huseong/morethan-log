import {TCategory, TCategoryHierarchy, TPosts} from "@/src/types"

export function getCategoryHierarchyFromPosts(
    posts: TPosts
) {
    const hierarchy: TCategoryHierarchy = { map: {}, topLevelList: [] }
    posts.forEach(post => {
        const { categories } = post
        categories?.forEach((category, index) => {
            const key = categories?.slice(0, index + 1).join(',')
            if (hierarchy.map[key]) {
                hierarchy.map[key].count++
            } else {
                hierarchy.map[key] = {
                    name: category,
                    count: 1,
                    children: []
                }
                if (index === 0) {
                    hierarchy.topLevelList.push(category)
                }
                const prevKey = categories?.slice(0, index).join(',')
                const prev = hierarchy.map[prevKey]
                if (prev) {
                    prev.children.push(key)
                }
            }
        })
    })
    Object.values(hierarchy.map).forEach(v => v.children.sort())
    hierarchy.topLevelList.sort()
    return hierarchy
}
