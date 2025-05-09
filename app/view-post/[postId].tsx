import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import ItemCard from "../../components/view-post/item-card";
import { useLocalSearchParams, useRouter } from "expo-router";
import { PostContext } from "@/contexts/postContext";
import useGetPostItems from "@/hooks/useGetPostItems";
import useGetPost from "@/hooks/useGetPost";
import PostHeader from "@/components/post-header";
import { useContext } from "react";
import { Divider, Text } from "@ui-kitten/components";

export default function ViewPostPage() {
    const router = useRouter();
    const { postItems, post } = useContext(PostContext);
    const { postId } = useLocalSearchParams();

    const postItemsIsLoading = useGetPostItems(postId as string);
    const postIsLoading = useGetPost(postId as string);

    if (
        postIsLoading ||
        postItemsIsLoading ||
        !post ||
        postItems.length === 0
    ) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <ActivityIndicator />
            </View>
        );
    }

    const { id, sellerData, caption, tags, blurHashes } = post;
    const isLastIndex = postItems.length - 1;

    function navigateToFullScreen(index: number) {
        router.push(`../view-post/full-screen/${index}`);
    }

    return (
        <FlatList
            data={postItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                return (
                    <>
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => navigateToFullScreen(index)}
                        >
                            <ItemCard
                                item={item}
                                blurhash={blurHashes[index]}
                            />
                        </TouchableOpacity>
                        {index !== isLastIndex && (
                            <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
                        )}
                    </>
                );
            }}
            initialNumToRender={5}
            removeClippedSubviews={false}
            ListEmptyComponent={
                <View className="min-h-screen flex-1 items-center justify-center bg-white">
                    <Text>There are no posts currently.</Text>
                </View>
            }
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
