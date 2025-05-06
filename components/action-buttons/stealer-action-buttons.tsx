import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import StealModal from "./steal-modal";
import { ItemType } from "@/types/item";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function ShowBiddersText() {
    return <Text style={{ fontWeight: "bold" }}>Show Bidders</Text>;
}

function StealText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Steal</Text>;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAutoFocused, setIsAutoFocused] = useState(false);

    function handleShowModal() {
        setIsModalVisible(true);
    }

    function handleSteal() {
        setIsAutoFocused(true);
        handleShowModal();
    }

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleSteal}
                appearance="ghost"
                style={{ backgroundColor: "#E1306C" }}
                accessoryLeft={StealText}
            ></Button>
            <Button
                className="mx-1 flex-1"
                appearance="ghost"
                style={{ backgroundColor: "#DEE1E6" }}
                accessoryLeft={ShowBiddersText}
                onPress={handleShowModal}
            ></Button>

            <StealModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                item={item}
                isAutoFocused={isAutoFocused}
            ></StealModal>
        </>
    );
}

export default StealerActionButtons;
