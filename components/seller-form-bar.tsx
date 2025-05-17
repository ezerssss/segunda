import { useUserStore } from "@/states/user";
import { Avatar, Input } from "@ui-kitten/components";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SellerFormBar() {
    const { user } = useUserStore();
    return (
        <View className="mx-2 my-4 flex-row items-center">
            <Avatar
                source={{
                    uri: user?.imageUrl ?? "",
                }}
                size="large"
            />
            <TouchableOpacity
                className="flex-1"
                onPress={() => {
                    router.push("/(protected)/post-form");
                }}
            >
                <View pointerEvents="none">
                    <Input
                        placeholder={"What would you like to post?"}
                        className="mx-4 rounded-full"
                        style={{ flexGrow: 1 }}
                        textStyle={{ marginLeft: 20 }}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}
