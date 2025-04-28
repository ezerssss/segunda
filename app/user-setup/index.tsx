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
import { AVATAR_IMAGES_FOLDER } from "@/constants/storage";

import { View, Text, ActivityIndicator, Image } from "react-native";
import { Button, Divider, Input } from "@ui-kitten/components";
import AvatarOptions from "../../components/user/avatar-options";
import CampusSelectionButtons from "../../components/user/campus-buttons";
import { STARTS_WITH_HTTPS } from "@/constants/regex";

function UserSetupPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImages } = useUploadImage();
    const router = useRouter();

    const {
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
    } = useForm<SetUpUserRequestType>({
        resolver: zodResolver(SetUpUserRequestSchema),
        defaultValues: {
            name: user?.displayName ?? "",
            imageUrl: user?.photoURL,
            campus: CampusEnum.Values["Miagao Campus"],
        },
        disabled: isLoading,
    });
    const campusSelected = watch("campus");
    const imageURI = watch("imageUrl");

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
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleRemovePhoto() {
        const defaultImageURI = user?.photoURL ?? "";
        setValue("imageUrl", defaultImageURI);
    }

    function handleSetCampus(campus: string) {
        setValue(
            "campus",
            CampusEnum.options[0] === campus
                ? CampusEnum.options[0]
                : CampusEnum.options[1],
        );
    }

    async function handleSetupUser(data: SetUpUserRequestType) {
        setIsLoading(true);
        try {
            if (data.imageUrl && !STARTS_WITH_HTTPS.test(data.imageUrl)) {
                data.imageUrl = (
                    await uploadImages([imageURI ?? ""], AVATAR_IMAGES_FOLDER)
                )[0];
            }
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
                <View>
                    <View className="aspect-square w-1/2 items-center overflow-hidden rounded-full">
                        <Image
                            source={{ uri: imageURI ?? "" }}
                            className="h-full w-full"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="absolute bottom-0 left-0">
                        <AvatarOptions
                            openImageLibrary={openImageLibrary}
                            openCamera={openCamera}
                            handleRemovePhoto={handleRemovePhoto}
                            isLoading={isLoading}
                        />
                    </View>
                </View>
            </View>

            <View className="mt-5">
                <Text className="my-2 text-xl font-extrabold">
                    Display name
                </Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder="Enter Display Name"
                            onChangeText={onChange}
                            value={value}
                            textClassName="mx-4"
                            disabled={isLoading}
                            status={errors.name ? "danger" : "basic"}
                            caption={errors.name?.message}
                        />
                    )}
                />
            </View>
            <View className="mb-2 mt-4 flex-row justify-start">
                <Text className="text-xl font-extrabold">Campus </Text>
                <Text className="text-xl color-gray-400">
                    (preferred location)
                </Text>
            </View>
            <View>
                <CampusSelectionButtons
                    campusSelected={campusSelected}
                    handleSetCampus={handleSetCampus}
                    isLoading={isLoading}
                />
            </View>

            <View className="mt-16 h-12 w-full justify-center">
                {isLoading ? (
                    <ActivityIndicator
                        className="w-full color-blue-400"
                        color="#60a5fa"
                    />
                ) : (
                    <Button
                        onPress={handleSubmit(handleSetupUser)}
                        disabled={isLoading}
                    >
                        Proceed
                    </Button>
                )}
            </View>
        </View>
    );
}

export default UserSetupPage;
