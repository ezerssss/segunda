import { postsCollectionRef } from "@/constants/collections";
import { MAX_POSTS_PER_LOAD } from "@/constants/post";
import { useUserStore } from "@/states/user";
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
    const { user } = useUserStore();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [lastPostDoc, setLastPostDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!user) return;

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

                setHasMore(docs.length === MAX_POSTS_PER_LOAD);
                const newPosts: PostType[] = docs.map(
                    (doc) => doc.data() as PostType,
                );
                const newPostIds = new Set(newPosts.map((post) => post.id));

                setPosts((prevPosts) => {
                    const outdatedPosts = prevPosts.filter(
                        (post) => !newPostIds.has(post.id),
                    );
                    return [...newPosts, ...outdatedPosts];
                });

                if (docs.length > 0) {
                    // Don't update lastDoc if it's not undefined (user has scrolled past the live update zone already)
                    setLastPostDoc((prevData) => {
                        if (prevData) return prevData;
                        return docs[docs.length - 1];
                    });
                }
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return unsubscribePosts;
    }, [user]);

    async function fetchMorePosts() {
        if (isLoading || !hasMore || !lastPostDoc) return;

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

            setHasMore(docs.length === MAX_POSTS_PER_LOAD);
            const newPosts: PostType[] = docs.map(
                (doc) => doc.data() as PostType,
            );
            const newPostIds = new Set(newPosts.map((post) => post.id));

            setPosts((prevPosts) => {
                const outDatedPosts = prevPosts.filter(
                    (post) => !newPostIds.has(post.id),
                );
                return [...outDatedPosts, ...newPosts];
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

    return { posts, fetchMorePosts, isLoading, hasMore };
}
