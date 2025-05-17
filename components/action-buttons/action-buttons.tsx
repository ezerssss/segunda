import SellerActionButton from "./seller-action-button";
import StealerActionButtons from "./stealer-action-buttons";
import MinerActionButton from "./miner-action-button";
import { ItemType } from "@/types/item";
import { useUserStore } from "@/states/user";

interface ActionButtonsProps {
    item: ItemType;
}

function ActionButtons(props: Readonly<ActionButtonsProps>) {
    const { user } = useUserStore();
    const { item } = props;
    const isSeller = user?.id === item.sellerId;

    if (isSeller) return <SellerActionButton item={item} />;
    if (item.miner === null) return <MinerActionButton item={item} />;
    return <StealerActionButtons item={item} />;
}
export default ActionButtons;
