import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { setUpUser } from "@/firebase/functions";
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
} from "react-native";
import { CampusEnum } from "@/enums/campus";

function campusSelector() {
    return (
        <View className="w-4/5 flex-row">
            <TouchableOpacity className="grow">
                <Text>Miagao Campus</Text>
            </TouchableOpacity>
            <TouchableOpacity className="grow">
                <Text>City Campus</Text>
            </TouchableOpacity>
        </View>
    );
}

function UserSetupPage() {
    const { user } = useContext(UserContext);
    const [campusSelected, setCampusSelected] = useState("");
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<SetUpUserRequestType>({
        resolver: zodResolver(SetUpUserRequestSchema),
        defaultValues: {
            name: user?.displayName ?? "",
            imageUrl: "",
            campus: "Miagao Campus",
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

    function handleSetCampus(campus: string) {
        setCampusSelected(campus);
    }

    async function handleSetupUser(data: SetUpUserRequestType) {
        console.log(data);
    }

    return (
        <View className="flex-1">
            <TouchableOpacity
                className="rounded border px-4 py-2"
                onPress={openImageLibrary}
            >
                <Text>Upload new image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="rounded border px-4 py-2"
                onPress={openCamera}
            >
                <Text>Take a picture</Text>
            </TouchableOpacity>
            <Text>Display Name</Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { value } }) => (
                    <TextInput
                        className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                        placeholder="Enter Display Name"
                        value={value}
                    />
                )}
            />
            {errors.name && (
                <Text className="mt-1 text-red-500">{errors.name.message}</Text>
            )}

            <View className="flex-row">
                {CampusEnum.options.map((campus, _) => {
                    return (
                        <TouchableOpacity
                            key={campus}
                            className={clsx(
                                "my-2 grow px-4 py-2",
                                campus == campusSelected
                                    ? "border border-blue-500"
                                    : "border border-gray-300",
                            )}
                            onPress={() => handleSetCampus(campus)}
                        >
                            <Text>{campus}</Text>
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
                className="rounded border px-4 py-2"
                onPress={handleSubmit(handleSetupUser)}
            >
                <Text>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UserSetupPage;
