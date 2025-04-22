import { View, Text, TouchableOpacity } from "react-native";
import useLogin from "@/hooks/useLogin";
import { useRouter } from "expo-router";

export default function Home() {
    const router = useRouter();

    return (
        <View className="flex-1">
            <Text className="mb-5 text-2xl font-bold">Hello World</Text>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={() => router.push("/login")}
            >
                <Text>Go to Login page</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={() => router.push("/seller/seller-form")}
            >
                <Text>Go to Seller Form</Text>
            </TouchableOpacity>
        </View>
    );
}
