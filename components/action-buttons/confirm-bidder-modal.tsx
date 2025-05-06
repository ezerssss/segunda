import Modal from "react-native-modal";
import { View, Image } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Dispatch, SetStateAction } from "react";

interface ConfirmBidderModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isModalVisible: boolean;
    bidderName: string | undefined;
    bidderPrice: number | undefined;
    bidderImgURI: string | undefined;
    bidderID: string | undefined;
}

function ConfirmText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Confirm</Text>;
}
function CancelText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Cancel</Text>;
}

function ConfirmBidderModal(props: Readonly<ConfirmBidderModalProps>) {
    const {
        isModalVisible,
        setIsModalVisible,
        bidderName,
        bidderPrice,
        bidderImgURI,
    } = props;

    async function handleApproveBidder() {
        //use the approve bidder backend here with the bidderID
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
                <Text category="h4" className="mb-4">
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
                    <Button
                        className="mx-1 grow"
                        onPress={handleApproveBidder}
                        appearance="ghost"
                        style={{ backgroundColor: "#E1306C" }}
                        accessoryLeft={ConfirmText}
                    ></Button>
                    <Button
                        className="mx-1 grow"
                        appearance="ghost"
                        style={{ backgroundColor: "#555555" }}
                        accessoryLeft={CancelText}
                        onPress={() => setIsModalVisible(false)}
                    ></Button>
                </View>
            </View>
        </Modal>
    );
}
export default ConfirmBidderModal;
