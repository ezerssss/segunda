import React, { useState, memo } from "react";
import { View, Pressable } from "react-native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { TruncatedText } from "../truncated-text";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

interface PropsInterface {
    item: ItemType;
    color?: string;
}

export function ItemCard(props: PropsInterface) {
    const { item, color = "black" } = props;
    const { name, price, description, imageUrl, blurHash, index } = item;
    const [isMined, setIsMined] = useState(false);
    const theme = useTheme();
    const router = useRouter();

    const confirmed = false; // placeholder for confirmedBidder

    function clickedMined() {
        setIsMined(!isMined);
    }

    function showBidders() {
        console.log("Clicked bidders!");
    }

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
                    placeholder={{ blurHash }}
                />
            </View>
            <View className="m-0 w-full px-4 pb-0 pt-2">
                {confirmed && (
                    <Text category="h6" style={{ color }}>
                        Sold to: name
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
                {!confirmed && (
                    <Button
                        onPress={clickedMined}
                        style={{
                            backgroundColor: isMined
                                ? theme["color-secondary-500"]
                                : theme["color-primary-500"],
                            borderWidth: 0,
                            flex: 1,
                        }}
                        size="small"
                        appearance="filled"
                        accessoryLeft={<Icon name="shopping-bag-outline" />}
                    >
                        {isMined ? "Steal" : "Mine Now"}
                    </Button>
                )}
                <Button
                    onPress={showBidders}
                    size="small"
                    appearance="filled"
                    status="basic"
                    style={{
                        flex: 1,
                    }}
                >
                    Show Bidders
                </Button>
            </View>
        </Pressable>
    );
}

export default memo(ItemCard);
