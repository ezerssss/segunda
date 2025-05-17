import { withLayoutContext } from "expo-router";
import { useTheme, Text } from "@ui-kitten/components";

import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function AppLayout() {
    const theme = useTheme();

    return (
        <>
            <Text category="h4" className="px-4 py-1">
                Chats
            </Text>
            <TopTabs
                screenOptions={{
                    animationEnabled: false,
                    tabBarIndicatorStyle: {
                        backgroundColor: theme["color-primary-500"],
                    },
                    tabBarActiveTintColor: theme["color-primary-500"],
                    tabBarInactiveTintColor: "black",
                    sceneStyle: { backgroundColor: "white" },
                }}
            >
                <TopTabs.Screen name="sold-to" options={{ title: "Sold To" }} />
                <TopTabs.Screen
                    name="bought-from"
                    options={{ title: "Bought From" }}
                />
            </TopTabs>
        </>
    );
}
