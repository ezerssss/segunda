import { Button } from "@ui-kitten/components";
import { ItemType } from "@/types/item";
import { useContext, useState } from "react";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import useGetBidders from "@/hooks/useGetBidders";
import { ActivityIndicator } from "react-native";

interface SellerActionButtonProp {
    item: ItemType;
}

function SellerActionButton(props: Readonly<SellerActionButtonProp>) {
    const { item } = props;
    const { isSellerViewModalVisible, setIsSellerViewModalVisible } =
        useContext(BiddersModalContext);
    const [isLoading, setIsLoading] = useState(false);

    async function handleShowModal() {
        setIsLoading(true);
        await getInitialBidders();
        setIsLoading(false);
        setIsSellerViewModalVisible(true);
    }

    const { getInitialBidders } = useGetBidders(item, isSellerViewModalVisible);
    return (
        <Button
            className="mx-1 flex-1"
            onPress={handleShowModal}
            size="small"
            appearance="filled"
            status="basic"
            accessoryLeft={
                isLoading ? <ActivityIndicator color="white" /> : <></>
            }
        >
            {isLoading ? "" : "Show Bidders"}
        </Button>
    );
}

export default SellerActionButton;
