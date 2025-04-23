import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PostFormSchema, PostFormType, PostRequestType } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTagsEnum } from "@/enums/post";
import { MultiSelect } from "react-native-element-dropdown";
import ItemForm from "./item-form";
import useUploadImage from "@/hooks/useUploadImage";
import { createPost } from "@/firebase/functions";
import clsx from "clsx";

function SellerFormPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImage } = useUploadImage();

    const {
        control,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
        reset,
    } = useForm<PostFormType>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: "",
            tags: [],
            items: [
                { name: "", price: 0, description: "", index: 0, imageUrl: "" },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items");

    async function onSubmit(data: PostFormType) {
        setIsLoading(true);

        let post: PostRequestType = {
            caption: data.caption,
            tags: data.tags,
            items: [],
        };

        for (const itemData of data.items) {
            let item = {
                ...itemData,
            };

            try {
                item.imageUrl = await uploadImage(item.imageUrl);
                post.items.push(item);
            } catch (error) {
                console.error("Upload failed or returned bad URL:", error);
                setError(`items.${item.index}.imageUrl`, {
                    type: "manual",
                    message: "Image upload failed",
                });
                setIsLoading(false);
                return;
            }
        }

        try {
            await createPost(post);
            Alert.alert("Success", "Your post was created!");
            reset();
        } catch (error) {
            console.error("Post Failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function openImageLibrary(index: number) {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: false,
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                setValue(`items.${index}.imageUrl`, res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function openCamera(index: number) {
        try {
            let res = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                setValue(`items.${index}.imageUrl`, res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function handleAddNewItem() {
        append({
            name: "",
            price: 0,
            description: "",
            index: fields.length,
            imageUrl: "",
        });
    }

    const tags = PostTagsEnum.options.map((tag) => ({
        label: tag,
        value: tag,
    }));

    useEffect(() => {
        fields.forEach((_, idx) => {
            setValue(`items.${idx}.index`, idx);
        });
    }, [fields, setValue]);

    const addNewItemButtonClass = clsx("mb-4 rounded bg-blue-500 px-4 py-2", {
        "opacity-50": isLoading,
    });

    return (
        <>
            <View className="p-4">
                <Text className="mb-1 font-bold">Caption</Text>
                <Controller
                    control={control}
                    name="caption"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                            placeholder="Enter Caption"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.caption && (
                    <Text className="mt-1 text-red-500">
                        {errors.caption.message}
                    </Text>
                )}
                <Text className="mt-2 font-bold">Tags</Text>
                <Controller
                    control={control}
                    name="tags"
                    render={({ field: { onChange, value } }) => (
                        <MultiSelect
                            style={{
                                backgroundColor: "rgb(209, 213, 219)",
                                borderRadius: 6,
                                padding: 8,
                                marginTop: 4,
                            }}
                            selectedTextStyle={{ color: "black" }}
                            data={tags}
                            labelField="label"
                            valueField="value"
                            placeholder="Select tags"
                            value={value}
                            onChange={onChange}
                            selectedStyle={{
                                borderRadius: 12,
                                backgroundColor: "skyblue",
                            }}
                            activeColor="skyblue"
                        />
                    )}
                />
                {errors.tags && (
                    <Text className="mt-1 text-red-500">
                        {errors.tags.message}
                    </Text>
                )}
            </View>
            <ScrollView>
                <View className="p-4">
                    {fields.map((field, index) => (
                        <ItemForm
                            key={field.id}
                            control={control}
                            index={index}
                            errors={errors}
                            item={items[index]}
                            remove={remove}
                            setValue={setValue}
                            openImageLibrary={openImageLibrary}
                            openCamera={openCamera}
                            fieldsLength={fields.length}
                        />
                    ))}

                    <TouchableOpacity
                        disabled={isLoading}
                        className={addNewItemButtonClass}
                        onPress={handleAddNewItem}
                    >
                        <Text className="text-center text-white">
                            Add Another Item
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-4">
                        <Button
                            disabled={isLoading}
                            title={isLoading ? "Posting..." : "Post Items"}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default SellerFormPage;
