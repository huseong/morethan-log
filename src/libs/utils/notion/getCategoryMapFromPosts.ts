import {TCategory, TCategoryHierarchy, TPosts} from "@/src/types"

export function getCategoryHierarchyFromPosts(
    posts: TPosts
) {
    const hierarchy: TCategoryHierarchy = { map: {}, topLevelList: [] }
    posts.forEach(post => {
        const { categories } = post
        categories?.forEach((category, index) => {
            if (hierarchy.map[category]) {
                hierarchy.map[category].count++
            } else {
                hierarchy.map[category] = {
                    count: 1,
                    children: []
                }
                if (index === 0) {
                    hierarchy.topLevelList.push(category)
                }
                const prev = hierarchy.map[categories[index - 1]]
                if (prev) {
                    prev.children.push(category)
                }
            }
        })
    })
    Object.values(hierarchy.map).forEach(v => v.children.sort())
    hierarchy.topLevelList.sort()
    return hierarchy
}
