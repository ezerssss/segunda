import { useUserStore } from "@/states/user";
import { ItemFormType } from "@/types/item";
import { doc, getDoc } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { itemsCollectionRef } from "@/constants/collections";

export default function useGetItem(itemId?: string) {
    const { user } = useUserStore();
    const [item, setItem] = useState<ItemFormType>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!itemId || !user) {
            return;
        }
        fetchItem(itemId);
    }, [user, itemId]);

    async function fetchItem(itemId: string) {
        setIsLoading(true);
        try {
            const itemRef = doc(itemsCollectionRef, itemId);
            const itemSnap = await getDoc(itemRef);

            if (itemSnap.exists) {
                setItem(itemSnap.data() as ItemFormType);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { item, isLoading };
}
