import BidderDetails from "./bidder-details";
import { useContext, useEffect, useState } from "react";

import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";
import ConfirmBidderModal from "./confirm-bidder-modal";
import { BidType } from "@/types/bidder";
import NoBidders from "./no-bidders";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    Unsubscribe,
} from "@react-native-firebase/firestore";
import { itemsCollectionRef } from "@/constants/collections";
import { CollectionEnum } from "@/enums/collection";

function SellerViewBiddersModal() {
    const { isSellerViewModalVisible, setIsSellerViewModalVisible, item } =
        useContext(BiddersModalContext);

    const [bidders, setBidders] = useState<BidType[]>([]);

    const hasConfirmedBidder = item?.confirmedBidder !== null;

    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [approvedBidder, setApprovedBidder] = useState<BidType>();
    const [unsubscribe, setUnsubscribe] = useState<Unsubscribe>(() => {
        return () => {
            console.log("inital unsub");
        };
    });
    const theme = useTheme();

    function handleApprove(bidder: BidType) {
        setApprovedBidder(bidder);
        setIsConfirmModalVisible(true);
    }

    async function getBidders() {
        setIsLoading(true);

        const itemDocRef = doc(itemsCollectionRef, item?.id);
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
            const querySnapshot = await getDocs(biddersQuery);
            const bidders: BidType[] = querySnapshot.docs.map((bidderDoc) => {
                return bidderDoc.data() as BidType;
            });
            setBidders(bidders);
            const unsubscribeBidders = onSnapshot(
                query(collection(itemDocRef, "bidders")),
                (biddersQuerySnapshot) => {
                    const bidders: BidType[] = biddersQuerySnapshot.docs.map(
                        (bidderDoc) => {
                            return bidderDoc.data() as BidType;
                        },
                    );
                    console.log("bidders", bidders);
                    setBidders(bidders);
                    setIsLoading(false);
                },
                (error) => {
                    console.error(error);
                },
            );
            setUnsubscribe(() => {
                unsubscribeBidders();
                console.log("clean up!");
            });
        } catch (e) {
            console.error(e);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        setBidders([]);
        getBidders();
        return unsubscribe;
    }, [isSellerViewModalVisible]);

    return (
        <Modal
            isVisible={isSellerViewModalVisible}
            onBackdropPress={() => setIsSellerViewModalVisible(false)}
            onBackButtonPress={() => setIsSellerViewModalVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={false}
            backdropTransitionOutTiming={1}
            style={{ justifyContent: "flex-end", margin: 0 }}
        >
            <View className="max-h-[75vh] min-h-60 rounded-t-3xl bg-white p-4">
                <Text category="h4" className="mb-4">
                    Active Bidders
                </Text>

                {bidders.length === 0 ? (
                    <NoBidders></NoBidders>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {bidders.map((bidder) => (
                            <View
                                className="my-4 flex-row items-center justify-between"
                                key={bidder.id}
                            >
                                <BidderDetails
                                    imgURI={bidder.bidderData.imageUrl ?? ""}
                                    bid={bidder.price}
                                    name={bidder.bidderData.name}
                                    date={bidder.dateCreated}
                                ></BidderDetails>
                                <Button
                                    className="mx-1"
                                    onPress={() => {
                                        handleApprove(bidder);
                                    }}
                                    style={{
                                        backgroundColor: hasConfirmedBidder
                                            ? theme["color-basic-disabled"]
                                            : item.miner?.id === bidder.bidderId
                                              ? theme["color-primary-500"]
                                              : "#E1306C",
                                        borderWidth: 0,
                                    }}
                                    size="small"
                                    appearance="filled"
                                    disabled={hasConfirmedBidder}
                                >
                                    Approve
                                </Button>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
            {approvedBidder && item?.id && (
                <ConfirmBidderModal
                    isModalVisible={isConfirmModalVisible}
                    setIsModalVisible={setIsConfirmModalVisible}
                    bidderImgURI={approvedBidder.bidderData.imageUrl ?? ""}
                    bidderName={approvedBidder.bidderData.name}
                    bidderPrice={approvedBidder.price}
                    bidderID={approvedBidder.id}
                    itemID={item.id}
                ></ConfirmBidderModal>
            )}
        </Modal>
    );
}

export default SellerViewBiddersModal;
function setIsLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
