import { ItemType } from "@/types/item";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { BidRequestType } from "@/types/bidder";
import { bidItem } from "@/firebase/functions";
import ConfirmBuyActionModal from "./confirm-buy-action-modal";
import { ActivityIndicator } from "react-native";
import useGetBidders from "@/hooks/useGetBidders";
import { useBidderModalStore } from "@/states/modal";

interface MinerActionButtonProp {
    item: ItemType;
}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { getBidders, isModalInit } = useGetBidders();

    const { setIsBuyerViewModalVisible, setItem } = useBidderModalStore();

    async function handleShowBidders() {
        setItem(item);
        await getBidders(item);
        setIsBuyerViewModalVisible(true);
    }

    const theme = useTheme();

    async function handleMine() {
        setIsLoading(true);
        try {
            const data = {
                price: item.price,
                itemId: item.id,
            } as BidRequestType;
            await bidItem(data);
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
                disabled={isLoading || isModalInit}
            >
                {isLoading ? "" : "Mine Now"}
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBidders}
                size="small"
                appearance="filled"
                status="basic"
                accessoryLeft={
                    isModalInit ? <ActivityIndicator color="white" /> : <></>
                }
                disabled={isLoading || isModalInit}
            >
                {isLoading ? "" : "Show Bidders"}
            </Button>
            <ConfirmBuyActionModal
                handleConfirm={handleMine}
                data={null}
                isSteal={false}
                isModalVisible={isConfirmModalVisible}
                setIsModalVisible={setIsConfirmModalVisible}
            />
        </>
    );
}

export default MinerActionButton;
