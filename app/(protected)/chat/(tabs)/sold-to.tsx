import ChatList from "@/components/chat/list";
import useGetChatList from "@/hooks/useGetChatList";

export default function SoldToChatList() {
    const { chatList, isLoading } = useGetChatList({ isSeller: true });
    return (
        <ChatList
            chatListData={chatList}
            isSeller={true}
            isLoading={isLoading}
        />
    );
}
