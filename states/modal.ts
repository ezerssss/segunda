import { BidType } from "@/types/bidder";
import { ItemType } from "@/types/item";
import { create } from "zustand";

interface BiddersModalStateInterface {
    isBuyerViewModalVisible: boolean;
    setIsBuyerViewModalVisible: (data: boolean) => void;
    isSellerViewModalVisible: boolean;
    setIsSellerViewModalVisible: (data: boolean) => void;
    item: ItemType | null;
    setItem: (item: ItemType) => void;
    bidders: BidType[];
    setBidders: (bids: BidType[]) => void;
    unsubscribe: () => void;
    setUnsubscribe: (fn: () => void) => void;
}

export const useBidderModalStore = create<BiddersModalStateInterface>(
    (set) => ({
        isBuyerViewModalVisible: false,
        setIsBuyerViewModalVisible: (data) =>
            set(() => ({ isBuyerViewModalVisible: data })),
        isSellerViewModalVisible: false,
        setIsSellerViewModalVisible: (data) =>
            set(() => ({ isSellerViewModalVisible: data })),
        item: null,
        setItem: (data) => set(() => ({ item: data })),
        bidders: [],
        setBidders: (data) => set(() => ({ bidders: data })),
        unsubscribe: () => {},
        setUnsubscribe: (fn) => set(() => ({ unsubscribe: fn })),
    }),
);
