import { chatsCollectionRef } from "@/constants/collections";
import { MAX_MESSAGES_PER_LOAD } from "@/constants/message";
import { CollectionEnum } from "@/enums/collection";
import { useUserStore } from "@/states/user";
import { ChatType, MessageType } from "@/types/chat";
import {
    collection,
    doc,
    FirebaseFirestoreTypes,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function useGetMessages(chatId: string) {
    const { user } = useUserStore();
    const [chat, setChat] = useState<ChatType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [lastMessageDoc, setLastMessageDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!user) {
            return;
        }

        async function getChatData() {
            setIsLoading(true);
            const chatDocRef = doc(chatsCollectionRef, chatId);
            const chatDoc = await getDoc(chatDocRef);
            setChat(chatDoc.data() as ChatType);
            setIsLoading(false);
        }

        getChatData();
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const chatDocRef = doc(chatsCollectionRef, chatId);
        const messagesCollectionRef = collection(
            chatDocRef,
            CollectionEnum.MESSAGES,
        );
        const messagesQuery = query(
            messagesCollectionRef,
            orderBy("dateCreated", "desc"),
            limit(MAX_MESSAGES_PER_LOAD),
        );
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const docs = snapshot.docs;

            setHasMore(docs.length === MAX_MESSAGES_PER_LOAD);
            const newMessages: MessageType[] = docs.map(
                (doc) => doc.data() as MessageType,
            );
            const newMessageIds = new Set(
                newMessages.map((message) => message.id),
            );

            setMessages((prevMessages) => {
                const outdatedMessages = prevMessages.filter(
                    (message) => !newMessageIds.has(message.id),
                );
                return [...newMessages, ...outdatedMessages];
            });

            if (docs.length > 0) {
                // Don't update lastDoc if it's not undefined (user has scrolled past the live update zone already)
                setLastMessageDoc((prevData) => {
                    if (prevData) return prevData;
                    return docs[docs.length - 1];
                });
            }

            setIsLoading(false);
        });

        return unsubscribe;
    }, [user]);

    async function fetchMoreMessages() {
        if (isLoading || !hasMore || !lastMessageDoc) return;

        setIsLoading(true);
        try {
            const chatDocRef = doc(chatsCollectionRef, chatId);
            const messagesCollectionRef = collection(
                chatDocRef,
                CollectionEnum.MESSAGES,
            );
            const messagesQuery = query(
                messagesCollectionRef,
                orderBy("dateCreated", "desc"),
                startAfter(lastMessageDoc),
                limit(MAX_MESSAGES_PER_LOAD),
            );

            const postsQuerySnapshot = await getDocs(messagesQuery);
            const docs = postsQuerySnapshot.docs;

            setHasMore(docs.length === MAX_MESSAGES_PER_LOAD);
            const newMessages: MessageType[] = docs.map(
                (doc) => doc.data() as MessageType,
            );
            const newMessageIds = new Set(
                newMessages.map((message) => message.id),
            );

            setMessages((prevMessages) => {
                const outDatedMessages = prevMessages.filter(
                    (message) => !newMessageIds.has(message.id),
                );
                return [...outDatedMessages, ...newMessages];
            });

            if (docs.length > 0) {
                setLastMessageDoc(docs[docs.length - 1]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { chat, messages, isLoading, hasMore, fetchMoreMessages };
}
