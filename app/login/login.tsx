import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import useLogin from "@/hooks/useLogin";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import * as Animatable from "react-native-animatable";

function PlaceholderLogo() {
    return (
        <>
            <Text className="font-another mb-5 text-5xl font-bold">
                Segunda
            </Text>
            {/* placehold for logo */}
            <Entypo name="image" size={75} color="black" />
            <View className="mt-5 w-4/6">
                <Text className="text-center text-lg font-light">
                    "Your one stop shop for all your needs as an iskx! Shop now
                    iskx yehey!"
                </Text>
            </View>
        </>
    );
}

export default function Login() {
    const { isLoading, isError, isInternalError, handleLogin } = useLogin();

    const animatedClassName = `font-light text-center  ${isError ? "color-red-600" : ""}`;
    const textAnimation = `${isError ? "shake" : ""}`;
    const signInBarClassName = `mt-8 w-8/12 items-center rounded px-4 py-2 ${!isLoading ? " border" : " border-0"}`;
    const tipMessage = `${isInternalError ? "Oops! It looks like something went wrong with our database. Please try again later." : "Note: Only UP email is allowed. Please use your UP mail to Sign in"}`;
    return (
        <View className="flex-1 items-center justify-center">
            <View className="flex h-1/2 items-center justify-end">
                <PlaceholderLogo />
                <View className="border-b-hairline h-10 w-96 border-black" />
            </View>
            <View className="flex grow items-center justify-between">
                <TouchableOpacity
                    className={signInBarClassName}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator className="w-full" />
                    ) : (
                        <View className="flex-row">
                            <Text
                                className="grow text-center"
                                style={{
                                    textAlignVertical: "center",
                                }}
                            >
                                Sign in using Google
                            </Text>
                            <MaterialCommunityIcons name="gmail" size={25} />
                        </View>
                    )}
                </TouchableOpacity>

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
