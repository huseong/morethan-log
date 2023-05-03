import React, {useEffect, useState} from 'react'
import {TCategoryHierarchy} from "@/src/types";
import {Collapse} from "@mui/material";
import {ArrowDropDown, ArrowRight} from "@mui/icons-material";
import {useRouter} from "next/router";
import {getTheme} from "@hooks/useThemeEffect";

export const CategoryComponent: React.FC<{
    categoryHierarchy: TCategoryHierarchy
    categoryName: string
    depth: number
}> = ({ categoryHierarchy, categoryName, depth }) => {
    const category = categoryHierarchy.map[categoryName]
    const isChildrenExist = category.children.length > 0
    const [isChildrenOpen, setIsChildrenOpen] = useState(isChildrenExist)
    const router = useRouter()
    const currentCategory = router.query.category || "All"

    const handleClickCategory = () => {
        if (categoryName === currentCategory) {
            router.push({
                query: {
                    ...router.query,
                    category: undefined,
                },
            })
        } else {
            router.push({
                query: {
                    ...router.query,
                    category: categoryName,
                },
            })
        }

    }

    return (
        <>
            <li
                className={`text-sm p-1 my-1 px-2 flex rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 ${
                    categoryName === currentCategory &&
                    "text-black bg-white dark:bg-zinc-700 hover:bg-white dark:hover:bg-zinc-700"
                }`}
                style={{
                    paddingLeft: `${0.5 * depth}rem`
                }}
                onClick={() => handleClickCategory()}
            >
                <div
                    className={`w-6 h-6`}
                    onClick={(event) => {
                        if (isChildrenExist) {
                            event.stopPropagation()
                            setIsChildrenOpen(!isChildrenOpen)
                        }
                    }}
                >
                    {
                        isChildrenOpen
                            ? <ArrowDropDown className={`${isChildrenExist ? 'opacity-100' : 'opacity-60'}`} />
                            : <ArrowRight className={`${isChildrenExist ? 'opacity-100' : 'opacity-60'}`} />
                    }
                </div>
                <a>{categoryName}</a>
            </li>
            <Collapse
                in={isChildrenOpen} timeout="auto" unmountOnExit>
                <ul>
                    {
                        category.children.map(name => {
                            return <CategoryComponent
                                key={name}
                                categoryHierarchy={categoryHierarchy}
                                categoryName={name}
                                depth={depth + 1}
                            />
                        })
                    }
                </ul>
            </Collapse>
        </>
    )
}
