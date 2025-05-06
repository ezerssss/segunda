import BidderDetails from "./bidder-details";
import { Dispatch, SetStateAction, useState } from "react";

import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import ConfirmBidderModal from "./confirm-bidder-modal";
import { ItemType } from "@/types/item";

interface SellerViewBiddersModalProps {
    item: ItemType;
    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

function ApproveText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Approve</Text>;
}

function SellerViewBiddersModal(props: Readonly<SellerViewBiddersModalProps>) {
    const { setIsModalVisible, isModalVisible } = props;
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    async function handleApprove() {
        setIsConfirmModalVisible(true);
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
                    <View className="my-4 flex-row items-center justify-between">
                        <BidderDetails
                            imgURI="https://i.imgur.com/CzXTtJV.jpg"
                            bid={50.0}
                            name="John Smilga"
                            date="04/10/2025 | 11:20 pm"
                        ></BidderDetails>
                        <Button
                            className="mx-1"
                            onPress={handleApprove}
                            appearance="ghost"
                            style={{ backgroundColor: "#E1306C" }}
                            accessoryLeft={ApproveText}
                        ></Button>
                    </View>
                </ScrollView>
            </View>
            <ConfirmBidderModal
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
                bidderImgURI="https://i.imgur.com/CzXTtJV.jpg"
                bidderName="John Smilga"
                bidderPrice={50}
            ></ConfirmBidderModal>
        </Modal>
    );
}

export default SellerViewBiddersModal;
