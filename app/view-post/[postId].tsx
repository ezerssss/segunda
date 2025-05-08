import {
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import ItemCard from "../../components/view-post/item-card";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePostContext } from "@/contexts/postContext";
import useGetPostItems from "@/hooks/useGetPostItems";
import useGetPost from "@/hooks/useGetPost";
import PostHeader from "@/components/post-header";
import { Text } from "@ui-kitten/components";
import { TruncatedText } from "@/components/truncated-text";

export default function ViewPostPage() {
    const router = useRouter();
    const { postItems, post } = usePostContext();
    const { postId } = useLocalSearchParams();

    useGetPostItems(postId as string);
    useGetPost(postId as string);

    if (Object.keys(post).length === 0 || Object.keys(postItems).length === 0) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <ActivityIndicator />
            </View>
        );
    }

    const { id, sellerData, caption, tags } = post;

    function navigateToFullScreen(index: number) {
        router.push(`../view-post/full-screen/${index}`);
    }

    return (
        <ScrollView>
            <PostHeader
                postId={id}
                userName={sellerData.name}
                userImageUrl={sellerData.imageUrl ?? ""}
            />
            <View className="w-full px-2">
                <TruncatedText text={caption} />
                <View className="mb-2 mt-1 flex-row flex-wrap gap-1">
                    {tags.map((tag) => (
                        <Text key={tag} className="text-[blue]">
                            #{tag}
                        </Text>
                    ))}
                </View>
            </View>
            {postItems.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigateToFullScreen(index)}
                    >
                        <ItemCard item={item} />
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
