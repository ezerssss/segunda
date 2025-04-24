import { View, ActivityIndicator } from "react-native";
import useLogin from "@/hooks/useLogin";
import clsx from "clsx";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { Button, Text } from "@ui-kitten/components";

function PlaceholderLogo() {
    return (
        <>
            <Text category="h1">Segunda</Text>
            <View className="mt-5 w-4/6">
                <Text className="text-center" category="p2">
                    Your one stop shop for all your needs as an isko! Shop now
                    isko!
                </Text>
            </View>
        </>
    );
}

export default function Login() {
    const { isLoading, isError, isInternalError, handleLogin } = useLogin();

    const animatedClassName = clsx(
        "text-sm font-light text-center ",
        isError && "color-red-600",
    );

    const textAnimation = clsx({ shake: isError });

    const tipMessage = `${isInternalError ? "Oops! It looks like something went wrong with our database. Please try again later." : "Note: Only UP email is allowed. Please use your UP mail to Sign in"}`;

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="flex h-1/2 items-center justify-end">
                <PlaceholderLogo />
            </View>
            <View className="flex grow items-center justify-between">
                <View className="mt-8 w-3/4 flex-row">
                    {isLoading ? (
                        <ActivityIndicator className="w-full" />
                    ) : (
                        <Button
                            onPress={handleLogin}
                            disabled={isLoading}
                            className="flex-1"
                            accessoryLeft={
                                <MaterialCommunityIcons
                                    name="google"
                                    color="white"
                                    size={20}
                                />
                            }
                        >
                            Sign in using Google
                        </Button>
                    )}
                </View>

                <View className="mb-16 w-4/6">
                    <Animatable.Text
                        animation={textAnimation}
                        className={animatedClassName}
                    >
                        {tipMessage}
                    </Animatable.Text>
                </View>
            </View>
        </View>
    );
}
