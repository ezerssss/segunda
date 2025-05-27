import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Divider, Icon, Text } from "@ui-kitten/components";
import auth from "@/firebase/auth";
import { useUserStore } from "@/states/user";
import { router } from "expo-router";
import { IntlFormatFormatOptions } from "date-fns";

export default function Profile() {
    const { user } = useUserStore();

    const formatOptions: IntlFormatFormatOptions = {
        month: "long",
        year: "numeric",
    };

    function navigateToUserSetup() {
        router.push("/(protected)/user-setup");
    }

    return (
        <View className="mx-2 my-4 flex flex-1 gap-4 bg-white">
            <View className="gap-4 rounded-lg border border-gray-200 p-4">
                <View className="flex flex-row items-center gap-4">
                    <Avatar
                        source={{ uri: user?.imageUrl ?? "" }}
                        size="large"
                    />
                    <View>
                        <Text category="h6">{user?.displayName ?? ""}</Text>
                        <View className="flex-row items-center">
                            <Icon name="pin-outline" width={15} fill="gray" />
                            <Text category="c1"> {user?.campus ?? ""}</Text>
                        </View>
                    </View>
                </View>
                <Divider />

                <View className="flex-row items-center gap-1">
                    <Icon name="email-outline" width={15} fill="gray" />
                    <Text>{user?.email ?? ""}</Text>
                </View>
                {!!user?.dateCreated && (
                    <View className="flex-row items-center gap-1">
                        <Icon name="calendar-outline" width={15} fill="gray" />
                        <Text>
                            Joined at {""}
                            {Intl.DateTimeFormat("en-us", formatOptions).format(
                                new Date(user.dateCreated),
                            )}
                        </Text>
                    </View>
                )}
            </View>

            <TouchableOpacity className="w-full" onPress={navigateToUserSetup}>
                <View className="flex flex-row items-center gap-4 p-2">
                    <View className="rounded-full bg-gray-200 p-2">
                        <Icon name="settings-outline" />
                    </View>
                    <View className="flex-1 flex-row justify-between">
                        <Text className="text-lg font-bold">Edit profile</Text>
                        <Icon name="chevron-right-outline" fill="gray" />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full" onPress={() => auth.signOut()}>
                <View className="flex flex-row items-center gap-4 px-2">
                    <View className="rounded-full bg-gray-200 p-2">
                        <Icon name="log-out" />
                    </View>
                    <Text className="text-lg font-bold">Log out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
