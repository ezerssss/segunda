import Modal from "react-native-modal";
import { View, Image } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Dispatch, SetStateAction } from "react";
import { confirmBid } from "@/firebase/functions";
import { ConfirmBidRequestType } from "@/types/bidder";

interface ConfirmBidderModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isModalVisible: boolean;
    bidderName: string;
    bidderPrice: number;
    bidderImgURI: string;
    bidderID: string;
    itemID: string;
}

function ConfirmBidderModal(props: Readonly<ConfirmBidderModalProps>) {
    const {
        isModalVisible,
        setIsModalVisible,
        bidderName,
        bidderPrice,
        bidderImgURI,
        bidderID,
        itemID,
    } = props;

    async function handleApproveBidder() {
        try {
            const data: ConfirmBidRequestType = {
                bidId: bidderID,
                itemId: itemID,
            } as ConfirmBidRequestType;
            const response = await confirmBid(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        }

        setIsModalVisible(false);
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver={false}
            backdropTransitionOutTiming={1}
            backdropOpacity={0.5}
        >
            <View className="flex min-h-60 items-center justify-center rounded-3xl bg-white p-4">
                <Text category="h4" className="mb-4 text-center">
                    Sell item to {bidderName ?? ""}?
                </Text>
                <View className="aspect-square w-1/2 items-center overflow-hidden rounded-full">
                    <Image
                        source={{ uri: bidderImgURI ?? "" }}
                        className="h-full w-full"
                        resizeMode="cover"
                    />
                </View>
                <Text className="my-5">PHP {bidderPrice ?? ""}</Text>
                <View className="w-1/2 flex-row justify-between">
                    {/*  */}

                    <Button
                        className="mx-1 flex-1"
                        onPress={handleApproveBidder}
                        style={{
                            backgroundColor: "#E1306C",
                            borderWidth: 0,
                        }}
                        size="small"
                        appearance="filled"
                    >
                        Confirm
                    </Button>
                    <Button
                        className="mx-1 flex-1"
                        onPress={() => setIsModalVisible(false)}
                        size="small"
                        appearance="filled"
                        status="basic"
                    >
                        Cancel
                    </Button>
                </View>
            </View>
        </Modal>
    );
}
export default ConfirmBidderModal;
