import { usersCollectionRef } from "@/constants/collections";
import auth from "@/firebase/auth";
import { useUserStore } from "@/states/user";
import { UserDataType } from "@/types/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { doc, getDoc } from "@react-native-firebase/firestore";
import { useEffect } from "react";

function useAuthStateChange() {
    const { setUser, setIsUserLoading } = useUserStore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                setUser(null);
                setIsUserLoading(false);
                return;
            }

            (async () => {
                if (!user) {
                    setIsUserLoading(false);
                    return;
                }

                try {
                    const userDocRef = doc(usersCollectionRef, user.uid);
                    const userDoc = await getDoc(userDocRef);
                    const userData = userDoc.data() as UserDataType;
                    const firebaseUserJson =
                        user.toJSON() as FirebaseAuthTypes.User;
                    setUser({ ...firebaseUserJson, ...userData });
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsUserLoading(false);
                }
            })();
        });

        return unsubscribe;
    }, []);
}

export default useAuthStateChange;
