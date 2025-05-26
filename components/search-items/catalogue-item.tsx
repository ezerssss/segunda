import { ItemType } from "@/types/item";
import { Card, Text } from "@ui-kitten/components";
import { Image } from "expo-image";
import { View } from "react-native";
import { memo } from "react";
import { router } from "expo-router";
import useResetStore from "@/hooks/useResetStore";

interface CatalogueItemProps {
    item: ItemType;
}

function CatalogueItem(props: Readonly<CatalogueItemProps>) {
    const { item } = props;
    const { name, price, description, imageUrl, blurHash, postId } = item;
    const { resetPostStore } = useResetStore();

    function navigateToPost() {
        resetPostStore();
        router.push(`/(protected)/view-post/${postId}?index=${item.index}`);
    }

    return (
        <Card
            className="max-w-[49%] flex-1 self-start"
            onPress={navigateToPost}
            header={
                <Image
                    source={{ uri: imageUrl }}
                    className="aspect-square"
                    contentFit="cover"
                    placeholder={{ blurhash: blurHash }}
                    placeholderContentFit="cover"
                />
            }
        >
            <View className="w-full px-2">
                <Text category="h6">₱{price}</Text>
                <Text category="s1" numberOfLines={1} ellipsizeMode="tail">
                    {name}
                </Text>
                <Text category="c1" numberOfLines={1} ellipsizeMode="tail">
                    {description}
                </Text>
            </View>
        </Card>
    );
}

export default memo(CatalogueItem);
