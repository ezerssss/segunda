import BidderDetails from "./bidder-details";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";
import ConfirmBidderModal from "./confirm-bidder-modal";
import { BidType } from "@/types/bidder";
import NoBidders from "./no-bidders";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import { useUserStore } from "@/states/user";
import { useBidderModalStore } from "@/states/modal";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

function SellerViewBiddersModal() {
    const { user } = useUserStore();
    const { item, bidders, setItem, setShowSellersModal } =
        useBidderModalStore();

    const hasConfirmedBidder = item?.confirmedBidder !== null;
    const itemId = item?.id ?? "";

    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [approvedBidder, setApprovedBidder] = useState<BidType>();
    const theme = useTheme();

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (!actionSheetRef.current) return;
        setShowSellersModal(actionSheetRef.current.show);
    }, [actionSheetRef]);

    function handleApprove(bidder: BidType) {
        setApprovedBidder(bidder);
        setIsConfirmModalVisible(true);
    }

    useEffect(() => {
        if (!itemId || !user) return;
        const currItemRef = doc(itemsCollectionRef, itemId);
        const unsubscribeItem = onSnapshot(
            currItemRef,
            (currItemSnapshot) => {
                setItem(currItemSnapshot.data() as ItemType);
            },
            (error) => {
                console.error(error);
            },
        );

        return unsubscribeItem;
    }, [itemId, user]);

    return (
        <ActionSheet
            ref={actionSheetRef}
            enableGesturesInScrollView={true}
            keyboardHandlerEnabled={false}
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
                                            : item.miner?.id === bidder.id
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
                />
            )}
        </ActionSheet>
    );
}

export default SellerViewBiddersModal;
