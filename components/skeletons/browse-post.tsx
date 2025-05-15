import { FlatList, View } from "react-native";
import SkeletonPostHeader from "./post-header";
import React from "react";
import { Divider } from "@ui-kitten/components";

export default function SkeletonBrowsePost() {
    const placeholderData: number[] = new Array(3).fill(0);

    return (
        <FlatList
            data={placeholderData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
                <React.Fragment key={item.index}>
                    <View className="flex h-[400px] w-full animate-pulse gap-1 rounded-sm">
                        <SkeletonPostHeader />
                        <View className="flex-1" />
                        <View className="m-4 mb-2 h-6 rounded-full bg-gray-200" />
                    </View>
                    <Divider className="h-1 w-full rounded-lg bg-gray-200" />
                </React.Fragment>
            )}
            contentContainerClassName="bg-white"
        />
    );
}
