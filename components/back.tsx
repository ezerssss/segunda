import { View, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Text, Icon } from "@ui-kitten/components";

interface PropsInterface {
    title: string;
}

export default function Back(props: PropsInterface) {
    const { title } = props;

    return (
        <View className="flex w-full flex-row items-center justify-between px-3">
            <TouchableOpacity onPress={router.back}>
                <Icon name="arrow-ios-back-outline" />
            </TouchableOpacity>
            <Text category="h6">{title}</Text>
            <View></View>
        </View>
    );
}
