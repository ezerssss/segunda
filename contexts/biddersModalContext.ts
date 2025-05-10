import { BidType } from "@/types/bidder";
import { ItemType } from "@/types/item";
import { createContext, Dispatch, SetStateAction } from "react";

interface ModalContentType {
    item: ItemType | null;
    bidders: BidType[];
}

interface BiddersModalContextInterface {
    isBuyerViewModalVisible: boolean;
    isSellerViewModalVisible: boolean;
    modalContent: ModalContentType;
    setIsSellerViewModalVisible: Dispatch<SetStateAction<boolean>>;
    setIsBuyerViewModalVisible: Dispatch<SetStateAction<boolean>>;
    setModalContent: Dispatch<SetStateAction<ModalContentType>>;
}
export const BiddersModalContext = createContext<BiddersModalContextInterface>({
    isBuyerViewModalVisible: false,
    isSellerViewModalVisible: false,
    modalContent: { item: null, bidders: [] },
    setIsSellerViewModalVisible: () => {},
    setIsBuyerViewModalVisible: () => {},
    setModalContent: () => {},
});
