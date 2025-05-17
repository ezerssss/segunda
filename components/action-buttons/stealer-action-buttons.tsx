import { Button, Icon } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";
import { useBidderModalStore } from "@/states/modal";
import { SheetManager } from "react-native-actions-sheet";

interface BuyerActionButtonsProps {
    item: ItemType;
}

function StealerActionButtons(props: Readonly<BuyerActionButtonsProps>) {
    const { item } = props;
    const { setItem } = useBidderModalStore();

    async function handleShowBidders() {
        setItem(item);
        await getBidders(item);
        SheetManager.show("buyer-modal");
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
