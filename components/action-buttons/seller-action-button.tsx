import { Button } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import { useContext } from "react";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";

interface SellerActionButtonProp {
    item: ItemType;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;
    const { setIsSellerViewModalVisible, setItem } =
        useContext(BiddersModalContext);
    const { getBidders, isModalInit } = useGetBidders();

    async function handleShowModal() {
        setItem(item);
        await getBidders(item);
        setIsSellerViewModalVisible(true);
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
