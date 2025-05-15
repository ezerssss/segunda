import { View } from "react-native";

export default function SkeletonPostHeader() {
    return (
        <View className="w-full flex-row p-4">
            <View className="h-16 w-16 rounded-full bg-gray-200"></View>
            <View className="ml-2 items-start justify-center gap-2">
                <View className="h-3 w-48 rounded-full bg-gray-200"></View>
                <View className="h-3 w-32 rounded-full bg-gray-200"></View>
            </View>
        </View>
    );
}
