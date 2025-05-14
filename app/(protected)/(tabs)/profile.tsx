import { View } from "react-native";
import React from "react";
import { Button, Text } from "@ui-kitten/components";
import auth from "@/firebase/auth";

export default function Profile() {
    return (
        <View className="mx-2 my-4 flex flex-1 gap-2 bg-white">
            <Text category="h5">Menu</Text>
            <View className="flex-1"></View>
            <Button
                className="w-full"
                status="basic"
                onPress={() => auth.signOut()}
            >
                Log Out
            </Button>
        </View>
    );
}
