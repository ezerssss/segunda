import { withLayoutContext } from "expo-router";
import { Icon, Avatar, useTheme } from "@ui-kitten/components";

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
    const indicatorColor = theme["color-primary-500"];

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
                                uri: "https://a.thumbs.redditmedia.com/HaXDOt6VCSDYHNnBG2kmo7xArWVWkl8_QgppfGAQP-0.png",
                            }}
                            size="tiny"
                        />
                    ),
                }}
            />
        </TopTabs>
    );
}
