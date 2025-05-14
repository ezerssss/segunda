import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import {
    query,
    where,
    orderBy,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/contexts/postContext";
import { UserContext } from "@/contexts/userContext";

export function useGetPostItems(postId: string) {
    const { user } = useContext(UserContext);
    const { setPostItems } = useContext(PostContext);
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
