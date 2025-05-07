import { ItemType } from "@/types/item";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import BuyerViewBiddersModal from "./buyer-view-bidders-modal";
import { BidRequestType } from "@/types/bidder";
import { bidItem } from "@/firebase/functions";
import ConfirmBuyActionModal from "./confirm-buy-action-modal";
import { ActivityIndicator } from "react-native";

interface MinerActionButtonProp {
    item: ItemType;
}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    const [isBiddersModalVisible, setIsBiddersModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const theme = useTheme();

    async function handleMine() {
        setIsLoading(true);
        try {
            const data = {
                price: item.price,
                itemId: item.id,
            } as BidRequestType;
            const response = await bidItem(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }
    function handleShowBiddersModal() {
        setIsBiddersModalVisible(true);
    }

    function handleShowConfirmModal() {
        setIsConfirmModalVisible(true);
    }

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowConfirmModal}
                style={{
                    backgroundColor: theme["color-primary-500"],
                    borderWidth: 0,
                    flex: 1,
                }}
                size="small"
                appearance="filled"
                accessoryLeft={
                    isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Icon name="shopping-bag-outline" />
                    )
                }
            >
                {isLoading ? "" : "Mine Now"}
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBiddersModal}
                size="small"
                appearance="filled"
                status="basic"
                disabled={isLoading}
            >
                Show Bidders
            </Button>
            <ConfirmBuyActionModal
                handleConfirm={handleMine}
                data={null}
                isSteal={false}
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
            ></ConfirmBuyActionModal>
            <BuyerViewBiddersModal
                isModalVisible={isBiddersModalVisible}
                setIsModalVisible={setIsBiddersModalVisible}
                item={item}
                isAutoFocused={false}
                isSteal={false}
            ></BuyerViewBiddersModal>
        </>
    );
}

export default MinerActionButton;
