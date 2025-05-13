import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc,
} from "@react-native-firebase/firestore";
import { useContext, useState } from "react";
import { CollectionEnum } from "@/enums/collection";
import { BidType } from "@/types/bidder";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";

function useGetBidders() {
    const [isModalInit, setIsModalInit] = useState(false);
    const { setBidders, unsubscribe } = useContext(BiddersModalContext);

    async function getBidders(item: ItemType) {
        if (!item) return;
        setIsModalInit(true);

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
        try {
            if (unsubscribe?.current) unsubscribe.current();
            const unsubscribeBidders = onSnapshot(
                biddersQuery,
                (biddersQuerySnapshot) => {
                    const bidders: BidType[] = biddersQuerySnapshot.docs.map(
                        (bidderDoc) => {
                            return bidderDoc.data() as BidType;
                        },
                    );
                    setBidders(bidders);
                    setIsModalInit(false);
                },
                (error) => {
                    console.error(error);
                },
            );
            if (unsubscribe) unsubscribe.current = unsubscribeBidders;
        } catch (e) {
            console.error(e);
        }
        setIsModalInit(false);
    }
    return { getBidders, isModalInit };
}

export default useGetBidders;
