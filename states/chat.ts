import { create } from "zustand";

interface ChatNotificationStateInterface {
    hasBoughtFromNotif: boolean;
    setHasBoughtFromNotif: (data: boolean) => void;
    hasSoldToNotif: boolean;
    setHasSoldToNotif: (data: boolean) => void;
}

export const useChatNotifStore = create<ChatNotificationStateInterface>(
    (set) => ({
        hasBoughtFromNotif: false,
        setHasBoughtFromNotif: (data) =>
            set(() => ({ hasBoughtFromNotif: data })),
        hasSoldToNotif: false,
        setHasSoldToNotif: (data) => set(() => ({ hasSoldToNotif: data })),
    }),
);
