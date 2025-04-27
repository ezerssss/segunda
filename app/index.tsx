import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FakeImport } from "../types/bidder";

export default function Home() {
    const router = useRouter();

    console.log(FakeImport, "HELLO");

    return (
        <View className="flex-1 bg-white">
            <Text className="mb-5 text-2xl font-bold">Hello World</Text>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={() => router.push("/login")}
            >
                <Text>Go to Login page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={() => router.push("/seller/form")}
            >
                <Text>Go to Seller Form</Text>
            </TouchableOpacity>
        </View>
    );
}
