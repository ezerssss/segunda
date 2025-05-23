import Modal from "react-native-modal";
import { View, Image, ActivityIndicator } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { Dispatch, SetStateAction, useState } from "react";
import { confirmBid } from "@/firebase/functions";
import { ConfirmBidRequestType } from "@/types/bidder";
import { router } from "expo-router";
import { useBidderModalStore } from "@/states/modal";

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
    const [isLoading, setIsLoading] = useState(false);
    const { hideSellersModal } = useBidderModalStore();

    async function handleApproveBidder() {
        setIsLoading(true);
        try {
            const data: ConfirmBidRequestType = {
                bidId: bidderID,
                itemId: itemID,
            } as ConfirmBidRequestType;
            const res = await confirmBid(data);
            setIsModalVisible(false);
            hideSellersModal();
            router.push(`/(protected)/chat/${res.data.chatId}`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading((f) => false);
            setIsModalVisible(false);
        }
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
                <View className="flex-row justify-between gap-2">
                    <Button
                        className="mx-1 min-w-20"
                        onPress={handleApproveBidder}
                        style={{
                            backgroundColor: "#E1306C",
                            borderWidth: 0,
                        }}
                        size="small"
                        appearance="filled"
                        accessoryLeft={
                            isLoading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <></>
                            )
                        }
                        disabled={isLoading}
                    >
                        {isLoading ? "" : "Confirm"}
                    </Button>
                    <Button
                        className="mx-1 min-w-20"
                        onPress={() => setIsModalVisible(false)}
                        size="small"
                        appearance="filled"
                        status="basic"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                </View>
            </View>
        </Modal>
    );
}
export default ConfirmBidderModal;
