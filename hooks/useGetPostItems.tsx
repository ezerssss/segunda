import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import {
    query,
    where,
    FirebaseFirestoreTypes,
    onSnapshot,
} from "@react-native-firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/contexts/postContext";

export function useGetPostItems(postId: string) {
    const { setPostItems } = useContext(PostContext);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            },
            () => console.error("Failed getting post items"),
        );
        return unsubsribe;
    }, []);

    return { isLoading };
}

export default useGetPostItems;
