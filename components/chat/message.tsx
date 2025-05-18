import { useUserStore } from "@/states/user";
import { SystemGeneratedMessageType } from "@/types/chat";
import { formatChatTimestamp } from "@/utils/date";
import { Avatar, useTheme, Text } from "@ui-kitten/components";
import clsx from "clsx";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { View, Pressable, TouchableOpacity } from "react-native";

interface PropsInterface {
    message: string;
    imageUrl: string | null;
    isOther: boolean;
    senderImageUrl: string | null;
    date: string;
    systemGeneratedMessage: SystemGeneratedMessageType | null;
}

function Message(props: PropsInterface) {
    const {
        message,
        date,
        senderImageUrl,
        imageUrl,
        isOther,
        systemGeneratedMessage,
    } = props;
    const { user } = useUserStore();
    const theme = useTheme();

    const [isTimestampVisible, setIsTimestampVisible] = useState(false);

    if (systemGeneratedMessage) {
        const isActionButtonVisible =
            systemGeneratedMessage.showActionButton &&
            systemGeneratedMessage.item?.sellerId === user?.id;

        const { item } = systemGeneratedMessage;

        return (
            <View className="mt-2 items-center">
                <Text className="text-center text-xs text-gray-400">
                    {formatChatTimestamp(new Date(date))}
                </Text>
                <View className="w-3/4 items-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                    {item && (
                        <TouchableOpacity className="w-full">
                            <Image
                                contentFit="cover"
                                className="w-full"
                                style={{
                                    height: 150,
                                    borderBottomWidth: 1,
                                    borderColor: theme["color-gray-200"],
                                }}
                                source={{
                                    uri: item.imageUrl,
                                }}
                                placeholder={{
                                    blurhash: item.blurHash,
                                }}
                            />
                        </TouchableOpacity>
                    )}

                    <View className="w-full items-center p-3">
                        <Text className="font-bold">
                            {systemGeneratedMessage.title}
                        </Text>
                        <Text className="my-2 text-center text-xs">
                            {systemGeneratedMessage.message}
                        </Text>
                        {isActionButtonVisible && (
                            <TouchableOpacity
                                className="w-full items-center rounded-lg p-2"
                                style={{
                                    backgroundColor: theme["color-danger-500"],
                                }}
                            >
                                <Text className="text-sm text-white">
                                    Cancel Transaction
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View className="mt-2">
            {isTimestampVisible && (
                <Text className="text-center text-xs text-gray-400">
                    {formatChatTimestamp(new Date(date))}
                </Text>
            )}
            <View
                className={clsx(
                    "flex-row items-end gap-2",
                    isOther ? "justify-start" : "justify-end",
                )}
            >
                {senderImageUrl && isOther && (
                    <Avatar source={{ uri: senderImageUrl }} />
                )}

                <Pressable
                    onPress={() => setIsTimestampVisible((prev) => !prev)}
                    className={clsx(
                        "max-w-[80%] gap-1",
                        isOther ? "items-start" : "items-end",
                    )}
                >
                    {imageUrl && (
                        <Image
                            contentFit="contain"
                            className="mt-1 aspect-square w-full rounded-2xl bg-black"
                            source={{ uri: imageUrl }}
                        />
                    )}

                    {!!message && (
                        <View
                            className="rounded-3xl px-4 py-3"
                            style={{
                                backgroundColor: isOther
                                    ? theme["color-gray-200"]
                                    : theme["color-primary-500"],
                            }}
                        >
                            <Text className={clsx(!isOther && "text-white")}>
                                {message}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

export default memo(Message);
