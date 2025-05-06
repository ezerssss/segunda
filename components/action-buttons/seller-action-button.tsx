import { Button } from "@ui-kitten/components";
import { useState } from "react";

import SellerViewBiddersModal from "./seller-view-bidders-modal";
import { ItemType } from "@/types/item";

interface SellerActionButtonProp {
    item: ItemType;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleShowModal() {
        setIsModalVisible(true);
    }
    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowModal}
                size="small"
                appearance="filled"
                status="basic"
            >
                Show Bidders
            </Button>
            <SellerViewBiddersModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
            ></SellerViewBiddersModal>
        </>
    );
}

export default SellerActionButton;
