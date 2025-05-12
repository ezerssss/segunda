import { withLayoutContext } from "expo-router";
import { Icon, Avatar, useTheme } from "@ui-kitten/components";

import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function AppLayout() {
    const theme = useTheme();
    const indicatorColor = theme["color-primary-500"];
    const { user } = useContext(UserContext);

    return (
        <TopTabs
            screenOptions={{
                animationEnabled: false,
                tabBarShowLabel: false,
                tabBarIndicatorStyle: { backgroundColor: indicatorColor },
            }}
        >
            <TopTabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? "home" : "home-outline"}
                            fill={focused ? indicatorColor : "black"}
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
                        />
                    ),
                }}
            />
            <TopTabs.Screen
                name="catalogue"
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name={focused ? "book-open" : "book-open-outline"}
                            fill={focused ? indicatorColor : "black"}
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
                            size="tiny"
                        />
                    ),
                }}
            />
        </TopTabs>
    );
}
