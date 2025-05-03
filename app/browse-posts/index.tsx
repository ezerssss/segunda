import { FlatList, View, ViewToken } from "react-native";
import { useEffect, useState, useCallback } from "react";
import {
    collection,
    query,
    getDocs,
    orderBy,
    limit,
    startAfter,
    onSnapshot,
    where,
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";
import { PostType } from "@/types/post";
import { Text } from "@ui-kitten/components";
import { UserDataType } from "@/types/user";
import { ItemType } from "@/types/item";
import PostContent from "@/components/browse-posts/post-content";
import PostHeader from "@/components/browse-posts/post-header";
import PostDivider from "@/components/browse-posts/post-divider";

export default function BrowsePostsPage() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [users, setUsers] = useState<UserDataType[]>([]);
    const [itemsByPost, setItemsByPost] = useState<Record<string, ItemType[]>>(
        {},
    );
    const [lastPostDoc, setLastPostDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [visiblePostIds, setVisiblePostIds] = useState<string[]>([]);
    const [itemUnsubscribers, setItemUnsubscribers] = useState<(() => void)[]>(
        [],
    );
    const pageSize = 10;

    useEffect(() => {
        setLoading(true);
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("dateUpdated", "desc"),
            limit(pageSize),
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

                    await fetchItemsForPosts(
                        fetchedPosts.map((post) => post.id),
                    );
                }
                setLoading(false);
            },
            (error) => {
                console.error(error);
                setLoading(false);
            },
        );

        return () => {
            unsubscribePosts();
            itemUnsubscribers.forEach((unsubscribe) => unsubscribe());
            setItemUnsubscribers([]);
        };
    }, []);

    async function fetchMorePosts() {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            let postsQuery = query(
                collection(db, "posts"),
                orderBy("dateUpdated", "desc"),
                startAfter(lastPostDoc),
                limit(pageSize),
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

                await fetchItemsForPosts(fetchedPosts.map((post) => post.id));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchItemsForPosts(postIds: string[]) {
        try {
            const postsToFetch = postIds.filter((id) => !itemsByPost[id]);

            if (postsToFetch.length === 0) return;

            const newItemsByPost: Record<string, ItemType[]> = {};

            for (const postId of postsToFetch) {
                newItemsByPost[postId] = [];
            }

            const itemsQuery = query(
                collection(db, "items"),
                where("isDeleted", "==", false),
            );

            const unsubscribeItems = onSnapshot(
                itemsQuery,
                (itemsQuerySnapshot) => {
                    const newItems: ItemType[] = [];
                    itemsQuerySnapshot.forEach((itemDoc) => {
                        const data = {
                            id: itemDoc.id,
                            ...itemDoc.data(),
                        } as ItemType;
                        newItems.push(data);
                    });

                    for (const postId of postsToFetch) {
                        newItemsByPost[postId] = newItems.filter(
                            (item) => item.postId === postId,
                        );
                    }

                    setItemsByPost((prev) => ({ ...prev, ...newItemsByPost }));
                },
                (error) => {
                    console.error(error);
                },
            );

            setItemUnsubscribers((prev) => [...prev, unsubscribeItems]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const usersQuery = query(collection(db, "users"));
        const unsubscribeUsers = onSnapshot(
            usersQuery,
            (usersQuerySnapshot) => {
                const fetchedUsers: UserDataType[] = [];
                usersQuerySnapshot.forEach((userDoc) => {
                    const data = { id: userDoc.id, ...userDoc.data() };
                    fetchedUsers.push(data as UserDataType);
                });
                setUsers(fetchedUsers);
            },
            (error) => {
                console.error(error);
            },
        );

        return () => unsubscribeUsers();
    }, []);

    function getUserById(userId: string) {
        return users.find((user) => user.id === userId);
    }

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            const visibleIds = viewableItems
                .map((item) => (item.item as PostType).id)
                .filter((id): id is string => id !== undefined);

            setVisiblePostIds(visibleIds);
        },
        [],
    );

    interface RenderItemProps {
        item: PostType;
        index: number;
    }

    function renderItem(props: RenderItemProps) {
        const { item: post, index } = props;
        const postUser = getUserById(post.userId);
        const postItems = itemsByPost[post.id] || [];
        const isVisible = visiblePostIds.includes(post.id);

        return (
            <>
                <View className="mb-5 flex flex-col">
                    <PostHeader
                        postId={post.id}
                        userName={postUser?.name}
                        userImageUrl={postUser?.imageUrl ?? ""}
                    />
                    <PostContent
                        post={post}
                        postItems={postItems}
                        isVisible={isVisible}
                    />
                </View>
                {index < posts.length - 1 && <PostDivider />}
            </>
        );
    }

    function renderFooter() {
        if (loading) {
            return (
                <Text className="py-2 text-center text-base text-gray-600">
                    Loading...
                </Text>
            );
        }
        if (!hasMore) {
            return (
                <Text className="py-2 text-center text-base text-gray-600">
                    No more posts to load
                </Text>
            );
        }
        return null;
    }

    return (
        <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            onEndReached={fetchMorePosts}
            onEndReachedThreshold={0.5}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 30,
                minimumViewTime: 200,
            }}
            onViewableItemsChanged={onViewableItemsChanged}
            windowSize={10}
            maxToRenderPerBatch={10}
            initialNumToRender={3}
            removeClippedSubviews={false}
            ListFooterComponent={renderFooter}
            contentContainerClassName="bg-white"
        />
    );
}
