import { ItemType } from "@/types/item";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useContext, useState } from "react";
import { BidRequestType } from "@/types/bidder";
import { bidItem } from "@/firebase/functions";
import ConfirmBuyActionModal from "./confirm-buy-action-modal";
import { ActivityIndicator } from "react-native";
import { BiddersModalContext } from "@/contexts/biddersModalContext";

interface MinerActionButtonProp {
    item: ItemType;
}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { setIsBuyerViewModalVisible, setItem } =
        useContext(BiddersModalContext);

    function handleShowBidders() {
        setIsBuyerViewModalVisible(true);
        setItem(item);
    }

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

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={() => {
                    setIsConfirmModalVisible(true);
                }}
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
                disabled={isLoading}
            >
                {isLoading ? "" : "Mine Now"}
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBidders}
                size="small"
                appearance="filled"
                status="basic"
                disabled={isLoading}
            >
                {isLoading ? "" : "Show Bidders"}
            </Button>
            <ConfirmBuyActionModal
                handleConfirm={handleMine}
                data={null}
                isSteal={false}
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
            ></ConfirmBuyActionModal>
        </>
    );
}

export default MinerActionButton;
