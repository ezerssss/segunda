import { Button, Icon } from "@ui-kitten/components";
import { useContext, useState } from "react";
import { ItemType } from "@/types/item";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const [isLoading, setIsLoading] = useState(false);
    const { isBuyerViewModalVisible, setIsBuyerViewModalVisible } =
        useContext(BiddersModalContext);

    async function handleShowBidders() {
        setIsLoading(true);
        await getInitialBidders();
        setIsLoading(false);
        setIsBuyerViewModalVisible(true);
    }

    const getInitialBidders = useGetBidders(item, isBuyerViewModalVisible);

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
                disabled={isLoading}
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
                accessoryLeft={
                    isLoading ? <ActivityIndicator color="white" /> : <></>
                }
                disabled={isLoading}
            >
                {isLoading ? "" : "Show Bidders"}
            </Button>
        </>
    );
}

export default StealerActionButtons;
