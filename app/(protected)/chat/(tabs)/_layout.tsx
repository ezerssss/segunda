import { withLayoutContext } from "expo-router";
import { useTheme, Text } from "@ui-kitten/components";

import {
    MaterialTopTabBarProps,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useChatNotifStore } from "@/states/chat";
import { TouchableOpacity, View } from "react-native";
import clsx from "clsx";

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

function CustomTopTabBar(props: MaterialTopTabBarProps) {
    const { state, navigation } = props;
    const { hasSoldToNotif, hasBoughtFromNotif } = useChatNotifStore();
    const theme = useTheme();

    function handlePress(index: number) {
        const route = state.routes[index];
        const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
        });

        if (state.index !== index && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    }

    const currentIndex = state.index;

    return (
        <View className="flex-row gap-3 p-4">
            <TouchableOpacity
                className="relative self-start rounded-3xl p-3"
                style={{
                    backgroundColor:
                        currentIndex === 0
                            ? theme["color-primary-100"]
                            : "white",
                }}
                onPress={() => handlePress(0)}
            >
                <Text
                    className={clsx(
                        currentIndex === 0 && "text-blue-600",
                        "mx-2 font-bold",
                    )}
                >
                    Sold To
                </Text>
                {hasSoldToNotif && (
                    <View className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
                )}
            </TouchableOpacity>
            <TouchableOpacity
                className="relative self-start rounded-3xl p-3"
                style={{
                    backgroundColor:
                        currentIndex === 1
                            ? theme["color-primary-100"]
                            : "white",
                }}
                onPress={() => handlePress(1)}
            >
                <Text
                    className={clsx(
                        currentIndex === 1 && "text-blue-600",
                        "mx-2 font-bold",
                    )}
                >
                    Bought From
                </Text>
                {hasBoughtFromNotif && (
                    <View className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500" />
                )}
            </TouchableOpacity>
        </View>
    );
}

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
                tabBar={CustomTopTabBar}
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
