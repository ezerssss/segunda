import { useRouter, withLayoutContext } from "expo-router";
import { Icon, Avatar, useTheme, Text } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";

import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useUserStore } from "@/states/user";
import { useChatNotifStore } from "@/states/chat";

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function AppLayout() {
    const router = useRouter();
    const theme = useTheme();
    const indicatorColor = theme["color-primary-500"];
    const { user } = useUserStore();

    const { hasBoughtFromNotif, hasSoldToNotif } = useChatNotifStore();
    const hasNotification = hasBoughtFromNotif || hasSoldToNotif;

    function navigateToChats() {
        router.push("/(protected)/chat/(tabs)/sold-to");
    }

    function navigateToSearch() {
        router.push("/(protected)/search-items");
    }

    return (
        <>
            <View className="flex flex-row items-center justify-between px-4 py-1">
                <Text category="h4">Segunda</Text>
                <View className="flex flex-row gap-4">
                    <TouchableOpacity onPress={navigateToSearch}>
                        <Icon name="search-outline" width={28} height={28} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={navigateToChats}
                        className="relative"
                    >
                        <Icon name="message-circle" width={28} height={28} />
                        {hasNotification && (
                            <View className="absolute right-0 h-3 w-3 rounded-full bg-red-500" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <TopTabs
                screenOptions={{
                    animationEnabled: false,
                    tabBarShowLabel: false,
                    tabBarIndicatorStyle: { backgroundColor: indicatorColor },
                    sceneStyle: { backgroundColor: "white" },
                }}
            >
                <TopTabs.Screen
                    name="home"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name={focused ? "home" : "home-outline"}
                                fill={focused ? indicatorColor : "black"}
                                width={28}
                                height={28}
                            />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="my-items"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name={focused ? "archive" : "archive-outline"}
                                fill={focused ? indicatorColor : "black"}
                                width={28}
                                height={28}
                            />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="catalogue"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name={
                                    focused ? "book-open" : "book-open-outline"
                                }
                                fill={focused ? indicatorColor : "black"}
                                width={28}
                                height={28}
                            />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="notifications"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Icon
                                name={focused ? "bell" : "bell-outline"}
                                fill={focused ? indicatorColor : "black"}
                                width={28}
                                height={28}
                            />
                        ),
                    }}
                />
                <TopTabs.Screen
                    name="profile"
                    options={{
                        tabBarIcon: () => (
                            <Avatar
                                source={{
                                    uri: user?.imageUrl ?? "",
                                }}
                                size="small"
                            />
                        ),
                    }}
                />
            </TopTabs>
        </>
    );
}
