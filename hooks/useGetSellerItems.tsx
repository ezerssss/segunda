import {
    onSnapshot,
    orderBy,
    query,
    where,
} from "@react-native-firebase/firestore";
import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";

export default function useGetSellerItems() {
    const { user } = useContext(UserContext);
    const sellerId = user?.id;
    const [items, setItems] = useState<ItemType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!sellerId || !user) return;

        setIsLoading(true);
        const itemQuery = query(
            itemsCollectionRef,
            where("sellerId", "==", sellerId),
            orderBy("dateUpdated", "desc"),
            orderBy("postId"),
        );

        const unsubscribeItems = onSnapshot(
            itemQuery,
            async (itemQuerySnapshot) => {
                const docs = itemQuerySnapshot.docs;
                const fetchedItems: ItemType[] = docs.map(
                    (doc) => doc.data() as ItemType,
                );
                setItems(fetchedItems);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return unsubscribeItems;
    }, [user]);

    return { items, isLoading };
}
