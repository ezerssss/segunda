import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc,
} from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";
import { useEffect, useState } from "react";
import { CollectionEnum } from "@/enums/collection";
import { BidType } from "@/types/bidder";

function useGetBidders(itemID: string, isModalVisible: boolean) {
    const [bidders, setBidders] = useState<BidType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // if (!isModalVisible) return;
        console.log("getting bidders");
        setIsLoading(true);
        const itemDocRef = doc(db, CollectionEnum.ITEMS, itemID);
        const biddersCollectionRef = collection(
            itemDocRef,
            CollectionEnum.BIDDERS,
        );
        const biddersQuery = query(
            biddersCollectionRef,
            orderBy("price", "desc"),
            // orderBy("dateCreated", "asc"),
        );

        const unsubscribeBidders = onSnapshot(
            biddersQuery,
            (biddersQuerySnapshot) => {
                console.log(biddersQuerySnapshot.docs);

                const bidders: BidType[] = biddersQuerySnapshot.docs.map(
                    (bidderDoc) => {
                        return bidderDoc.data() as BidType;
                    },
                );
                console.log("the bidders are", bidders);

                setBidders(bidders);
            },

            (error) => {
                console.error(error);
            },
        );
        return unsubscribeBidders;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);

    return { bidders, isLoading };
}
export default useGetBidders;
