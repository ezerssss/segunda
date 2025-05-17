import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import {
    query,
    where,
    orderBy,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { useUserStore } from "@/states/user";
import { usePostStore } from "@/states/post";

export function useGetPostItems(postId: string) {
    const { user } = useUserStore();
    const { setPostItems } = usePostStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const unsubsribe = onSnapshot(
            query(
                itemsCollectionRef,
                where("postId", "==", postId),
                orderBy("index"),
            ),
            (itemsQuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const items: ItemType[] = [];
                itemsQuerySnapshot.forEach((itemDoc) => {
                    items.push(itemDoc.data() as ItemType);
                });
                setPostItems(items);
                setIsLoading(false);
            },
            (error) => console.error("Error in getting post items: ", error),
        );
        return unsubsribe;
    }, [user]);

    return { isLoading };
}

export default useGetPostItems;
