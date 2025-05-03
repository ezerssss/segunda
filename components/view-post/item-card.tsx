import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Text, useTheme } from "@ui-kitten/components";
import { TruncatedText } from "../truncated-text";
import clsx from "clsx";
import { useRouter } from "expo-router";

interface ItemCardInterface {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    index: number;
}

export default function ItemCard(props: ItemCardInterface) {
    const { name, price, description, imageUrl, index } = props;
    const [isMined, setIsMined] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();
    const router = useRouter();

    function clickedMined() {
        setIsMined(!isMined);
    }

    function clickedSeeMore(expanded: boolean) {
        setIsExpanded(expanded);
    }

    function showBidders() {
        console.log("Clicked bidders!");
    }

    function navigateToFullScreen() {
        router.push(`../full-screen/${index}`);
    }

    function renderItemCard() {
        return (
            <View className="m-2 flex flex-1 rounded-lg p-0">
                <View className="aspect-square w-full overflow-hidden rounded-t-lg">
                    <Image
                        className="h-full w-full"
                        source={{
                            uri: imageUrl,
                        }}
                    />
                </View>
                <View className="flex flex-row items-center justify-between gap-1 rounded-b-lg border border-t-0 border-zinc-200 bg-slate-50 px-2 py-4">
                    <View
                        className={clsx(
                            "m-0 p-0",
                            isExpanded ? "w-1/2" : "w-1/4",
                        )}
                    >
                        <Text category="h6">PHP{price}</Text>
                        <Text category="s1">{name}</Text>
                        {!!description && (
                            <TruncatedText
                                text={description}
                                maxLength={20}
                                onToggleExpanded={clickedSeeMore}
                            />
                        )}
                    </View>
                    <View
                        className={clsx(
                            "flex justify-between gap-2",
                            isExpanded ? "flex-col" : "flex-row",
                        )}
                    >
                        <Button
                            onPress={clickedMined}
                            style={{
                                backgroundColor: isMined
                                    ? theme["color-secondary-500"]
                                    : theme["color-primary-500"],
                                borderWidth: 0,
                            }}
                            size="small"
                            appearance="filled"
                            accessoryLeft={<Icon name="shopping-bag-outline" />}
                        >
                            {isMined ? "Steal" : "Mine Now"}
                        </Button>
                        <Button
                            onPress={showBidders}
                            size="small"
                            appearance="filled"
                            status="basic"
                        >
                            Show Bidders
                        </Button>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={navigateToFullScreen}>
            {renderItemCard()}
        </TouchableOpacity>
    );
}
