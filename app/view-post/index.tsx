import useGetPostItems from "@/hooks/useGetPostItems";
import { ScrollView, TouchableOpacity } from "react-native";
import ItemCard from "../../components/view-post/item-card";
import { Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";

export default function ViewPostPage() {
    const router = useRouter();
    const postId = "QXtVp1f7BerOwqJzAe2Z";
    const postItems = useGetPostItems(postId);
    const sortedItems = postItems.sort((a, b) => a.index - b.index);

    function navigateToFullScreen(index: number) {
        router.push(`../view-post/full-screen/${index}`);
    }

    return (
        <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            {(!postItems || postItems.length === 0) && (
                <Text>No items available.</Text>
            )}
            {sortedItems.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => navigateToFullScreen(item.index)}
                >
                    <ItemCard item={item} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
