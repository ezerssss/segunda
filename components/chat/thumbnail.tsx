import { Pressable, View } from "react-native";
import { Text, Avatar, Icon } from "@ui-kitten/components";
import clsx from "clsx";
import { useRouter } from "expo-router";

interface PropsInterface {
    chatId: string;
    otherName: string;
    otherImageUrl: string | null;
    lastMessageName: string;
    lastMessage: string;
    isSeen: boolean;
}

export default function ChatThumbnail(props: PropsInterface) {
    const {
        chatId,
        otherName,
        otherImageUrl,
        lastMessageName,
        lastMessage,
        isSeen,
    } = props;
    const router = useRouter();

    function navigateToChat() {
        router.push(`/(protected)/chat/${chatId}`);
    }

    return (
        <Pressable
            className="mb-4 flex w-full flex-row items-center justify-center gap-4"
            onPress={navigateToChat}
        >
            {otherImageUrl ? (
                <Avatar
                    source={{
                        uri: otherImageUrl,
                    }}
                    size="giant"
                />
            ) : (
                <View className="rounded-full bg-gray-100 p-2">
                    <Icon name="person" width={42} height={42} fill="gray" />
                </View>
            )}

            <View className="flex-1">
                <Text className={clsx(!isSeen && "font-bold")}>
                    {otherName}
                </Text>
                <Text
                    category="c1"
                    className={clsx("text-gray-500", !isSeen && "font-bold")}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {`${lastMessageName}${lastMessage}`}
                </Text>
            </View>
        </Pressable>
    );
}
