import React, { useState, memo } from "react";
import { View, Dimensions } from "react-native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { TruncatedText } from "../truncated-text";
import { ItemType } from "@/types/item";
import { Image } from "expo-image";
import { Zoomable } from "@likashefqet/react-native-image-zoom";

interface PropsInterface {
    item: ItemType;
    color?: string;
    blurhash: string;
}

export function FullScreenItemCard(props: PropsInterface) {
    const { height, width } = Dimensions.get("window");

    const { item, color = "black", blurhash } = props;
    const { name, price, description, imageUrl } = item;
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
        <View
            className="relative flex gap-2"
            style={{ width, height, backgroundColor: "black" }}
        >
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
                    placeholder={{ blurhash }}
                    style={{
                        width,
                        aspectRatio: 1 / 1,
                    }}
                />
            </Zoomable>

            <View
                className="absolute inset-y-0 bottom-0 left-0 right-0 z-10 w-full"
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
            </View>
        </View>
    );
}

export default memo(FullScreenItemCard);
