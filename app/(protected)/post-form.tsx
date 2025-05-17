import { View, ScrollView, ToastAndroid } from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PostFormSchema, PostFormType, PostRequestType } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTagsEnum } from "@/enums/post";
import ItemForm from "@/components/seller/item-form";
import useUploadImage from "@/hooks/useUploadImage";
import { createPost } from "@/firebase/functions";
import clsx from "clsx";
import {
    Button,
    Input,
    Text,
    Divider,
    ProgressBar,
} from "@ui-kitten/components";
import MultiSelectTags from "@/components/seller/multiselect-tags";
import { ITEM_IMAGES_FOLDER } from "@/constants/storage";
import UserHeader from "@/components/user/user-header";
import { useUserStore } from "@/states/user";

export default function SellerFormPage() {
    const { user } = useUserStore();
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImages, progress } = useUploadImage();

    const {
        control,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm<PostFormType>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: "",
            tags: [],
            items: [],
        },
        disabled: isLoading,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items");

    async function onSubmit(data: PostFormType) {
        setIsLoading(true);

        try {
            const uris = data.items.map((item) => item.imageUrl);
            const urls = await uploadImages(uris, ITEM_IMAGES_FOLDER);
            const post: PostRequestType = {
                caption: data.caption,
                tags: data.tags,
                items: data.items.map((item, index) => ({
                    ...item,
                    imageUrl: urls[index],
                })),
            };
            await createPost(post);
            ToastAndroid.show("Your post was shared.", ToastAndroid.SHORT);
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

    function handlePost() {
        if (items.length < 1) {
            handleAddNewItem();
        }
        handleSubmit(onSubmit)();
    }

    return (
        <ScrollView
            className="bg-white px-4"
            showsVerticalScrollIndicator={false}
        >
            {isLoading && <ProgressBar progress={progress} />}

            <View className="flex-row items-center px-0 py-4">
                <Text className="flex-1 text-lg">Create Post</Text>
                <Button disabled={isLoading} onPress={handlePost} size="small">
                    POST
                </Button>
            </View>
            <Divider />

            {!!user && (
                <UserHeader name={user?.name} imageUrl={user?.imageUrl} />
            )}
            <View className="space-y-14 bg-white px-2">
                <Controller
                    control={control}
                    name="caption"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            disabled={isLoading}
                            placeholder="Add caption to your post..."
                            multiline
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                            }}
                            value={value}
                            status={errors.caption ? "danger" : "basic"}
                            caption={errors.caption?.message}
                            className="border-0 bg-white"
                        />
                    )}
                />
                <View className="mb-4">
                    <Controller
                        disabled={isLoading}
                        control={control}
                        name="tags"
                        render={({ field: { onChange, value } }) => (
                            <MultiSelectTags
                                tags={tags}
                                onChange={onChange}
                                value={value}
                                isLoading={isLoading}
                            />
                        )}
                    />
                    {errors.tags && (
                        <Text status="danger" category="c2" className="mt-1">
                            {errors.tags.message}
                        </Text>
                    )}
                </View>
                <View className={clsx(items.length > 0 ? "flex" : "none")}>
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
                            isLoading={isLoading}
                        />
                    ))}
                </View>
                <Button
                    disabled={isLoading}
                    onPress={handleAddNewItem}
                    appearance="outline"
                >
                    + Add an item
                </Button>
            </View>

            <View className="h-10"></View>
        </ScrollView>
    );
}
