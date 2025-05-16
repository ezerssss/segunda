import { View } from "react-native";

export default function SkeletonChatThumbnail() {
    return (
        <View className="mb-4 flex w-full flex-row items-center">
            <View className="h-16 w-16 rounded-full bg-gray-200" />
            <View className="ml-4 gap-2">
                <View className="h-3 w-40 rounded-full bg-gray-200" />
                <View className="h-3 w-80 rounded-full bg-gray-200" />
            </View>
        </View>
    );
}
