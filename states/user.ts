import { UserDataType } from "@/types/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

export interface UserContextData
    extends UserDataType,
        Omit<FirebaseAuthTypes.User, "email"> {}

interface UserStateInterface {
    user: UserContextData | null;
    setUser: (u: UserContextData | null) => void;
    isUserLoading: boolean;
    setIsUserLoading: (data: boolean) => void;
}

export const useUserStore = create<UserStateInterface>((set) => ({
    user: null,
    setUser: (u) => set(() => ({ user: u })),
    isUserLoading: true,
    setIsUserLoading: (data) => set(() => ({ isUserLoading: data })),
}));
