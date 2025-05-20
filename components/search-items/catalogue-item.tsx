import { ItemType } from "@/types/item";
import { Card, Text } from "@ui-kitten/components";
import { Image } from "expo-image";
import { View } from "react-native";
import { TruncatedText } from "../truncated-text";

interface CatalogueItemProps {
    item: ItemType;
}

export default function CatalogueItem(props: Readonly<CatalogueItemProps>) {
    const { item } = props;
    const { name, price, description, imageUrl, blurHash } = item;

    return (
        <Card
            className="max-w-[49%] self-start"
            style={{ flex: 0.5 }}
            onPress={() => {
                console.log(item.id);
            }}
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
                <Text category="h6">PHP{price}</Text>
                <Text category="s1" numberOfLines={1} ellipsizeMode="tail">
                    {name}
                </Text>
                {!!description && <TruncatedText text={description} />}
            </View>
        </Card>
    );
}
