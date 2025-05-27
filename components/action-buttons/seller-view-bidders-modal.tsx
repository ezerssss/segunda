import BidderDetails from "./bidder-details";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";
import ConfirmBidderModal from "./confirm-bidder-modal";
import { BidType } from "@/types/bidder";
import NoBidders from "./no-bidders";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { itemsCollectionRef } from "@/constants/collections";
import { ItemType } from "@/types/item";
import { useUserStore } from "@/states/user";
import { useBidderModalStore } from "@/states/modal";
import {
    BottomSheetView,
    BottomSheetModal,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomSheetBackHandler } from "@/hooks/useBottomSheetBackHandler";

function SellerViewBiddersModal() {
    const { user } = useUserStore();
    const { item, bidders, setItem, setShowSellersModal, setHideSellersModal } =
        useBidderModalStore();

    const hasConfirmedBidder = item?.confirmedBidder !== null;
    const itemId = item?.id ?? "";

    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [approvedBidder, setApprovedBidder] = useState<BidType>();
    const theme = useTheme();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const { handleSheetPositionChange } =
        useBottomSheetBackHandler(bottomSheetModalRef);

    useEffect(() => {
        if (!bottomSheetModalRef.current) return;
        setShowSellersModal(bottomSheetModalRef.current.present);
        setHideSellersModal(bottomSheetModalRef.current.close);
    }, [bottomSheetModalRef]);

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
        <BottomSheetModal
            onChange={handleSheetPositionChange}
            ref={bottomSheetModalRef}
            enableContentPanningGesture={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                />
            )}
        >
            <BottomSheetView className="flex max-h-[50vh] rounded-t-3xl p-4 align-bottom">
                <Text category="h4" className="mb-4 w-full text-left">
                    Active Bidders
                </Text>
                {bidders.length === 0 ? (
                    <NoBidders></NoBidders>
                ) : (
                    <ScrollView showsHorizontalScrollIndicator={false}>
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

                <View className="flex items-center align-bottom">
                    {approvedBidder && item?.id && (
                        <ConfirmBidderModal
                            isModalVisible={isConfirmModalVisible}
                            setIsModalVisible={setIsConfirmModalVisible}
                            bidderImgURI={
                                approvedBidder.bidderData.imageUrl ?? ""
                            }
                            bidderName={approvedBidder.bidderData.name}
                            bidderPrice={approvedBidder.price}
                            bidderID={approvedBidder.id}
                            itemID={item.id}
                        />
                    )}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
}

export default SellerViewBiddersModal;
