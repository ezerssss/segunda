import { Button, Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { ItemType } from "@/types/item";
import { BiddersModalContext } from "@/contexts/biddersModalContext";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const { setIsBuyerViewModalVisible, setItem } =
        useContext(BiddersModalContext);

    function handleShowBidders() {
        setIsBuyerViewModalVisible(true);
        setItem(item);
    }

    return (
        <>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBidders}
                style={{
                    backgroundColor: "#E1306C",
                    borderWidth: 0,
                }}
                size="small"
                appearance="filled"
                accessoryLeft={<Icon name="shopping-bag-outline" />}
            >
                Steal
            </Button>
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBidders}
                size="small"
                appearance="filled"
                status="basic"
                style={{
                    flex: 1,
                }}
            >
                Show Bidders
            </Button>
        </>
    );
}

export default StealerActionButtons;
