import { View, ScrollView, ToastAndroid, ImageBackground } from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PostFormSchema, PostFormType, PostRequestType } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTagsEnum } from "@/enums/post";
import { MultiSelect } from "react-native-element-dropdown";
import ItemForm from "./item-form";
import useUploadImage from "@/hooks/useUploadImage";
import { createPost } from "@/firebase/functions";
import clsx from "clsx";
import {
    Button,
    Input,
    Avatar,
    Text,
    Divider,
    useTheme,
} from "@ui-kitten/components";
import multiSelectStyle from "@/styles/multiselect";
import { UserContext } from "@/contexts/userContext";

function SellerFormPage() {
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { uploadImage } = useUploadImage();
    const theme = useTheme();

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
            items: [],
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
        <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
            <View className="flex-row items-center px-0 py-4">
                <Text className="flex-1 text-lg">Create Post</Text>
                <Button disabled={isLoading} onPress={handlePost} size="small">
                    POST
                </Button>
            </View>
            <Divider />

            {!!user && (
                <View className="flex-row items-center gap-4 px-2 py-4">
                    <Avatar
                        source={{ uri: user.photoURL ?? "" }}
                        ImageComponent={ImageBackground}
                        size="large"
                    />
                    <View>
                        <Text category="h6">{user.displayName ?? ""}</Text>
                        <Text category="c1">
                            {new Date().toLocaleDateString()}
                        </Text>
                    </View>
                </View>
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
                            <MultiSelect
                                data={tags}
                                labelField="label"
                                valueField="value"
                                placeholder="Select tags"
                                value={value}
                                onChange={onChange}
                                style={multiSelectStyle.dropdown}
                                containerStyle={
                                    multiSelectStyle.dropdownContainer
                                }
                                activeColor={theme["color-primary-100"]}
                                selectedStyle={{ display: "none" }}
                                selectedTextStyle={{ display: "none" }}
                                renderSelectedItem={(item, unSelect) => (
                                    <View
                                        key={item.value}
                                        style={{
                                            ...multiSelectStyle.hashtagChip,
                                            backgroundColor:
                                                theme["color-primary-500"],
                                        }}
                                    >
                                        <Text
                                            style={multiSelectStyle.hashtagText}
                                        >
                                            #{item.label}
                                        </Text>
                                        <Text
                                            onPress={() =>
                                                unSelect && unSelect(item)
                                            }
                                            style={
                                                multiSelectStyle.hashtagClose
                                            }
                                        >
                                            ×
                                        </Text>
                                    </View>
                                )}
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

export default SellerFormPage;
