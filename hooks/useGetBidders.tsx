import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc,
    getDocs,
} from "@react-native-firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CollectionEnum } from "@/enums/collection";
import { BidType } from "@/types/bidder";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import { ItemType } from "@/types/item";
import { itemsCollectionRef } from "@/constants/collections";

function useGetBidders(item: ItemType, isModalVisible: boolean) {
    const { setModalContent } = useContext(BiddersModalContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isModalVisible) return;
        setIsLoading(true);
        const itemDocRef = doc(itemsCollectionRef, item.id);
        const biddersCollectionRef = collection(
            itemDocRef,
            CollectionEnum.BIDDERS,
        );
        const biddersQuery = query(
            biddersCollectionRef,
            orderBy("price", "desc"),
            orderBy("dateCreated", "asc"),
        );

        const unsubscribeBidders = onSnapshot(
            biddersQuery,
            (biddersQuerySnapshot) => {
                const bidders: BidType[] = biddersQuerySnapshot.docs.map(
                    (bidderDoc) => {
                        return bidderDoc.data() as BidType;
                    },
                );
                setModalContent({ item: item, bidders: bidders });
                setIsLoading(false);
            },

            (error) => {
                console.error(error);
            },
        );
        return unsubscribeBidders;
    }, [isModalVisible]);

    async function getInitialBidders() {
        const itemDocRef = doc(itemsCollectionRef, item.id);
        const biddersCollectionRef = collection(
            itemDocRef,
            CollectionEnum.BIDDERS,
        );
        const querySnapshot = await getDocs(query(biddersCollectionRef));
        const bidders: BidType[] = querySnapshot.docs.map((bidderDoc) => {
            return bidderDoc.data() as BidType;
        });
        setModalContent({ item: item, bidders: bidders });
    }
    return { getInitialBidders, isLoading };
}
export default useGetBidders;
