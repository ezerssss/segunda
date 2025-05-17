import {
    query,
    where,
    orderBy,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { chatsCollectionRef } from "@/constants/collections";
import { UserContext } from "@/contexts/userContext";
import { ChatType } from "@/types/chat";

interface ParamsInterface {
    isSeller: boolean;
}

export function useGetChatList(params: ParamsInterface) {
    const { isSeller } = params;
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setchatList] = useState<ChatType[]>([]);
    const senderId = isSeller ? "sellerId" : "buyerId";

    useEffect(() => {
        if (!user) return;

        const chatQuery = query(
            chatsCollectionRef,
            where(senderId, "==", user.id),
            orderBy("dateUpdated", "desc"),
        );

        const unsubsribe = onSnapshot(
            chatQuery,
            (chatsQuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const chats: ChatType[] = [];
                chatsQuerySnapshot.forEach((chatDoc) => {
                    chats.push(chatDoc.data() as ChatType);
                });
                setchatList(chats);
                setIsLoading(false);
            },
            (error) => console.error("Error in getting chat: ", error),
        );

        return unsubsribe;
    }, [user]);

    return { isLoading, chatList };
}

export default useGetChatList;
