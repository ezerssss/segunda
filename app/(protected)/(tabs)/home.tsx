import { ActivityIndicator, FlatList, View } from "react-native";
import PostItem from "@/components/browse-posts/post-item";
import useGetPosts from "@/hooks/useGetPosts";
import { Icon, Text, useTheme } from "@ui-kitten/components";
import { MAX_POSTS_PER_LOAD } from "@/constants/post";
import SkeletonBrowsePost from "@/components/skeletons/browse-post";
import SellerFormBar from "@/components/seller-form-bar";
import React from "react";

export default function BrowsePostsPage() {
    const { posts, fetchMorePosts, isLoading, hasMore } = useGetPosts();
    const theme = useTheme();

    if (isLoading && posts.length === 0) {
        return <SkeletonBrowsePost />;
    }

    return (
        <FlatList
            ListHeaderComponent={<SellerFormBar />}
            data={posts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <PostItem key={item.id} post={item} />;
            }}
            onEndReached={fetchMorePosts}
            initialNumToRender={MAX_POSTS_PER_LOAD}
            ListEmptyComponent={
                <View className="min-h-screen flex-1 items-center justify-center bg-white">
                    <Text>There are no posts currently.</Text>
                </View>
            }
            ListFooterComponent={
                hasMore ? (
                    <View className="h-24 w-full items-center justify-center py-2">
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View className="flex h-24 items-center justify-center gap-1">
                        <Icon
                            name="checkmark-circle-2-outline"
                            fill={theme["color-primary-500"]}
                        />
                        <Text>You're all caught up with sellers</Text>
                    </View>
                )
            }
            contentContainerClassName="bg-white"
        />
    );
}
