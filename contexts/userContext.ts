import { UserDataType } from "@/types/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext } from "react";
interface UserContextInterface {
    user: FirebaseAuthTypes.User | null;
    setUser: (u: (FirebaseAuthTypes.User & UserDataType) | null) => void;
}
export const UserContext = createContext<UserContextInterface>({
    user: null,
    setUser: () => {},
});
