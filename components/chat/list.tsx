import { FlatList } from "react-native";
import ChatThumbnail from "@/components/chat/thumbnail";
import SkeletonChatList from "@/components/skeletons/chat-list";

interface PropsInterface {
    chatsThumbnailData?: number[]; // acts as placeholder should change to required and associated data type
}

function ChatList(props: PropsInterface) {
    const { chatsThumbnailData = new Array(15).fill(0) } = props;
    const isLoading = false;

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
                />
            )}
            contentContainerClassName="bg-white p-4"
        />
    );
}

export default ChatList;
