import { Button, Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { ItemType } from "@/types/item";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const { setIsBuyerViewModalVisible, setItem } =
        useContext(BiddersModalContext);

    async function handleShowBidders() {
        setItem(item);
        await getBidders(item);
        setIsBuyerViewModalVisible(true);
    }
    const { getBidders, isModalInit } = useGetBidders();

    return (
        <>
            {!item.confirmedBidder && (
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
                    disabled={isModalInit}
                >
                    Steal
                </Button>
            )}
            <Button
                className="mx-1 flex-1"
                onPress={handleShowBidders}
                size="small"
                appearance="filled"
                status="basic"
                style={{
                    flex: 1,
                }}
                disabled={isModalInit}
                accessoryLeft={
                    isModalInit ? <ActivityIndicator color={"white"} /> : <></>
                }
            >
                Show Bidders
            </Button>
        </>
    );
}

export default StealerActionButtons;
