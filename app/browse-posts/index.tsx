import { ActivityIndicator, FlatList, View } from "react-native";
import PostItem from "@/components/browse-posts/post-item";
import useGetPosts from "@/hooks/useGetPosts";

export default function BrowsePostsPage() {
    const { posts, fetchMorePosts } = useGetPosts();

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
                    <ActivityIndicator />
                </View>
            }
            contentContainerClassName="bg-white"
        />
    );
}
