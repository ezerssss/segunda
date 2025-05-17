import { FlatList, Dimensions, View, BackHandler } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import FullScreenItemCard from "@/components/view-post/full-screen-item-card";
import { Text } from "@ui-kitten/components";
import { usePostStore } from "@/states/post";
import { useEffect } from "react";

export default function FullScreenPage() {
    const { width } = Dimensions.get("window");

    const { index } = useLocalSearchParams();
    const { postItems, post } = usePostStore();
    const initialIndex = parseInt(index[0], 10);

    useEffect(() => {
        const onBackPress = () => {
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress,
        );

        return () => backHandler.remove();
    }, []);

    if (!post || postItems.length === 0) {
        return (
            <View className="min-h-screen flex-1 items-center justify-center bg-white">
                <Text>Item not found.</Text>
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
            renderItem={({ item }) => (
                <FullScreenItemCard item={item} color="white" />
            )}
        />
    );
}
