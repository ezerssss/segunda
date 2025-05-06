import { ItemType } from "@/types/item";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import BuyerViewBiddersModal from "./buyer-view-bidders-modal";
import { BidRequestType } from "@/types/bidder";
import { bidItem } from "@/firebase/functions";

interface MinerActionButtonProp {
    item: ItemType;
}

function ShowBiddersText() {
    return <Text style={{ fontWeight: "bold" }}>Show Bidders</Text>;
}

function MinerActionButton(props: Readonly<MinerActionButtonProp>) {
    const { item } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                onPress={() => {
                    handleMine();
                }}
            >
                Mine Now!
            </Button>
            <Button
                className="mx-1 flex-1"
                appearance="ghost"
                style={{ backgroundColor: "#DEE1E6" }}
                accessoryLeft={ShowBiddersText}
                onPress={handleShowModal}
            ></Button>
            <BuyerViewBiddersModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
                isAutoFocused={false}
            ></BuyerViewBiddersModal>
        </>
    );
}

export default MinerActionButton;
