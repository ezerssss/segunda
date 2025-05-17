import ChatList from "@/components/chat/list";
import useGetChatList from "@/hooks/useGetChatList";

export default function BoughtFromChatList() {
    const { chatList, isLoading } = useGetChatList({ isSeller: false });
    return (
        <ChatList
            chatListData={chatList}
            isSeller={false}
            isLoading={isLoading}
        />
    );
}
