import { chatsCollectionRef } from "@/constants/collections";
import { useChatNotifStore } from "@/states/chat";
import { useUserStore } from "@/states/user";
import {
    limit,
    onSnapshot,
    query,
    where,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";

function useGetChatNotif() {
    const { user } = useUserStore();
    const { setHasBoughtFromNotif, setHasSoldToNotif } = useChatNotifStore();

    useEffect(() => {
        if (!user) {
            return;
        }

        const boughtFromQuery = query(
            chatsCollectionRef,
            where("buyerId", "==", user.uid),
            where("isSeen.buyer", "==", false),
            limit(1),
        );

        const unsubscribe = onSnapshot(boughtFromQuery, (snapshot) => {
            setHasBoughtFromNotif(!snapshot.empty);
        });

        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }

        const soldToQuery = query(
            chatsCollectionRef,
            where("sellerId", "==", user.uid),
            where("isSeen.seller", "==", false),
            limit(1),
        );

        const unsubscribe = onSnapshot(soldToQuery, (snapshot) => {
            setHasSoldToNotif(!snapshot.empty);
        });

        return unsubscribe;
    }, [user]);
}

export default useGetChatNotif;
