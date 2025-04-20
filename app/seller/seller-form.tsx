import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { PostFormSchema, PostFormType } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostTagsEnum } from "@/enums/post";
import { MultiSelect } from "react-native-element-dropdown";

const SellerFormPage = () => {
    const [images, setImages] = useState<(string | null)[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PostFormType>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            caption: "",
            tags: [],
            items: [{ name: "", price: 0, description: "", index: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const onSubmit = (data: PostFormType) => {
        const filteredImages = images.filter((image) => image !== null);
        console.log("Form Data: ", data);
        console.log("imgs: ", filteredImages);
    };

    const openImageLibrary = async (index: number) => {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images", "videos"],
                allowsMultipleSelection: false,
                aspect: [9, 16],
                quality: 1,
            });
            console.log(res);

            if (!res.canceled) {
                const newImages = [...images];
                newImages[index] = res.assets[0].uri;
                setImages(newImages);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const openCamera = async (index: number) => {
        try {
            let res = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images", "videos"],
                aspect: [9, 16],
                quality: 1,
            });
            console.log(res);

            if (!res.canceled) {
                const newImages = [...images];
                newImages[index] = res.assets[0].uri;
                setImages(newImages);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const tags = PostTagsEnum.options.map((tag) => ({
        label: tag,
        value: tag,
    }));

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
                            onChange={(items) => {
                                onChange(items);
                            }}
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
                    <View>
                        {errors.tags && (
                            <Text className="mt-1 text-red-500">
                                {errors.tags.message}
                            </Text>
                        )}
                    </View>
                    {fields.map((field, index) => (
                        <View key={field.id} className="mb-6 border-b pb-4">
                            <Text className="mb-1 font-bold">Item</Text>

                            <Controller
                                control={control}
                                name={`items.${index}.name`}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                                        placeholder="Item Name"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />

                            {errors.items?.[index]?.name && (
                                <Text className="mt-1 text-red-500">
                                    {errors.items[index]?.name?.message}
                                </Text>
                            )}

                            <Text className="mt-2 font-bold">Item Price</Text>

                            <Controller
                                control={control}
                                name={`items.${index}.price`}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                                        placeholder="Enter Price"
                                        keyboardType="numeric"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value === 0 ? "" : String(value)}
                                    />
                                )}
                            />
                            {errors.items?.[index]?.price && (
                                <Text className="mt-1 text-red-500">
                                    {errors.items[index]?.price?.message}
                                </Text>
                            )}

                            <Text className="mt-2 font-bold">Description</Text>
                            <Controller
                                control={control}
                                name={`items.${index}.description`}
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <TextInput
                                        className="rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                                        placeholder="optional"
                                        multiline
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.items?.[index]?.description && (
                                <Text className="mt-1 text-red-500">
                                    {errors.items[index]?.description?.message}
                                </Text>
                            )}

                            {fields.length > 1 && (
                                <TouchableOpacity
                                    className="mt-2 rounded bg-red-500 px-3 py-1"
                                    onPress={() => {
                                        remove(index);
                                        setImages((prevImages) =>
                                            prevImages.filter(
                                                (_, i) => i !== index,
                                            ),
                                        );
                                    }}
                                >
                                    <Text className="text-center text-white">
                                        Remove Item
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <View className="mt-4">
                                <TouchableOpacity
                                    className="self-baseline rounded border px-4 py-2"
                                    onPress={() => openImageLibrary(index)}
                                >
                                    <Text>Open Image Library</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mt-2">
                                <TouchableOpacity
                                    className="self-baseline rounded border px-4 py-2"
                                    onPress={() => openCamera(index)}
                                >
                                    <Text>Open Camera</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mt-2 flex flex-row flex-wrap justify-center">
                                {images[index] ? (
                                    <View>
                                        <Image
                                            source={{ uri: images[index] }}
                                            className="h-20 w-20"
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                const newImages = [...images];
                                                newImages[index] = null;
                                                setImages(newImages);
                                            }}
                                            className="absolute right-0 top-0 z-10 rounded-full bg-red-500 px-1"
                                        >
                                            <Text className="text-xs text-white">
                                                ✕
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity
                        className="mb-4 rounded bg-blue-500 px-4 py-2"
                        onPress={() => {
                            append({
                                name: "",
                                price: 0,
                                description: "",
                                index: fields.length,
                            });
                            setImages((prevImages) => [...prevImages, null]);
                        }}
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
};

export default SellerFormPage;
