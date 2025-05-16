import { FlatList } from "react-native";
import { Text } from "@ui-kitten/components";
import ChatThumbnail from "@/components/chat/thumbnail";
import SkeletonChatList from "@/components/skeletons/chat-list";

function ChatList() {
    const isLoading = true;
    const chatsThumbnailData = new Array(15).fill(0);

    if (isLoading) {
        return <SkeletonChatList />;
    }

    return (
        <FlatList
            data={chatsThumbnailData}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
                <ChatThumbnail
                    key={"chat-thumbnail" + item.index}
                    senderName="Jhoanna Olana"
                    lastMessageName="Andrea Jones"
                    lastMessage="I wanna be a tutubi na walang tinatagong bato sa loob ng bato"
                    isSeller={item.index % 3 === 0}
                />
            )}
            contentContainerClassName="bg-white m-4"
            ListHeaderComponent={
                <Text category="h4" className="mb-4">
                    Chats
                </Text>
            }
        />
    );
}

export default ChatList;
