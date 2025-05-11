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
        if (!sellerId) return;

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
                setItems((prevItems) => {
                    const existingIds = new Set(
                        prevItems.map((item) => item.id),
                    );
                    const uniqueNewItems = fetchedItems.filter(
                        (item) => !existingIds.has(item.id),
                    );
                    return [...uniqueNewItems, ...prevItems];
                });
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return unsubscribeItems;
    }, []);

    return { items, isLoading };
}
