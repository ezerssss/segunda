import Message from "@/components/chat/message";
import NewMessage from "@/components/chat/new-message";
import UserHeader from "@/components/user/user-header";
import { MAX_MESSAGES_PER_LOAD } from "@/constants/post";
import useGetMessages from "@/hooks/useGetMessages";
import useSeenChat from "@/hooks/useSeenChat";
import { useUserStore } from "@/states/user";
import { Icon, Divider } from "@ui-kitten/components";
import { router, useLocalSearchParams } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";

function ChatInstancePage() {
    const { user } = useUserStore();
    const { chatId } = useLocalSearchParams();
    const { chat, messages, fetchMoreMessages, hasMore } = useGetMessages(
        chatId as string,
    );
    useSeenChat(chatId as string);

    if (!chat || !user) {
        return (
            <View className="h-screen w-screen items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    const { sellerData, buyerData, sellerId } = chat;
    const other = user.id === sellerId ? buyerData : sellerData;

    return (
        <>
            <View className="flex-row items-center justify-between px-3 py-4">
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={router.back}>
                        <Icon name="arrow-ios-back-outline" />
                    </TouchableOpacity>
                    <UserHeader
                        name={other.name}
                        imageUrl={other.imageUrl}
                        campus={other.campus}
                    />
                </View>
            </View>
            <Divider />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 px-4"
            >
                <FlatList
                    inverted
                    data={messages}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={MAX_MESSAGES_PER_LOAD}
                    renderItem={({ item }) => {
                        const isOther = user.uid !== item.senderId;

                        return (
                            <Message
                                message={item.message}
                                imageUrl={item.imageUrl}
                                isOther={isOther}
                                senderImageUrl={item.senderData?.imageUrl}
                                date={item.dateCreated}
                                systemGeneratedMessage={
                                    item.systemGeneratedMessage
                                }
                            />
                        );
                    }}
                    onEndReached={fetchMoreMessages}
                    ListFooterComponent={
                        hasMore ? (
                            <View className="h-24 w-full items-center justify-center py-2">
                                <ActivityIndicator />
                            </View>
                        ) : null
                    }
                />

                <NewMessage chatId={chatId as string} />
            </KeyboardAvoidingView>
        </>
    );
}

export default ChatInstancePage;
