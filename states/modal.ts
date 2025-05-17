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
}

export const useBidderModalStore = create<BiddersModalStateInterface>(
    (set) => ({
        item: null,
        setItem: (data) => set(() => ({ item: data })),
        bidders: [],
        setBidders: (data) => set(() => ({ bidders: data })),
        unsubscribe: () => {},
        setUnsubscribe: (fn) => set(() => ({ unsubscribe: fn })),
    }),
);
