import { formatChatTimestamp } from "@/utils/date";
import { Avatar, useTheme } from "@ui-kitten/components";
import clsx from "clsx";
import { Image } from "expo-image";
import { memo } from "react";
import { View, Text } from "react-native";

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

    return (
        <View
            className={clsx(
                "mb-4 items-end gap-2",
                isOther ? "flex-row" : "flex-row-reverse",
            )}
        >
            {senderImageUrl && <Avatar source={{ uri: senderImageUrl }} />}

            <View
                className={clsx(
                    "flex-1 items-end gap-1",
                    isOther ? "flex-row" : "flex-row-reverse",
                )}
            >
                <View
                    className={clsx(
                        "max-w-[85%] shrink self-start rounded-3xl px-4 py-3",
                        isOther ? "items-start" : "items-end",
                    )}
                    style={{
                        backgroundColor: isOther
                            ? theme["color-gray-200"]
                            : theme["color-primary-500"],
                    }}
                >
                    {imageUrl && (
                        <Image
                            contentFit="contain"
                            className="mb-3 aspect-square w-full rounded-2xl bg-black"
                            source={{ uri: imageUrl }}
                        />
                    )}
                    <Text className={clsx(!isOther && "text-white")}>
                        {message}
                    </Text>
                </View>

                <Text className="text-xs text-gray-400">
                    {formatChatTimestamp(new Date(date))}
                </Text>
            </View>
        </View>
    );
}

export default memo(Message);
