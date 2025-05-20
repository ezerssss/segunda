import React, { memo } from "react";
import { View, Pressable } from "react-native";
import { Text } from "@ui-kitten/components";
import { TruncatedText } from "../truncated-text";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import ActionButtons from "../action-buttons/action-buttons";

interface PropsInterface {
    item: ItemType;
    color?: string;
}

export function ItemCard(props: PropsInterface) {
    const { item, color = "black" } = props;
    const { name, price, description, imageUrl, blurHash, index } = item;
    const router = useRouter();

    function navigateToFullScreen(index: number) {
        router.push(`/(protected)/view-post/full-screen/${index}`);
    }

    return (
        <Pressable onPress={() => navigateToFullScreen(index)}>
            <View className="aspect-square w-full items-center justify-center overflow-hidden">
                <Image
                    className="h-full w-full"
                    source={{
                        uri: imageUrl,
                    }}
                    placeholder={{ blurhash: blurHash }}
                />
            </View>
            <View className="m-0 w-full px-4 pb-0 pt-2">
                {!!item.confirmedBidder && (
                    <Text category="h6" style={{ color }}>
                        Sold to: {item.confirmedBidder.bidderData.name}
                    </Text>
                )}
                <Text category="h6" style={{ color }}>
                    PHP{price}
                </Text>
                <Text category="s1" style={{ color }}>
                    {name}
                </Text>
                {!!description && (
                    <TruncatedText text={description} color={color} />
                )}
            </View>
            <View className="flex flex-row justify-between gap-2 px-4 py-2">
                <ActionButtons item={item} />
            </View>
        </Pressable>
    );
}

export default memo(ItemCard);
