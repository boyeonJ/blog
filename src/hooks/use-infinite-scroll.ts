import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Post } from "../models/types";

const MAX_NUMBER = 5;

const useInfiniteScroll = (
    selectedCategory: string,
    posts: Post[],
) => {
    const [count, setCount] = useState<number>(1);
    let observer: IntersectionObserver | null;

    const postsByCategory = useMemo(
        () =>
            posts
                .sort((a, b) =>
                    new Date(b.node.frontmatter.date).getTime() - new Date(a.node.frontmatter.date).getTime())
                .filter(({ node: { frontmatter: { categories } } }: Post) =>
                    categories.includes('Private') ? false :
                        selectedCategory !== 'All'
                            ? categories.includes(selectedCategory)
                            : true
                ),
        [selectedCategory],
    )

    const containerRef: MutableRefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(
        null,
    )


    useEffect(() => {
        observer = new IntersectionObserver(
            (entries, observer) => {
                if (!entries[0].isIntersecting) return;

                setCount(value => value + 1);
                observer.disconnect();
            },
        )
    }, [])

    useEffect(() => {
        if (
            MAX_NUMBER * count >= postsByCategory.length ||
            containerRef.current === null ||
            containerRef.current.children.length === 0
        )
            return

        observer?.observe(
            containerRef.current.children[containerRef.current.children.length - 1],
        )
    }, [count, selectedCategory])

    return { containerRef, slicedPosts: postsByCategory.slice(0, count * MAX_NUMBER) }
}

export default useInfiniteScroll;