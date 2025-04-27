import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
// import { setUpUser } from "@/firebase/functions";
import { SetUpUserRequestType, SetUpUserRequestSchema } from "@/types/user";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/contexts/userContext";
import { clsx } from "clsx";

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
} from "react-native";
import { CampusEnum } from "@/enums/campus";
import { Divider } from "@ui-kitten/components";

function UserSetupPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [campusSelected, setCampusSelected] = useState(
        CampusEnum.Values["Miagao Campus"].toString(),
    );
    const [imageURI, setImageURI] = useState(user?.photoURL ?? "");
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<SetUpUserRequestType>({
        resolver: zodResolver(SetUpUserRequestSchema),
        defaultValues: {
            name: user?.displayName ?? "",
            imageUrl: imageURI,
            campus: CampusEnum.Values["Miagao Campus"],
        },
    });
    async function openImageLibrary() {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: false,
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                setValue("imageUrl", res.assets[0].uri);
                setImageURI(res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function openCamera() {
        try {
            let res = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                setValue("imageUrl", res.assets[0].uri);
                setImageURI(res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleSetCampus(campus: string) {
        setValue(
            "campus",
            CampusEnum.options[0] === campus
                ? CampusEnum.options[0]
                : CampusEnum.options[1],
        );
        setCampusSelected(campus);
    }

    async function handleSetupUser(data: SetUpUserRequestType) {
        console.log(data);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <View className="flex-1 bg-white">
            <Text className="my-4 text-lg">Setup User (Step 1 out of 1)</Text>
            <Divider />
            <View className="my-5 flex items-center">
                <View className="aspect-square w-1/2 items-center overflow-hidden rounded-full">
                    <Image
                        source={{ uri: imageURI }}
                        className="h-full w-full"
                        resizeMode="cover"
                    />
                </View>
            </View>

            <View className="flex-row justify-center">
                <TouchableOpacity
                    className="m-2 rounded border px-4 py-2"
                    onPress={openImageLibrary}
                >
                    <Text>Upload new image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="m-2 rounded border px-4 py-2"
                    onPress={openCamera}
                >
                    <Text>Take a picture</Text>
                </TouchableOpacity>
            </View>
            <View className="mt-5">
                <Text className="text-lg">Display Name</Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                            placeholder="Enter Display Name"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.name && (
                    <Text className="mt-1 text-red-500">
                        {errors.name.message}
                    </Text>
                )}
            </View>
            <View className="flex-row">
                {CampusEnum.options.map((campus, _) => {
                    return (
                        <TouchableOpacity
                            key={campus}
                            className={clsx(
                                "mx-2 my-4 grow justify-end rounded-lg px-2 py-4",
                                campus === campusSelected
                                    ? "border-2 border-blue-500 bg-blue-400"
                                    : "border-hairline bg-white",
                            )}
                            onPress={() => handleSetCampus(campus)}
                        >
                            <Text
                                className={clsx(
                                    "text-center text-lg font-extrabold",
                                    campus !== campusSelected
                                        ? "color-blue-400"
                                        : "color-white",
                                )}
                            >
                                {campus}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {errors.campus && (
                <Text className="mt-1 text-red-500">
                    This is a required field. Please select a campus.
                </Text>
            )}

            <TouchableOpacity
                className="mt-10 h-10 w-full justify-center rounded border px-4 py-2"
                onPress={handleSubmit(handleSetupUser)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator className="w-full" />
                ) : (
                    <Text
                        className="text-center"
                        style={{ textAlignVertical: "center" }}
                    >
                        Proceed
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default UserSetupPage;
