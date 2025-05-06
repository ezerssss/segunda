import { FlatList, Dimensions, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { usePostContext } from "@/contexts/postContext";
import ItemCard from "@/components/view-post/item-card";

export default function FullScreenPage() {
    const { width } = Dimensions.get("window");

    const { index } = useLocalSearchParams();
    const { postItems } = usePostContext();
    const initialIndex = parseInt(index[0], 10);

    if (!postItems || postItems.length === 0) {
        return <Text>Loading...</Text>;
    }

    return (
        <FlatList
            data={postItems}
            contentContainerStyle={{
                padding: 0,
                margin: 0,
                backgroundColor: "black",
                alignItems: "center",
            }}
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
                <View
                    className="flex gap-2"
                    style={{
                        width,
                    }}
                >
                    <ItemCard item={item} color="white" />
                </View>
            )}
        />
    );
}
