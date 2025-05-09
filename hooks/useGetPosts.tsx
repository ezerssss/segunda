import { postsCollectionRef } from "@/constants/collections";
import { MAX_POSTS_PER_LOAD } from "@/constants/post";
import { PostType } from "@/types/post";
import {
    FirebaseFirestoreTypes,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function useGetPosts() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [lastPostDoc, setLastPostDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const postsQuery = query(
            postsCollectionRef,
            orderBy("dateUpdated", "desc"),
            limit(MAX_POSTS_PER_LOAD),
        );

        const unsubscribePosts = onSnapshot(
            postsQuery,
            async (postsQuerySnapshot) => {
                const docs = postsQuerySnapshot.docs;

                setHasMore(docs.length > 0);
                const fetchedPosts: PostType[] = docs.map(
                    (doc) => doc.data() as PostType,
                );

                setPosts((prevPosts) => {
                    const existingIds = new Set(
                        prevPosts.map((post) => post.id),
                    );
                    const uniqueNewPosts = fetchedPosts.filter(
                        (post) => !existingIds.has(post.id),
                    );
                    return [...uniqueNewPosts, ...prevPosts];
                });

                if (docs.length > 0) {
                    setLastPostDoc(docs[docs.length - 1]);
                }
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return unsubscribePosts;
    }, []);

    async function fetchMorePosts() {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const postsQuery = query(
                postsCollectionRef,
                orderBy("dateUpdated", "desc"),
                startAfter(lastPostDoc),
                limit(MAX_POSTS_PER_LOAD),
            );

            const postsQuerySnapshot = await getDocs(postsQuery);
            const docs = postsQuerySnapshot.docs;

            setHasMore(docs.length > 0);
            const fetchedPosts: PostType[] = docs.map(
                (doc) => doc.data() as PostType,
            );

            setPosts((prevPosts) => {
                const existingIds = new Set(prevPosts.map((post) => post.id));
                const uniqueNewPosts = fetchedPosts.filter(
                    (post) => !existingIds.has(post.id),
                );
                return [...uniqueNewPosts, ...prevPosts];
            });

            if (docs.length > 0) {
                setLastPostDoc(docs[docs.length - 1]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { posts, fetchMorePosts, isLoading };
}
