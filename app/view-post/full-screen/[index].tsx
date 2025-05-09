import { FlatList, Dimensions, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PostContext } from "@/contexts/postContext";
import FullScreenItemCard from "@/components/view-post/full-screen-item-card";
import { useContext } from "react";

export default function FullScreenPage() {
    const { width } = Dimensions.get("window");

    const { index } = useLocalSearchParams();
    const { postItems, post } = useContext(PostContext);
    const initialIndex = parseInt(index[0], 10);

    if (!postItems || !post || postItems.length === 0) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <FlatList
            data={postItems}
            horizontal
            pagingEnabled
            initialScrollIndex={initialIndex}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            getItemLayout={(_, index) => ({
                length: width,
                offset: width * index,
                index,
            })}
            renderItem={({ item, index }) => (
                <FullScreenItemCard
                    item={item}
                    color="white"
                    blurhash={post.blurHashes[index]}
                />
            )}
        />
    );
}
