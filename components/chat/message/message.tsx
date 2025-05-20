import { SystemGeneratedMessageType } from "@/types/chat";
import { formatChatTimestamp } from "@/utils/date";
import { Avatar, useTheme, Text } from "@ui-kitten/components";
import clsx from "clsx";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { View, Pressable } from "react-native";
import SystemGeneratedMessage from "./system-generated";

interface PropsInterface {
    message: string;
    imageUrl: string | null;
    isOther: boolean;
    senderImageUrl: string | null | undefined;
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
    const theme = useTheme();

    const [isTimestampVisible, setIsTimestampVisible] = useState(false);

    if (systemGeneratedMessage) {
        return (
            <SystemGeneratedMessage
                systemGeneratedMessage={systemGeneratedMessage}
                date={date}
            />
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
                                    ? theme["color-zinc-100"]
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
