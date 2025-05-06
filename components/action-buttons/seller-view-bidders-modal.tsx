import BidderDetails from "./bidder-details";
import { Dispatch, SetStateAction } from "react";

import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
// import ConfirmBidderModal from "./confirm-bidder-modal";
import { ItemType } from "@/types/item";
import useGetBidders from "@/hooks/useGetBidders";
import { BidType } from "@/types/bidder";

interface SellerViewBiddersModalProps {
    item: ItemType;
    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

function ApproveText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Approve</Text>;
}

function SellerViewBiddersModal(props: Readonly<SellerViewBiddersModalProps>) {
    const { setIsModalVisible, isModalVisible, item } = props;
    // const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const { bidders } = useGetBidders(item.id, isModalVisible);

    function handleApprove(bidder: BidType) {
        // setIsConfirmModalVisible(true);
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {bidders.map((bidder, index) => (
                        <View
                            className="my-4 flex-row items-center justify-between"
                            key={index}
                        >
                            <BidderDetails
                                imgURI={"bidderData.imageUrl"}
                                bid={0}
                                name={"bidderData.name"}
                                date={"bidder.date"}
                            ></BidderDetails>
                            <Button
                                className="mx-1"
                                onPress={() => {
                                    handleApprove(bidder);
                                }}
                                appearance="ghost"
                                style={{ backgroundColor: "#E1306C" }}
                                accessoryLeft={ApproveText}
                            ></Button>
                        </View>
                    ))}
                </ScrollView>
            </View>
            {/* <ConfirmBidderModal
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
                bidderImgURI={approvedBidder?.imgURI}
                bidderName={approvedBidder?.name}
                bidderPrice={approvedBidder?.bid}
                bidderID={approvedBidder?.id}
            ></ConfirmBidderModal> */}
        </Modal>
    );
}

export default SellerViewBiddersModal;
