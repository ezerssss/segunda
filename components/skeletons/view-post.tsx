import { FlatList, View } from "react-native";
import SkeletonPostHeader from "./post-header";
import React from "react";
import { Divider } from "@ui-kitten/components";

export default function SkeletonViewPost() {
    const placeholderData: number[] = new Array(3).fill(0);

    return (
        <FlatList
            data={placeholderData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
                <React.Fragment key={item.index}>
                    <View className="w-full animate-pulse gap-1">
                        <View className="aspect-square w-full bg-gray-200" />
                        <View className="w-full flex-row gap-4 p-4">
                            <View className="h-6 flex-1 rounded-full bg-gray-200" />
                            <View className="h-6 flex-1 rounded-full bg-gray-200" />
                        </View>
                    </View>
                    <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
                </React.Fragment>
            )}
            contentContainerClassName="bg-white"
            ListHeaderComponent={
                <>
                    <SkeletonPostHeader />
                    <View className="h-24" />
                </>
            }
        />
    );
}
