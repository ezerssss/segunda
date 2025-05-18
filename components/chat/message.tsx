import { formatChatTimestamp } from "@/utils/date";
import { Avatar } from "@ui-kitten/components";
import clsx from "clsx";
import { memo } from "react";
import { View, Text } from "react-native";

interface PropsInterface {
    message: string;
    imageUrl: string | null;
    isOther: boolean;
    senderName: string;
    senderImageUrl: string | null;
    date: string;
}

function Message(props: PropsInterface) {
    const { message, date, senderImageUrl, isOther } = props;

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
                        "max-w-[85%] shrink self-start rounded-lg p-4",
                        isOther ? "bg-gray-200" : "bg-blue-200",
                    )}
                >
                    <Text>
                        {message.repeat(Math.floor(Math.random() * 10) + 1)}
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
