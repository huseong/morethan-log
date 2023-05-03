import {TCategoryHierarchy, TTags} from "@customTypes/index"
import { useRouter } from "next/router"
import React from "react"
import {CategoryComponent} from "@containers/Feed/components/lists/Category/CategoryComponent";

type Props = {
    className?: string
    data: TCategoryHierarchy
}

const NewCategoryList: React.FC<Props> = ({ className, data }) => {
    const router = useRouter()
    const currentTag = router.query.tag || "All"

    return (
        <div className={className}>
            <div
                className="hidden lg:block p-1 mb-3 dark:text-white"
            >
                📁 Categories
            </div>
            <ul className="cursor-pointer gap-1 flex mobile-x-scroll lg:block mb-6">
                {
                    data.topLevelList.map(name => {
                        return <CategoryComponent
                            key={name}
                            categoryHierarchy={data}
                            categoryName={name}
                            depth={1}
                        />
                    })
                }
            </ul>
        </div>
    )
}

export { NewCategoryList }
