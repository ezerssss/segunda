import { Button } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";
import { useBidderModalStore } from "@/states/modal";
import { SheetManager } from "react-native-actions-sheet";

interface SellerActionButtonProp {
    item: ItemType;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;
    const { setItem } = useBidderModalStore();
    const { getBidders, isModalInit } = useGetBidders();

    async function handleShowModal() {
        setItem(item);
        await getBidders(item);
        SheetManager.show("seller-modal");
    }

    return (
        <Button
            className="mx-1 flex-1"
            onPress={handleShowModal}
            size="small"
            appearance="filled"
            status="basic"
            accessoryLeft={
                isModalInit ? <ActivityIndicator color="white" /> : <></>
            }
        >
            {isModalInit ? "" : "Show Bidders"}
        </Button>
    );
}

export default SellerActionButton;
