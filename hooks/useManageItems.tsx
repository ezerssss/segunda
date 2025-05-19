import { db } from "@/firebase/db";
import { useUserStore } from "@/states/user";
import { ItemFormType } from "@/types/item";
import { doc, getDoc } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function useManageItems(itemId?: string) {
    const { user } = useUserStore();
    const [item, setItem] = useState<ItemFormType>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!user || !itemId) {
            return;
        }

        if (itemId) {
            fetchItem(itemId);
        }
    }, [itemId]);

    async function fetchItem(itemId: string) {
        setIsLoading(true);
        try {
            const itemRef = doc(db, "items", itemId);
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
