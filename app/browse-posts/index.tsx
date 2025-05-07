import { FlatList, ViewToken } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";
import { PostType } from "@/types/post";
import BrowserFooter from "@/components/browse-posts/browse-footer";
import PostItem from "@/components/browse-posts/post-item";
import { MAX_POSTS_PER_LOAD } from "@/constants/post";

export default function BrowsePostsPage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [lastPostDoc, setLastPostDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [visiblePostIds, setVisiblePostIds] = useState<string[]>([]);
    const [loadedPostIds, setLoadedPostIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        setIsLoading(true);
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("dateUpdated", "desc"),
            limit(MAX_POSTS_PER_LOAD),
        );

        const unsubscribePosts = onSnapshot(
            postsQuery,
            async (postsQuerySnapshot) => {
                const docs = postsQuerySnapshot.docs;

                if (docs.length === 0) {
                    setHasMore(false);
                } else {
                    const fetchedPosts: PostType[] = docs.map(
                        (doc) =>
                            ({
                                id: doc.id,
                                ...doc.data(),
                            }) as PostType,
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

                    setLastPostDoc(docs[docs.length - 1]);
                }
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return () => {
            unsubscribePosts();
        };
    }, []);

    async function fetchMorePosts() {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            let postsQuery = query(
                collection(db, "posts"),
                orderBy("dateUpdated", "desc"),
                startAfter(lastPostDoc),
                limit(MAX_POSTS_PER_LOAD),
            );

            const postsQuerySnapshot = await getDocs(postsQuery);
            const docs = postsQuerySnapshot.docs;

            if (docs.length === 0) {
                setHasMore(false);
            } else {
                const fetchedPosts: PostType[] = docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as PostType,
                );

                setPosts((prevPosts) => {
                    const existingIds = new Set(
                        prevPosts.map((post) => post.id),
                    );
                    const uniqueNewPosts = fetchedPosts.filter(
                        (post) => !existingIds.has(post.id),
                    );
                    return [...prevPosts, ...uniqueNewPosts];
                });

                setLastPostDoc(docs[docs.length - 1]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            const nowVisible = viewableItems.map((v) => v.item.id);
            setVisiblePostIds(nowVisible);
            setLoadedPostIds((prev) => {
                const next = new Set(prev);
                nowVisible.forEach((id) => next.add(id));
                return next;
            });
        },
        [],
    );

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                const isVisible = visiblePostIds.includes(item.id);
                const hasLoadedBefore = loadedPostIds.has(item.id);
                const isLast = index === posts.length - 1;
                return (
                    <PostItem
                        key={item.id}
                        post={item}
                        isVisible={isVisible}
                        userName={item.sellerData?.name}
                        userImageUrl={item.sellerData?.imageUrl ?? ""}
                        isLast={isLast}
                        hasLoadedBefore={hasLoadedBefore}
                    />
                );
            }}
            extraData={visiblePostIds}
            onEndReached={fetchMorePosts}
            onEndReachedThreshold={0.5}
            viewabilityConfig={{
                viewAreaCoveragePercentThreshold: 30,
                minimumViewTime: 200,
            }}
            onViewableItemsChanged={onViewableItemsChanged}
            windowSize={15}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews={true}
            ListFooterComponent={
                <BrowserFooter isLoading={isLoading} hasMore={hasMore} />
            }
            contentContainerClassName="bg-white"
        />
    );
}
