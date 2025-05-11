import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View className="flex-1 items-center justify-center p-5">
                <Text>This screen doesn't exist.</Text>
                <Link
                    href="/(tabs)/home"
                    className="mt-3.5 rounded border py-3.5"
                >
                    <Text>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}
