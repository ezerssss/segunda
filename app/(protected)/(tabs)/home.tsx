import { ActivityIndicator, FlatList, View } from "react-native";
import PostItem from "@/components/browse-posts/post-item";
import useGetPosts from "@/hooks/useGetPosts";
import { Text } from "@ui-kitten/components";
import { MAX_POSTS_PER_LOAD } from "@/constants/post";

export default function BrowsePostsPage() {
    const { posts, fetchMorePosts, isLoading, hasMore } = useGetPosts();

    if (isLoading && posts.length === 0) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                const isLast = index === posts.length - 1;
                return <PostItem key={item.id} post={item} isLast={isLast} />;
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
                    <View className="w-full items-center justify-center py-2">
                        <ActivityIndicator />
                    </View>
                ) : (
                    <></>
                )
            }
            contentContainerClassName="bg-white"
        />
    );
}
