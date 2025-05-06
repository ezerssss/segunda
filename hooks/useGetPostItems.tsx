import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import {
    query,
    where,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { usePostContext } from "@/contexts/postContext";

export function useGetPostItems(postId: string) {
    const { postItems, setPostItems } = usePostContext();

    useEffect(() => {
        const unsubsribe = onSnapshot(
            query(itemsCollectionRef, where("postId", "==", postId)),
            (itemsQuerySnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
                const items: ItemType[] = [];
                itemsQuerySnapshot.forEach((itemDoc) => {
                    const data = {
                        id: itemDoc.id,
                        ...itemDoc.data(),
                    } as ItemType;
                    items.push(data);
                });
                setPostItems(items);
            },
            () => console.error("Failed getting post items"),
        );
        return unsubsribe;
    });

    return postItems;
}

export default useGetPostItems;
