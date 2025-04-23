import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PostFormSchema, PostFormType, PostRequestType } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTagsEnum } from "@/enums/post";
import { MultiSelect } from "react-native-element-dropdown";
import ItemForm from "./item-form";
import useUploadImage from "@/hooks/useUploadImage";
import { createPost } from "@/firebase/functions";

function SellerFormPage() {
    const [images, setImages] = useState<string[]>([]);
    const { uploadImage } = useUploadImage();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
    } = useForm<PostFormType>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: "",
            tags: [],
            items: [
                {
                    name: "",
                    price: 0,
                    description: "",
                    index: 0,
                    imageUrl: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = useWatch({ control, name: "items" });

    useEffect(() => {
        const localImages = [...images];
        while (items.length > localImages.length) {
            localImages.push("");
        }
        setImages(localImages);
    }, [items]);

    async function onSubmit(data: PostFormType) {
        let post: PostRequestType = {
            caption: data.caption,
            tags: data.tags,
            items: [],
        };

        for (let i = 0; i < images.length; i++) {
            if (!images[i]) {
                setError(`items.${i}.imageUrl`, {
                    type: "manual",
                    message: "Item image is required.",
                });
                return;
            }
        }

        for (let i = 0; i < data.items.length; i++) {
            let item = {
                ...data.items[i],
            };

            try {
                item.imageUrl = await uploadImage(images[i]);
                post.items.push(item);
            } catch (error) {
                console.error("Upload failed or returned bad URL:", error);
                setError(`items.${i}.imageUrl`, {
                    type: "manual",
                    message: "Image upload failed",
                });
                return;
            }
        }

        try {
            const result = await createPost(post);
            console.log("Post Success:", result);
        } catch (error) {
            console.error("Post Failed:", error);
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
                const localImages = [...images];
                localImages[index] = res.assets[0].uri;
                setImages(localImages);
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
                const localImages = [...images];
                localImages[index] = res.assets[0].uri;
                setImages(localImages);
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
                            remove={remove}
                            images={images}
                            setImages={setImages}
                            openImageLibrary={openImageLibrary}
                            openCamera={openCamera}
                            fieldsLength={fields.length}
                        />
                    ))}

                    <TouchableOpacity
                        className="mb-4 rounded bg-blue-500 px-4 py-2"
                        onPress={handleAddNewItem}
                    >
                        <Text className="text-center text-white">
                            Add Another Item
                        </Text>
                    </TouchableOpacity>

                    <View className="mt-4">
                        <Button
                            title="Post Items"
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default SellerFormPage;
