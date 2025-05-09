import { ActivityIndicator, FlatList, View } from "react-native";
import PostItem from "@/components/browse-posts/post-item";
import useGetPosts from "@/hooks/useGetPosts";
import { Text } from "@ui-kitten/components";

export default function BrowsePostsPage() {
    const { posts, fetchMorePosts, isLoading } = useGetPosts();

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
            initialNumToRender={5}
            removeClippedSubviews={false}
            ListEmptyComponent={
                <View className="min-h-screen flex-1 items-center justify-center bg-white">
                    <Text>There are no posts currently.</Text>
                </View>
            }
            contentContainerClassName="bg-white"
        />
    );
}
