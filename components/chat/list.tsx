import { FlatList, View } from "react-native";
import ChatThumbnail from "@/components/chat/thumbnail";
import SkeletonChatList from "@/components/skeletons/chat-list";
import { ChatType } from "@/types/chat";
import { Text } from "@ui-kitten/components";

interface PropsInterface {
    chatListData: ChatType[];
    isSeller: boolean;
    isLoading: boolean;
}

function ChatList(props: PropsInterface) {
    const { chatListData, isSeller, isLoading } = props;

    if (isLoading) {
        return <SkeletonChatList />;
    }

    return (
        <FlatList
            data={chatListData}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
                const other = isSeller ? item.buyerData : item.sellerData;
                return (
                    <ChatThumbnail
                        key={item.id}
                        chatId={item.id}
                        otherName={other.name}
                        otherImageUrl={other.imageUrl}
                        lastMessageName={
                            item.lastMessage.senderData
                                ? `${item.lastMessage.senderData.name}: `
                                : ""
                        }
                        lastMessage={item.lastMessage.message}
                        isSeen={
                            isSeller ? item.isSeen.seller : item.isSeen.buyer
                        }
                    />
                );
            }}
            ListEmptyComponent={
                <View className="h-[80vh] items-center justify-center">
                    <Text>You have no messages yet.</Text>
                </View>
            }
            contentContainerClassName="bg-white p-4"
        />
    );
}

export default ChatList;
