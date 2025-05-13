import BidderDetails from "./bidder-details";
import { useContext, useState } from "react";
import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";
import ConfirmBidderModal from "./confirm-bidder-modal";
import { BidType } from "@/types/bidder";
import NoBidders from "./no-bidders";
import { BiddersModalContext } from "@/contexts/biddersModalContext";

function SellerViewBiddersModal() {
    const {
        isSellerViewModalVisible,
        setIsSellerViewModalVisible,
        item,
        bidders,
    } = useContext(BiddersModalContext);

    const hasConfirmedBidder = item?.confirmedBidder !== null;

    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [approvedBidder, setApprovedBidder] = useState<BidType>();
    const theme = useTheme();

    function handleApprove(bidder: BidType) {
        setApprovedBidder(bidder);
        setIsConfirmModalVisible(true);
    }

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
                />
            )}
        </Modal>
    );
}

export default SellerViewBiddersModal;
