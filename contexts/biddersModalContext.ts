import { BidType } from "@/types/bidder";
import { ItemType } from "@/types/item";
import { Unsubscribe } from "@react-native-firebase/firestore";
import {
    createContext,
    Dispatch,
    MutableRefObject,
    SetStateAction,
} from "react";

interface BiddersModalContextInterface {
    isBuyerViewModalVisible: boolean;
    isSellerViewModalVisible: boolean;
    unsubscribe: MutableRefObject<Unsubscribe | null> | null;
    item: ItemType | null;
    bidders: BidType[];
    setIsSellerViewModalVisible: Dispatch<SetStateAction<boolean>>;
    setIsBuyerViewModalVisible: Dispatch<SetStateAction<boolean>>;
    setItem: Dispatch<SetStateAction<ItemType | null>>;
    setBidders: Dispatch<SetStateAction<BidType[]>>;
}
export const BiddersModalContext = createContext<BiddersModalContextInterface>({
    isBuyerViewModalVisible: false,
    isSellerViewModalVisible: false,
    item: null,
    bidders: [],
    unsubscribe: null,
    setIsSellerViewModalVisible: () => {},
    setIsBuyerViewModalVisible: () => {},
    setItem: () => {},
    setBidders: () => {},
});
