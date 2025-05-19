import { Text, Icon } from "@ui-kitten/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { ItemFormType } from "@/types/item";
import useManageItems from "@/hooks/useManageItems";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import EditItemForm from "@/components/seller/edit-item-form";
import * as ImagePicker from "expo-image-picker";

export default function EditItemPage() {
    const { itemId } = useLocalSearchParams<{ itemId: string }>();
    const { item } = useManageItems(itemId);
    const router = useRouter();

    const {
        control,
        watch,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ItemFormType>({
        defaultValues: {
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

    return (
        <>
            <View className="p-2">
                <View className="flex-row items-center p-2">
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/(protected)/(tabs)/my-items")
                        }
                    >
                        <Icon name="arrow-ios-back-outline" />
                    </TouchableOpacity>
                    <Text className="p-4 text-[25px] font-bold color-black">
                        Edit item
                    </Text>
                    <TouchableOpacity className="ml-auto mr-4">
                        <Text className="text-xl">Save</Text>
                    </TouchableOpacity>
                </View>
                <View className="p-4">
                    <EditItemForm
                        control={control}
                        errors={errors}
                        item={sellerItem}
                        setValue={setValue}
                        openImageLibrary={openImageLibrary}
                        openCamera={openCamera}
                        isLoading={isSubmitting}
                    />
                </View>
            </View>
        </>
    );
}
