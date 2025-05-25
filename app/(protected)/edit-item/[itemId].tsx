import { Text, Icon, Button, Input, ProgressBar } from "@ui-kitten/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    View,
    TouchableOpacity,
    Image,
    Pressable,
    ToastAndroid,
    ScrollView,
} from "react-native";
import { EditItemRequestType } from "@/types/item";
import useGetItem from "@/hooks/useGetItem";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { editItem } from "@/firebase/functions";
import useUploadImage from "@/hooks/useUploadImage";
import { ITEM_IMAGES_FOLDER } from "@/constants/storage";

export default function EditItemPage() {
    const { itemId } = useLocalSearchParams<{ itemId: string }>();
    const { item, isLoading } = useGetItem(itemId);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const { uploadImages, progress } = useUploadImage();
    const [originalImageUrl, setOriginalImageUrl] = useState("");

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<EditItemRequestType>({
        defaultValues: {
            id: itemId,
            name: "",
            price: 0,
            description: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (item) {
            reset({
                name: item.name,
                price: item.price,
                description: item.description,
                imageUrl: item.imageUrl ?? "",
            });
            setOriginalImageUrl(item.imageUrl ?? "");
        }
    }, [item, reset]);

    const sellerItem = watch();

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

    function handleRemoveImage() {
        setValue("imageUrl", "");
    }

    async function onSave(data: EditItemRequestType) {
        setIsEditing(true);
        try {
            let finalUrl = data.imageUrl;

            const isChanged = data.imageUrl !== originalImageUrl;
            const isNewImage = data.imageUrl.startsWith("file://");

            if (isChanged && isNewImage) {
                const [uploadedUrl] = await uploadImages(
                    [data.imageUrl],
                    ITEM_IMAGES_FOLDER,
                );
                finalUrl = uploadedUrl;
            }

            const updatedItem: EditItemRequestType = {
                ...data,
                imageUrl: finalUrl,
                id: itemId,
            };
            await editItem(updatedItem);
            ToastAndroid.show("Your edit was saved.", ToastAndroid.SHORT);
            reset();
            router.replace(`/(protected)/(tabs)/my-items`);
        } catch (error) {
            console.error("Updating item failed: ", error);
        } finally {
            setIsEditing(false);
        }
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                {isEditing && <ProgressBar progress={progress} />}
                <View className="p-2 px-4">
                    <View className="flex-row items-center justify-between py-4">
                        <View className="flex-row items-center">
                            <Pressable
                                onPress={() =>
                                    router.push("/(protected)/(tabs)/my-items")
                                }
                            >
                                <Icon name="arrow-ios-back-outline" />
                            </Pressable>
                            <Text className="mx-4 text-lg">Edit item</Text>
                        </View>
                        <Button
                            disabled={isLoading}
                            size="small"
                            onPress={handleSubmit(onSave)}
                        >
                            SAVE
                        </Button>
                    </View>
                    <View className="p-2">
                        <View className="mb-2">
                            <Text
                                category="label"
                                className="mb-2 mt-4 font-semibold"
                            >
                                Upload Image
                            </Text>
                            <View className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                                {sellerItem.imageUrl ? (
                                    <Image
                                        source={{ uri: sellerItem.imageUrl }}
                                        className="h-full w-full"
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <View className="absolute inset-0 items-center justify-center">
                                        <Text appearance="hint">
                                            Tap below to upload
                                        </Text>
                                    </View>
                                )}
                                {!!sellerItem.imageUrl && (
                                    <TouchableOpacity
                                        onPress={handleRemoveImage}
                                        className="absolute right-2 top-2 z-10 h-7 w-7 items-center justify-center rounded-full bg-gray-300/50"
                                    >
                                        <Text className="text-sm">✕</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View className="mt-3 flex flex-row justify-between gap-2">
                                <Button
                                    disabled={isLoading}
                                    size="small"
                                    appearance="outline"
                                    status="basic"
                                    onPress={openImageLibrary}
                                    className="flex-1"
                                >
                                    Gallery
                                </Button>
                                <Button
                                    disabled={isLoading}
                                    size="small"
                                    appearance="outline"
                                    status="basic"
                                    onPress={openCamera}
                                    className="flex-1"
                                >
                                    Camera
                                </Button>
                            </View>
                            {errors.imageUrl && (
                                <Text status="danger" className="mt-1">
                                    {errors.imageUrl?.message}
                                </Text>
                            )}
                            <View className="mb-2 mt-4 flex-row items-center">
                                <Text
                                    category="label"
                                    className="mr-2 w-12 font-semibold"
                                >
                                    Item:
                                </Text>
                                <View className="flex-1">
                                    <Controller
                                        control={control}
                                        name="name"
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Enter item name"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                status={
                                                    errors.name
                                                        ? "danger"
                                                        : "basic"
                                                }
                                                caption={errors.name?.message}
                                                textClassName="px-3 outline-none"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <View className="mb-4 flex-row items-center">
                                <Text
                                    category="label"
                                    className="mr-2 w-12 font-semibold"
                                >
                                    Price:
                                </Text>
                                <View className="flex-1">
                                    <Controller
                                        control={control}
                                        name="price"
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <Input
                                                disabled={isLoading}
                                                placeholder="0.00"
                                                keyboardType="numeric"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={
                                                    value === 0
                                                        ? ""
                                                        : String(value)
                                                }
                                                status={
                                                    errors.price
                                                        ? "danger"
                                                        : "basic"
                                                }
                                                caption={errors.price?.message}
                                                textClassName="px-3 outline-none"
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <Controller
                                control={control}
                                name="description"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <Input
                                        disabled={isLoading}
                                        placeholder="Write a description..."
                                        multiline
                                        className="border-0 bg-white"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        status={
                                            errors.description
                                                ? "danger"
                                                : "basic"
                                        }
                                        caption={errors.description?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
