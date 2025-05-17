import { View } from "react-native";
import { Text, Avatar } from "@ui-kitten/components";

interface PropsInterface {
    senderName: string;
    senderImageUrl?: string; // should be required later on
    lastMessageName: string;
    lastMessage: string;
}

export default function ChatThumbnail(props: PropsInterface) {
    const {
        senderName,
        senderImageUrl = "https://th.bing.com/th/id/OIP.QwmYgdzR4D8-6QzPKhyOxwAAAA?cb=iwp2&rs=1&pid=ImgDetMain",
        lastMessageName,
        lastMessage,
    } = props;

    return (
        <View className="mb-4 flex w-full flex-row items-center gap-4">
            <Avatar
                size="giant"
                source={{
                    uri: senderImageUrl,
                }}
            />
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
