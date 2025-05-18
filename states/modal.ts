import { BidType } from "@/types/bidder";
import { ItemType } from "@/types/item";
import { create } from "zustand";

interface BiddersModalStateInterface {
    item: ItemType | null;
    setItem: (item: ItemType) => void;
    bidders: BidType[];
    setBidders: (bids: BidType[]) => void;
    unsubscribe: () => void;
    setUnsubscribe: (fn: () => void) => void;
    showBuyersModal: (snapIndex?: number) => void;
    setShowBuyersModal: (fn: (snapIndex?: number) => void) => void;
    showSellersModal: (snapIndex?: number) => void;
    setShowSellersModal: (fn: (snapIndex?: number) => void) => void;
}

export const useBidderModalStore = create<BiddersModalStateInterface>(
    (set) => ({
        showBuyersModal: (snapIndex?: number) => {},
        setShowBuyersModal: (fn) => set(() => ({ showBuyersModal: fn })),
        showSellersModal: (snapIndex?: number) => {},
        setShowSellersModal: (fn) => set(() => ({ showSellersModal: fn })),
        item: null,
        setItem: (data) => set(() => ({ item: data })),
        bidders: [],
        setBidders: (data) => set(() => ({ bidders: data })),
        unsubscribe: () => {},
        setUnsubscribe: (fn) => set(() => ({ unsubscribe: fn })),
    }),
);
