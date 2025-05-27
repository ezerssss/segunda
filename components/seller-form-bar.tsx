import { useUserStore } from "@/states/user";
import { Avatar, Input, Divider } from "@ui-kitten/components";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SellerFormBar() {
    const { user } = useUserStore();
    return (
        <>
            <View className="mb-3 mt-4 flex-row items-center gap-2 px-3">
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
                            className="rounded-3xl"
                            style={{ flexGrow: 1 }}
                            textStyle={{ marginLeft: 20 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
        </>
    );
}
