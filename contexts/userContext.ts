import { UserDataType } from "@/types/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext } from "react";

export interface UserContextData
    extends UserDataType,
        Omit<FirebaseAuthTypes.User, "email"> {}

interface UserContextInterface {
    user: UserContextData | null;
    setUser: (u: UserContextData | null) => void;
    isUserLoading: boolean;
    setIsUserLoading: (data: boolean) => void;
}
export const UserContext = createContext<UserContextInterface>({
    user: null,
    setUser: () => {},
    isUserLoading: true,
    setIsUserLoading: () => {},
});
