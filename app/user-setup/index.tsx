import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { setUpUser } from "@/firebase/functions";
import { SetUpUserRequestType, SetUpUserRequestSchema } from "@/types/user";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserContext } from "@/contexts/userContext";
import { CampusEnum } from "@/enums/campus";
import useUploadImage from "@/hooks/useUploadImage";
import { useRouter } from "expo-router";
import { clsx } from "clsx";

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    Image,
} from "react-native";
import { Divider } from "@ui-kitten/components";
import { AVATAR_IMAGES_FOLDER } from "@/constants/storage";

function UserSetupPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImages } = useUploadImage();
    const router = useRouter();

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
        setIsLoading(true);
        try {
            await uploadImages([imageURI], AVATAR_IMAGES_FOLDER);
            await setUpUser(data);
            router.back();
        } catch (error) {
            console.error("Setup Failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-white">
            <View className="flex-row justify-start">
                <Text className="my-4 text-lg font-semibold">Setup User </Text>
                <Text className="my-4 text-lg color-gray-400">
                    (Step 1 out of 1)
                </Text>
            </View>
            <Divider />
            <View className="my-5 flex items-center">
                <Text className="m-4 text-2xl font-extrabold">Avatar</Text>
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
                <Text className="my-2 text-xl font-extrabold">
                    Display name
                </Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="border-hairline h-14 rounded-md border-black px-3 py-1.5 text-lg text-gray-900"
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
            <View className="flex-col">
                <View className="mb-2 mt-4 flex-row justify-start">
                    <Text className="text-xl font-extrabold">Campus </Text>
                    <Text className="text-xl color-gray-400">
                        (preferred location)
                    </Text>
                </View>
                {CampusEnum.options.map((campus, _) => {
                    return (
                        <TouchableOpacity
                            key={campus}
                            className={clsx(
                                "my-1 grow justify-end rounded-lg px-2 py-3",
                                campus === campusSelected
                                    ? "border border-blue-500"
                                    : "border-hairline border-dashed bg-white",
                            )}
                            onPress={() => handleSetCampus(campus)}
                        >
                            <Text
                                className={clsx(
                                    "text-center text-lg",
                                    campus === campusSelected
                                        ? "font-extrabold color-blue-400"
                                        : "font-semibold color-black",
                                )}
                            >
                                {campus}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity
                className="mt-16 h-12 w-full justify-center rounded bg-blue-400 px-4 py-2"
                onPress={handleSubmit(handleSetupUser)}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator className="w-full color-white" />
                ) : (
                    <Text
                        className="text-center text-xl font-bold color-white"
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
