import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Control, Controller, UseFieldArrayRemove } from "react-hook-form";
import { PostFormType } from "@/types/post";

interface ItemFormProps {
    control: Control<PostFormType>;
    index: number;
    field: Record<string, any>;
    errors: any;
    remove: UseFieldArrayRemove;
    images: Record<string, string>;
    setImages: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    openImageLibrary: (fieldId: string) => Promise<void>;
    openCamera: (fieldId: string) => Promise<void>;
    fieldsLength: number;
}

function ItemForm(props: ItemFormProps) {
    const {
        control,
        index,
        field,
        errors,
        remove,
        images,
        setImages,
        openImageLibrary,
        openCamera,
        fieldsLength,
    } = props;

    function handleRemoveImage() {
        setImages((prevImages) => {
            const newImages = { ...prevImages };
            delete newImages[field.id];
            return newImages;
        });
    }

    function handleRemoveItem() {
        remove(index);
        setImages((prevImages) => {
            const newImages = { ...prevImages };
            delete newImages[field.id];
            return newImages;
        });
    }

    return (
        <View key={field.id} className="mb-6 border-b pb-4">
            <Text className="mb-1 font-bold">Item</Text>

            <Controller
                control={control}
                name={`items.${index}.name`}
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, onBlur, value } }) => (
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

            {fieldsLength > 1 && (
                <TouchableOpacity
                    className="mt-2 rounded bg-red-500 px-3 py-1"
                    onPress={handleRemoveItem}
                >
                    <Text className="text-center text-white">Remove Item</Text>
                </TouchableOpacity>
            )}

            <View className="mt-4">
                <TouchableOpacity
                    className="self-baseline rounded border px-4 py-2"
                    onPress={() => openImageLibrary(field.id)}
                >
                    <Text>Open Image Library</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-2">
                <TouchableOpacity
                    className="self-baseline rounded border px-4 py-2"
                    onPress={() => openCamera(field.id)}
                >
                    <Text>Open Camera</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-2 flex flex-row flex-wrap justify-center">
                {images[field.id] && (
                    <View>
                        <Image
                            source={{ uri: images[field.id] }}
                            className="h-20 w-20"
                        />
                        <TouchableOpacity
                            onPress={handleRemoveImage}
                            className="absolute right-0 top-0 z-10 rounded-full bg-red-500 px-1"
                        >
                            <Text className="text-xs text-white">✕</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

export default ItemForm;
