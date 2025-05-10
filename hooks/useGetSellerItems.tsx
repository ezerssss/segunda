import {
    FirebaseFirestoreTypes,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    where,
} from "@react-native-firebase/firestore";
import { UserContext } from "@/contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import { MAX_ITEMS_PER_LOAD } from "@/constants/post";

export default function useGetSellerItems() {
    const { user } = useContext(UserContext);
    const sellerId = user?.id;
    const [items, setItems] = useState<ItemType[]>([]);
    const [lastItemDoc, setLastItemDoc] =
        useState<
            FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        >();
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!sellerId) return;

        setIsLoading(true);
        const itemQuery = query(
            itemsCollectionRef,
            where("sellerId", "==", sellerId),
            orderBy("dateUpdated", "desc"),
        );

        const unsubscribeItems = onSnapshot(
            itemQuery,
            async (itemQuerySnapshot) => {
                const docs = itemQuerySnapshot.docs;
                setHasMore(docs.length > 0);
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

                if (docs.length > 0) {
                    setLastItemDoc(docs[docs.length - 1]);
                }
                setIsLoading(false);
            },
            (error) => {
                console.error(error);
                setIsLoading(false);
            },
        );

        return unsubscribeItems;
    }, []);

    async function fetchMoreItems() {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const itemsQuery = query(
                itemsCollectionRef,
                where("sellerId", "==", sellerId),
                orderBy("dateUpdated", "desc"),
                startAfter(lastItemDoc),
                limit(MAX_ITEMS_PER_LOAD),
            );

            const itemsQuerySnapshot = await getDocs(itemsQuery);
            const docs = itemsQuerySnapshot.docs;

            setHasMore(docs.length > 0);
            const fetchedItems: ItemType[] = docs.map(
                (doc) => doc.data() as ItemType,
            );

            setItems((prevItems) => {
                const existingIds = new Set(prevItems.map((item) => item.id));
                const uniqueNewItems = fetchedItems.filter(
                    (item) => !existingIds.has(item.id),
                );
                return [...uniqueNewItems, ...prevItems];
            });

            if (docs.length > 0) {
                setLastItemDoc(docs[docs.length - 1]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { items, fetchMoreItems };
}
