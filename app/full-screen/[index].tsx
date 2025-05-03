import React, { useState } from "react";
import { View, FlatList, Image, Dimensions } from "react-native";
import { Text, Button, Icon, useTheme } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import { usePostContext } from "@/contexts/postContext";
import { TruncatedText } from "@/components/truncated-text";

const { width } = Dimensions.get("window");

export default function FullScreenPage() {
    const { index } = useLocalSearchParams();
    const { postItems } = usePostContext();
    const initialIndex = parseInt(index[0], 10);
    const [isMined, setIsMined] = useState(false);
    const theme = useTheme();
    const confirmed = false; // placeholder for confirmedBidder

    function clickedMined() {
        setIsMined(!isMined);
    }

    function showBidders() {
        console.log("Clicked bidders!");
    }

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
                    <View className="aspect-square w-full items-center justify-center overflow-hidden">
                        <Image
                            className="h-full w-full"
                            source={{
                                uri: item.imageUrl,
                            }}
                        />
                    </View>
                    <View className="m-0 w-full px-4 pb-0 pt-2">
                        {confirmed && (
                            <Text category="h6" style={{ color: "white" }}>
                                Sold to: name
                            </Text>
                        )}
                        <Text category="h6" style={{ color: "white" }}>
                            PHP{item.price}
                        </Text>
                        <Text category="s1" style={{ color: "white" }}>
                            {item.name}
                        </Text>
                        {!!item.description && (
                            <TruncatedText
                                text={item.description}
                                maxLength={125}
                                color="white"
                            />
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
                                accessoryLeft={
                                    <Icon name="shopping-bag-outline" />
                                }
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
            )}
        />
    );
}
