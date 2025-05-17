import { View, FlatList } from "react-native";

export default function SkeletonChatList() {
    const placeholderData = new Array(12).fill(0);

    return (
        <FlatList
            data={placeholderData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
                <View
                    className="mb-4 flex w-full flex-row items-center"
                    key={"skeleton-chat-thumbnail" + item.index}
                >
                    <View className="h-16 w-16 rounded-full bg-gray-200" />
                    <View className="ml-4 gap-2">
                        <View className="h-3 w-40 rounded-full bg-gray-200" />
                        <View className="h-3 w-80 rounded-full bg-gray-200" />
                    </View>
                </View>
            )}
            contentContainerClassName="bg-white m-4"
        />
    );
}
