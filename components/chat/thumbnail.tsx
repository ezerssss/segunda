import { View } from "react-native";
import { Text, Avatar, useTheme } from "@ui-kitten/components";

interface PropsInterface {
    senderName: string;
    senderImageUrl?: string; // should be required later on
    lastMessageName: string;
    lastMessage: string;
    isSeller: boolean;
}

export default function ChatThumbnail(props: PropsInterface) {
    const {
        senderName,
        senderImageUrl = "https://th.bing.com/th/id/OIP.QwmYgdzR4D8-6QzPKhyOxwAAAA?cb=iwp2&rs=1&pid=ImgDetMain",
        lastMessageName,
        lastMessage,
        isSeller = false,
    } = props;
    const theme = useTheme();

    return (
        <View className="mb-4 flex w-full flex-row items-center gap-4">
            <View className="relative">
                <Avatar
                    size="giant"
                    source={{
                        uri: senderImageUrl,
                    }}
                />
                <View
                    className="absolute bottom-0 right-0 items-center rounded-2xl px-2 py-1"
                    style={{
                        backgroundColor: isSeller
                            ? theme["color-primary-500"]
                            : theme["color-secondary-500"],
                    }}
                >
                    <Text className="text-xs text-white">
                        {isSeller ? "Seller" : "Buyer"}
                    </Text>
                </View>
            </View>
            <View className="flex-1">
                <Text>{senderName}</Text>
                <Text
                    category="c1"
                    className="text-gray-500"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {`${lastMessageName}: ${lastMessage}`}
                </Text>
            </View>
        </View>
    );
}
