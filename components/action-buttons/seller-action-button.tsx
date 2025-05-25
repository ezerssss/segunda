import { Button } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";
import { useBidderModalStore } from "@/states/modal";

interface SellerActionButtonProp {
    item: ItemType;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;
    const { setItem, showSellersModal, setBidders } = useBidderModalStore();
    const { getBidders, isModalInit } = useGetBidders();

    async function handleShowModal() {
        setItem(item);
        setBidders([]);
        await getBidders(item);
        showSellersModal();
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
