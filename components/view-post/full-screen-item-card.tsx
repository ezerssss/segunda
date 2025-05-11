import React, { useState, memo } from "react";
import { View } from "react-native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { TruncatedText } from "../truncated-text";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";

interface PropsInterface {
    item: ItemType;
    color?: string;
}

export function FullScreenItemCard(props: PropsInterface) {
    const { item, color = "black" } = props;
    const { name, price, description, imageUrl, blurHash } = item;
    const [isMined, setIsMined] = useState(false);
    const theme = useTheme();
    const confirmed = false; // placeholder for confirmedBidder

    function clickedMined() {
        setIsMined(!isMined);
    }

    function showBidders() {
        console.log("Clicked bidders!");
    }

    return (
        <View className="relative flex h-screen w-screen bg-black">
            <Zoomable
                isDoubleTapEnabled
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    contentFit="cover"
                    source={{
                        uri: imageUrl,
                    }}
                    placeholder={{ blurHash }}
                    className="aspect-square w-full"
                />
            </Zoomable>

            <View
                className="absolute bottom-0 left-0 right-0 z-10 w-full"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
            >
                <View className="m-0 px-4 pb-0 pt-2">
                    {confirmed && (
                        <Text category="h6" style={{ color }}>
                            Sold to: name
                        </Text>
                    )}
                    <Text category="h6" style={{ color }}>
                        PHP{price}
                    </Text>
                    <Text style={{ color }}>{name}</Text>
                    {!!description && (
                        <TruncatedText text={description} color={color} />
                    )}
                </View>
                <View className="flex flex-row justify-between gap-2 px-2 py-4">
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
            </View>
        </View>
    );
}

export default memo(FullScreenItemCard);
