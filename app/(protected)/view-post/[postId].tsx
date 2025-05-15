import { View, FlatList } from "react-native";
import ItemCard from "@/components/view-post/item-card";
import { useLocalSearchParams } from "expo-router";
import { PostContext } from "@/contexts/postContext";
import useGetPostItems from "@/hooks/useGetPostItems";
import useGetPost from "@/hooks/useGetPost";
import PostHeader from "@/components/post-header";
import React, { useContext } from "react";
import { Divider, Text } from "@ui-kitten/components";
import SkeletonViewPost from "@/components/skeletons/view-post";

export default function ViewPostPage() {
    const { postItems, post } = useContext(PostContext);
    const { postId } = useLocalSearchParams();

    const { isLoading: postItemsIsLoading } = useGetPostItems(postId as string);
    const { isLoading: postIsLoading } = useGetPost(postId as string);

    const isLoading = postIsLoading || postItemsIsLoading;

    if (isLoading) {
        return <SkeletonViewPost />;
    }

    const noContent = !post || postItems.length === 0;

    if (noContent) {
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
            initialNumToRender={5}
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
        />
    );
}
