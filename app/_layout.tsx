import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserContext, UserContextData } from "../contexts/userContext";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "../custom-theme.json";
import { default as mapping } from "../custom-mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import auth from "@/firebase/auth";
import { UserDataType } from "@/types/user";
import { doc, getDoc } from "@react-native-firebase/firestore";
import { usersCollectionRef } from "@/constants/collections";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import ModalContentType from "@/types/modalContent";
import BuyerViewBiddersModal from "@/components/action-buttons/buyer-view-bidders-modal";
import SellerViewBiddersModal from "@/components/action-buttons/seller-view-bidders-modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "../utils/native-wind-config";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    const [user, setUser] = useState<UserContextData | null>(null);
    const [modalContent, setModalContent] = useState<ModalContentType>({
        item: null,
        bidders: [],
    });
    const [isBuyerViewModalVisible, setIsBuyerViewModalVisible] =
        useState<boolean>(false);
    const [isSellerViewModalVisible, setIsSellerViewModalVisible] =
        useState<boolean>(false);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                setUser(null);
                return;
            }

            (async () => {
                if (!user) {
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
                }
            })();
        });

        return unsubscribe;
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva}
                customMapping={mapping}
                theme={{ ...eva.light, ...theme }}
            >
                <UserContext.Provider value={{ user, setUser }}>
                    <BiddersModalContext.Provider
                        value={{
                            isBuyerViewModalVisible,
                            isSellerViewModalVisible,
                            modalContent,
                            setIsSellerViewModalVisible,
                            setIsBuyerViewModalVisible,
                            setModalContent,
                        }}
                    >
                        <StatusBar style="auto" />
                        <SafeAreaView className="flex-1 bg-white px-4">
                            <Stack screenOptions={{ headerShown: false }} />
                            <BuyerViewBiddersModal />
                            <SellerViewBiddersModal />
                        </SafeAreaView>
                    </BiddersModalContext.Provider>
                </UserContext.Provider>
            </ApplicationProvider>
        </GestureHandlerRootView>
    );
}
