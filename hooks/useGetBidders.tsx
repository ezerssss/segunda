import {
    collection,
    onSnapshot,
    orderBy,
    query,
    doc,
    getDocs,
} from "@react-native-firebase/firestore";
import { db } from "@/firebase/db";
import { useContext, useEffect } from "react";
import { CollectionEnum } from "@/enums/collection";
import { BidType } from "@/types/bidder";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import { ItemType } from "@/types/item";

function useGetBidders(item: ItemType, isModalVisible: boolean) {
    const { setModalContent } = useContext(BiddersModalContext);

    useEffect(() => {
        if (!isModalVisible) return;
        const itemDocRef = doc(db, CollectionEnum.ITEMS, item.id);
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
            },

            (error) => {
                console.error(error);
            },
        );
        return unsubscribeBidders;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalVisible]);

    async function getInitialBidders() {
        const itemDocRef = doc(db, CollectionEnum.ITEMS, item.id);
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
    return getInitialBidders;
}
export default useGetBidders;
