import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";

import SellerViewBiddersModal from "./seller-view-bidders-modal";
import { ItemType } from "@/types/item";

interface SellerActionButtonProp {
    item: ItemType;
}

function ShowBiddersText() {
    return <Text style={{ fontWeight: "bold" }}>Show Bidders</Text>;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleShowBidders() {
        setIsModalVisible(true);
    }
    return (
        <>
            <Button
                className="mx-1 grow"
                appearance="ghost"
                style={{ backgroundColor: "#DEE1E6" }}
                accessoryLeft={ShowBiddersText}
                onPress={handleShowBidders}
            ></Button>
            <SellerViewBiddersModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
            ></SellerViewBiddersModal>
        </>
    );
}

export default SellerActionButton;
