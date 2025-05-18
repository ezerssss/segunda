import { View, FlatList } from "react-native";
import ItemCard from "@/components/view-post/item-card";
import { useLocalSearchParams } from "expo-router";
import useGetPostItems from "@/hooks/useGetPostItems";
import useGetPost from "@/hooks/useGetPost";
import PostHeader from "@/components/post-header";
import React, { useRef } from "react";
import { Divider, Text } from "@ui-kitten/components";
import SkeletonViewPost from "@/components/skeletons/view-post";
import { usePostStore } from "@/states/post";

export default function ViewPostPage() {
    const { postItems, post, scrollPosition, setScrollPosition } =
        usePostStore();
    const { postId } = useLocalSearchParams();

    const flatListRef = useRef<FlatList>(null);

    function scrollToPreviousPosition() {
        flatListRef.current?.scrollToOffset({
            offset: scrollPosition,
            animated: false,
        });
    }

    const isPostAlreadyLoaded = post && post.id === postId;

    const { isLoading: postItemsIsLoading } = useGetPostItems(postId as string);
    const { isLoading: postIsLoading } = useGetPost(postId as string);

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

    const { id, sellerData, caption, tags } = post;
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
                        <ItemCard item={item} />
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
                />
            }
            contentContainerClassName="bg-white"
            onScroll={(event) =>
                setScrollPosition(event.nativeEvent.contentOffset.y)
            }
            onLayout={scrollToPreviousPosition}
            onContentSizeChange={scrollToPreviousPosition}
        />
    );
}
