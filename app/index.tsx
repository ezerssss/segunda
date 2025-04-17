import { testOnCall } from "@/firebase/functions";
import useLogin from "@/hooks/useLogin";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function Home() {
    const { isLoading, handleLogin } = useLogin();

    async function test() {
        console.log(await testOnCall());
    }

    return (
        <View className="flex-1">
            <Text className="mb-5 text-2xl font-bold">Hello World</Text>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Text>Sign in using Google</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                className="self-baseline rounded border px-4 py-2"
                onPress={() => test()}
            >
                <Text>Test Cloud Functions</Text>
            </TouchableOpacity>
        </View>
    );
}
