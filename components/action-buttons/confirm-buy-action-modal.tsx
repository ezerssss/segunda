import { BidRequestType } from "@/types/bidder";
import { Button, useTheme, Text } from "@ui-kitten/components";
import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

interface ConfirmBuyActionModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isModalVisible: boolean;
    isSteal: boolean;
    handleConfirm: (data: BidRequestType | null) => Promise<void>;
    data: BidRequestType | null;
}
function ConfirmBuyActionModal(props: Readonly<ConfirmBuyActionModalProps>) {
    const { isSteal, isModalVisible, setIsModalVisible, handleConfirm, data } =
        props;
    const theme = useTheme();

    function handleYes() {
        handleConfirm(data);
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
                <Text category="h4" className="my-5 text-center">
                    Do you really want to confirm this action?
                </Text>
                <View className="flex-row justify-between gap-2">
                    <Button
                        className="mx-1 min-w-20"
                        onPress={handleYes}
                        style={{
                            backgroundColor: isSteal
                                ? "#E1306C"
                                : theme["color-primary-500"],
                            borderWidth: 0,
                            minWidth: 80,
                        }}
                        size="small"
                        appearance="filled"
                    >
                        Confirm
                    </Button>
                    <Button
                        className="mx-1 min-w-20"
                        onPress={() => setIsModalVisible(false)}
                        size="small"
                        appearance="filled"
                        status="basic"
                    >
                        No
                    </Button>
                </View>
            </View>
        </Modal>
    );
}

export default ConfirmBuyActionModal;
