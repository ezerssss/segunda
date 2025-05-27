import { BidType } from "@/types/bidder";
import { ItemType } from "@/types/item";
import { WithSpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";
import { WithTimingConfig } from "react-native-reanimated/lib/typescript/animation/timing";
import { create } from "zustand";

interface BiddersModalStateInterface {
    item: ItemType | null;
    setItem: (item: ItemType) => void;
    bidders: BidType[];
    setBidders: (bids: BidType[]) => void;
    unsubscribe: () => void;
    setUnsubscribe: (fn: () => void) => void;
    showBuyersModal: (data?: any) => void;
    setShowBuyersModal: (fn: (data?: any) => void) => void;
    showSellersModal: (data?: any) => void;
    hideSellersModal: (
        animationConfigs?: WithSpringConfig | WithTimingConfig,
    ) => void;
    setShowSellersModal: (fn: (data?: any) => void) => void;
    setHideSellersModal: (
        fn: (animationConfigs?: WithSpringConfig | WithTimingConfig) => void,
    ) => void;
}

export const useBidderModalStore = create<BiddersModalStateInterface>(
    (set) => ({
        showBuyersModal: (data?: any) => {},
        setShowBuyersModal: (fn) => set(() => ({ showBuyersModal: fn })),
        showSellersModal: (data?: any) => {},
        hideSellersModal: (
            animationConfigs?: WithSpringConfig | WithTimingConfig,
        ) => {},
        setShowSellersModal: (fn) => set(() => ({ showSellersModal: fn })),
        setHideSellersModal: (fn) => set(() => ({ hideSellersModal: fn })),
        item: null,
        setItem: (data) => set(() => ({ item: data })),
        bidders: [],
        setBidders: (data) => set(() => ({ bidders: data })),
        unsubscribe: () => {},
        setUnsubscribe: (fn) => set(() => ({ unsubscribe: fn })),
    }),
);
