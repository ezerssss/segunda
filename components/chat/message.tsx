import { formatChatTimestamp } from "@/utils/date";
import { Avatar, useTheme } from "@ui-kitten/components";
import clsx from "clsx";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { View, Text, Pressable } from "react-native";

interface PropsInterface {
    message: string;
    imageUrl: string | null;
    isOther: boolean;
    senderImageUrl: string | null;
    date: string;
}

function Message(props: PropsInterface) {
    const { message, date, senderImageUrl, imageUrl, isOther } = props;
    const theme = useTheme();

    const [isTimestampVisible, setIsTimestampVisible] = useState(false);

    return (
        <View className="mt-2">
            {isTimestampVisible && (
                <Text className="mb-2 text-center text-xs text-gray-400">
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
                            className="aspect-square w-full rounded-2xl bg-black"
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
