import { useUserStore } from "@/states/user";
import { SystemGeneratedMessageType } from "@/types/chat";
import { formatChatTimestamp } from "@/utils/date";
import { useTheme, Text, Icon } from "@ui-kitten/components";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useState } from "react";
import { View, TouchableOpacity, ToastAndroid } from "react-native";
import { cancelBid } from "@/firebase/functions";
import ConfirmCancelModal from "@/components/confirm-cancel-modal";

interface PropsInterface {
    date: string;
    systemGeneratedMessage: SystemGeneratedMessageType;
}

function SystemGeneratedMessage(props: PropsInterface) {
    const { systemGeneratedMessage, date } = props;
    const { showActionButton, item } = systemGeneratedMessage;

    const { user } = useUserStore();
    const theme = useTheme();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isActionButtonVisible =
        showActionButton && item?.sellerId === user?.id;

    function navigateToItem() {
        if (!item) {
            return;
        }

        if (item.isDeleted) {
            ToastAndroid.show("The item does not exist.", ToastAndroid.SHORT);
            return;
        }

        router.push(`/(protected)/view-post/${item.postId}`);
    }

    async function handleCancelBid() {
        if (!isActionButtonVisible || !item) {
            return;
        }

        try {
            setIsLoading(true);
            await cancelBid({
                itemId: item.id,
            });
        } catch (error) {
            console.error(error);
            ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ConfirmCancelModal
                isDanger
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                icon={
                    <Icon
                        width={60}
                        height={60}
                        name="alert-circle"
                        fill={theme["color-warning-500"]}
                    />
                }
                title="Confirm cancellation?"
                body="This action cannot be undone."
                isButtonsDisabled={isLoading}
                onConfirm={handleCancelBid}
            />
            <View className="mt-2 items-center">
                <Text className="text-center text-xs text-gray-400">
                    {formatChatTimestamp(new Date(date))}
                </Text>
                <View
                    className="w-3/4 items-center overflow-hidden rounded-2xl border-gray-200"
                    style={{
                        backgroundColor: theme["color-zinc-50"],
                        borderWidth: 0.5,
                    }}
                >
                    {item && (
                        <TouchableOpacity
                            className="w-full"
                            onPress={navigateToItem}
                        >
                            <Image
                                contentFit="cover"
                                className="w-full"
                                style={{
                                    height: 150,
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
                        <Text className="text-lg font-bold">
                            {systemGeneratedMessage.title}
                        </Text>
                        <Text className="mb-4 text-center text-sm">
                            {systemGeneratedMessage.message}
                        </Text>
                        {isActionButtonVisible && (
                            <TouchableOpacity
                                className="w-full items-center rounded-lg py-3"
                                style={{
                                    backgroundColor: theme["color-danger-500"],
                                }}
                                onPress={() => setIsModalVisible(true)}
                            >
                                <Text className="text-sm font-bold text-white">
                                    Cancel Transaction
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </>
    );
}

export default memo(SystemGeneratedMessage);
