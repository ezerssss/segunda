import { View, FlatList } from "react-native";
import ItemCard from "@/components/view-post/item-card";
import { useLocalSearchParams } from "expo-router";
import useGetPostItems from "@/hooks/useGetPostItems";
import useGetPost from "@/hooks/useGetPost";
import PostHeader from "@/components/post-header";
import React, { useEffect, useRef, useState } from "react";
import { Divider, Text } from "@ui-kitten/components";
import SkeletonViewPost from "@/components/skeletons/view-post";
import { usePostStore } from "@/states/post";

export default function ViewPostPage() {
    const { postId, index } = useLocalSearchParams<{
        postId: string;
        index?: string;
    }>();
    const initialIndex = index ? parseInt(index, 10) : 0;

    const { postItems, post } = usePostStore();

    const flatListRef = useRef<FlatList>(null);
    const [itemHeights, setItemHeights] = useState<Record<number, number>>({});

    function handleSetItemHeight(index: number, height: number) {
        if (index > 3 || index < 0) {
            return;
        }

        setItemHeights((prev) => ({ ...prev, [index]: height }));
    }

    useEffect(() => {
        if (!flatListRef.current) {
            return;
        }

        const maxItemHeightsLength = Math.min(postItems.length, 4);
        if (Object.keys(itemHeights).length < maxItemHeightsLength) {
            return;
        }

        const heightsArray = Object.keys(itemHeights).map(
            (key) => itemHeights[parseInt(key)],
        );
        const aboveOffset = heightsArray.reduce(
            (accumulator, currentValue, index) => {
                if (index >= initialIndex) {
                    return accumulator;
                }

                return accumulator + currentValue;
            },
            0,
        );

        flatListRef.current?.scrollToOffset({
            offset: aboveOffset,
            animated: true,
        });
    }, [initialIndex, itemHeights, flatListRef, postItems]);

    const isPostAlreadyLoaded = post && post.id === postId;

    const { isLoading: postItemsIsLoading } = useGetPostItems(postId);
    const { isLoading: postIsLoading } = useGetPost(postId);

    const isLoading = postIsLoading || postItemsIsLoading;

    if (isLoading && !isPostAlreadyLoaded) {
        return <SkeletonViewPost />;
    }

    const noContent = !post || postItems.length === 0;

    if (noContent && !isPostAlreadyLoaded) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <Text>There are no posts currently.</Text>
            </View>
        );
    }

    const { id, sellerData, caption, tags, dateCreated } = post;
    const lastIndex = postItems.length - 1;

    return (
        <FlatList
            data={postItems}
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return (
                    <React.Fragment key={item.id}>
                        <ItemCard
                            item={item}
                            setItemHeight={handleSetItemHeight}
                        />
                        {lastIndex !== item.index && (
                            <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
                        )}
                    </React.Fragment>
                );
            }}
            ListHeaderComponent={
                <PostHeader
                    postId={id}
                    userName={sellerData.name}
                    userImageUrl={sellerData.imageUrl ?? ""}
                    caption={caption}
                    tags={tags}
                    date={dateCreated}
                    campus={sellerData.campus}
                />
            }
            contentContainerClassName="bg-white"
        />
    );
}
