import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { BackHandler, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "../custom-theme.json";
import { default as mapping } from "../custom-mapping.json";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BuyerViewBiddersModal from "@/components/action-buttons/buyer-view-bidders-modal";
import SellerViewBiddersModal from "@/components/action-buttons/seller-view-bidders-modal";
import useAuthStateChange from "@/hooks/useAuthStateChange";

import * as eva from "@eva-design/eva";
import * as SplashScreen from "expo-splash-screen";
import "../utils/native-wind-config";
import "../global.css";
import "react-native-reanimated";
import "../components/action-buttons/sheet.tsx";
import { SheetProvider } from "react-native-actions-sheet";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });
    useEffect(() => {
        const onBackPress = () => {
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress,
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useAuthStateChange();

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
                <StatusBar style="auto" />
                <SafeAreaView className="flex-1 bg-white">
                    <SheetProvider>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: "white" },
                            }}
                        />
                        <View className="flex items-center">
                            <BuyerViewBiddersModal />
                            <SellerViewBiddersModal />
                        </View>
                    </SheetProvider>
                </SafeAreaView>
            </ApplicationProvider>
        </GestureHandlerRootView>
    );
}
