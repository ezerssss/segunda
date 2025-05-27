import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Icon } from "@ui-kitten/components";

interface PropsInterface {
    title?: string;
    backgroundColor?: string;
}

export default function Back(props: PropsInterface) {
    const { title, backgroundColor = "white" } = props;

    return (
        <View
            className={`absolute left-0 right-0 top-0 z-10 flex w-full flex-row items-center justify-between bg-${backgroundColor} px-2 py-3`}
        >
            <TouchableOpacity onPress={router.back}>
                <Icon name="close-outline" width={30} height={30} />
            </TouchableOpacity>
            <Text className="text-[20px] font-medium">{title}</Text>
            <View></View>
        </View>
    );
}
