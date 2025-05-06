import { Button, Icon } from "@ui-kitten/components";
import { useState } from "react";
import BuyerViewBiddersModal from "./buyer-view-bidders-modal";
import { ItemType } from "@/types/item";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAutoFocused, setIsAutoFocused] = useState(false);

    function handleShowModal() {
        setIsAutoFocused(false);
        setIsModalVisible(true);
    }

    function handleSteal() {
        setIsAutoFocused(true);
        setIsModalVisible(true);
    }

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleSteal}
                style={{
                    backgroundColor: "#E1306C",
                    borderWidth: 0,
                    flex: 1,
                }}
                size="small"
                appearance="filled"
                accessoryLeft={<Icon name="shopping-bag-outline" />}
            >
                Steal
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowModal}
                size="small"
                appearance="filled"
                status="basic"
                style={{
                    flex: 1,
                }}
            >
                Show Bidders
            </Button>
            <BuyerViewBiddersModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
                isSteal={true}
                isAutoFocused={isAutoFocused}
            ></BuyerViewBiddersModal>
        </>
    );
}

export default StealerActionButtons;
