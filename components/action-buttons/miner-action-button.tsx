import { ItemType } from "@/types/item";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import BuyerViewBiddersModal from "./buyer-view-bidders-modal";
import { BidRequestType } from "@/types/bidder";
import { bidItem } from "@/firebase/functions";

interface MinerActionButtonProp {
    item: ItemType;
}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const theme = useTheme();

    async function handleMine() {
        const data = { price: item.price, itemId: item.id } as BidRequestType;
        const response = await bidItem(data);
        console.log(response);
    }
    function handleShowModal() {
        setIsModalVisible(true);
    }

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleMine}
                style={{
                    backgroundColor: theme["color-primary-500"],
                    borderWidth: 0,
                    flex: 1,
                }}
                size="small"
                appearance="filled"
                accessoryLeft={<Icon name="shopping-bag-outline" />}
            >
                Mine Now
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowModal}
                size="small"
                appearance="filled"
                status="basic"
            >
                Show Bidders
            </Button>
            <BuyerViewBiddersModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
                isAutoFocused={false}
                isSteal={false}
            ></BuyerViewBiddersModal>
        </>
    );
}

export default MinerActionButton;
