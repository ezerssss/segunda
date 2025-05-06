import useGetPostItems from "@/hooks/useGetPostItems";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ItemCard from "../../components/view-post/item-card";
import { Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";

export default function ViewPostPage() {
    const router = useRouter();
    const postId = "QIVLNrekTikDeSO1yLfa";
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
                    <View className="m-2 flex flex-1 rounded-lg px-2 py-0">
                        <ItemCard item={item} />
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
