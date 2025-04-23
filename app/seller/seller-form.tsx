import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
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
import { Button, Input } from "@ui-kitten/components";

// Spacer component to handle vertical spacing between elements
const Spacer = ({ size }) => <View style={{ height: size }} />;

function SellerFormPage() {
    const styles = StyleSheet.create({
        dropdown: {
            backgroundColor: "#f0f2f5",
            borderRadius: 8,
            padding: 12,
            marginTop: 4,
            borderColor: "#ccd0d5",
            borderWidth: 1,
        },
        dropdownContainer: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            borderColor: "#ccd0d5",
            borderWidth: 1,
        },
        hashtagChip: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#e4e6eb",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginRight: 8,
            marginBottom: 8,
            marginTop: 8,
            borderWidth: 1,
            borderColor: "#ccd0d5",
        },
        hashtagText: {
            color: "#050505",
            fontWeight: "500",
            marginRight: 6,
        },
        hashtagClose: {
            fontWeight: "bold",
            color: "#65676b",
            fontSize: 16,
            paddingHorizontal: 4,
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasAddedItem, setHasAddedItem] = useState(false);
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
        if (!hasAddedItem) setHasAddedItem(true);
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

    const addNewItemButtonClassName = clsx({ "opacity-50": isLoading });

    return (
        <ScrollView>
            <View className="p-4">
                <Controller
                    control={control}
                    name="caption"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder="Add caption to your post..."
                            multiline
                            textStyle={{ minHeight: 80 }}
                            style={{ backgroundColor: "#f4f4f5" }}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            status={errors.caption ? "danger" : "basic"}
                            caption={
                                errors.caption && (
                                    <Text className="mt-1 text-red-500">
                                        {errors.caption.message}
                                    </Text>
                                )
                            }
                        />
                    )}
                />
                <Spacer size={12} /> {/* Consistent gap between input fields */}
                <Controller
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
                            style={styles.dropdown}
                            containerStyle={styles.dropdownContainer}
                            activeColor="#e7f3ff"
                            selectedStyle={{ display: "none" }}
                            selectedTextStyle={{ display: "none" }}
                            renderSelectedItem={(item, unSelect) => (
                                <View
                                    key={item.value}
                                    style={styles.hashtagChip}
                                >
                                    <Text style={styles.hashtagText}>
                                        #{item.label}
                                    </Text>
                                    <Text
                                        onPress={() =>
                                            unSelect && unSelect(item)
                                        }
                                        style={styles.hashtagClose}
                                    >
                                        ×
                                    </Text>
                                </View>
                            )}
                        />
                    )}
                />
                {errors.tags && (
                    <Text className="mt-1 text-red-500">
                        {errors.tags.message}
                    </Text>
                )}
                <Spacer size={12} />{" "}
                {/* Consistent gap between inputs and buttons */}
                <Button
                    disabled={isLoading}
                    className={addNewItemButtonClassName}
                    onPress={handleAddNewItem}
                >
                    + Add an item
                </Button>
                <Spacer size={12} /> {/* Gap before item forms */}
            </View>
            <View style={{ display: hasAddedItem ? "flex" : "none" }}>
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
            </View>
            <Spacer size={20} /> {/* Gap before the POST button */}
            <View>
                <Button disabled={isLoading} onPress={handleSubmit(onSubmit)}>
                    POST
                </Button>
            </View>
        </ScrollView>
    );
}

export default SellerFormPage;
