import { Text } from "react-native";
import { Redirect, withLayoutContext } from "expo-router";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";
import { Icon, Avatar } from "@ui-kitten/components";

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
    const { user, isUserLoading } = useContext(UserContext);

    if (isUserLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return (
        <TopTabs>
            {/* <TopTabs.Screen
                name="home/index"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Icon name="home-outline" />,
                }}
            /> */}
            <TopTabs.Screen
                name="my-items"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Icon name="archive-outline" />,
                }}
            />
            <TopTabs.Screen
                name="catalogue"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Icon name="book-open-outline" />,
                }}
            />
            <TopTabs.Screen
                name="notifications"
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: () => <Icon name="bell-outline" />,
                }}
            />
            <TopTabs.Screen
                name="profile"
                options={{
                    tabBarShowLabel: false,
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

            {/* <TopTabs.Screen
                name="home/view-post"
                options={{
                    href: null,
                }}
            />
            <TopTabs.Screen
                name="home/seller/form"
                options={{
                    href: null,
                }}
            />
            <TopTabs.Screen
                name="user-setup/index"
                options={{
                    href: null,
                }}
            /> */}
        </TopTabs>
    );
}
