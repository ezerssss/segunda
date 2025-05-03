import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Text } from "@ui-kitten/components";

interface ItemCardInterface {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

interface TruncatedTextInterface {
    text: string;
    maxLength: number;
}

function TruncatedText(props: TruncatedTextInterface) {
    const { text, maxLength } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const displayedText = expanded ? text : text.slice(0, maxLength);

    return (
        <>
            <Text category="c2">{displayedText}</Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text category="label">
                    {expanded ? "See Less" : "...See More"}
                </Text>
            </TouchableOpacity>
        </>
    );
}

export default function ItemCard(props: ItemCardInterface) {
    const { name, price, description, imageUrl } = props;

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
                <View className="m-0 w-1/4 p-0">
                    <Text category="h6">PHP{price}</Text>
                    <Text category="s1">{name}</Text>
                    {!!description && (
                        <TruncatedText text={description} maxLength={20} />
                    )}
                </View>
                <View className="flex flex-row justify-between gap-2">
                    <Button
                        style={{ padding: 0 }}
                        size="small"
                        appearance="filled"
                        accessoryLeft={<Icon name="shopping-bag-outline" />}
                    >
                        Mine Now
                    </Button>
                    <Button size="small" appearance="outline">
                        Show Bidders
                    </Button>
                </View>
            </View>
        </View>
    );
}
