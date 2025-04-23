import { View, TouchableOpacity, Image } from "react-native";
import {
    Control,
    Controller,
    UseFieldArrayRemove,
    UseFormSetValue,
} from "react-hook-form";
import { ItemFormType } from "@/types/item";
import { PostFormType } from "@/types/post";
import { Input, Button, Text } from "@ui-kitten/components";

interface ItemFormProps {
    control: Control<PostFormType>;
    index: number;
    errors: any;
    item: ItemFormType;
    remove: UseFieldArrayRemove;
    setValue: UseFormSetValue<PostFormType>;
    openImageLibrary: (index: number) => Promise<void>;
    openCamera: (index: number) => Promise<void>;
    fieldsLength: number;
}

function ItemForm({
    control,
    index,
    errors,
    item,
    remove,
    setValue,
    openImageLibrary,
    openCamera,
    fieldsLength,
}: ItemFormProps) {
    const handleRemoveImage = () => {
        setValue(`items.${index}.imageUrl`, "");
    };

    const handleRemoveItem = () => {
        remove(index);
    };

    return (
        <View className="mb-6 border-b border-gray-200 px-4 pb-6">
            {/* Upload Image */}
            <Text category="label" className="mb-2 mt-4 font-semibold">
                Upload Image
            </Text>

            <View className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {item.imageUrl ? (
                    <Image
                        source={{ uri: item.imageUrl }}
                        className="h-full w-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="absolute inset-0 items-center justify-center">
                        <Text appearance="hint">Tap below to upload</Text>
                    </View>
                )}

                {item.imageUrl && (
                    <TouchableOpacity
                        onPress={handleRemoveImage}
                        className="absolute right-2 top-2 z-10 h-7 w-7 items-center justify-center rounded-full bg-black/70"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.15,
                            shadowRadius: 2,
                            elevation: 2,
                        }}
                    >
                        <Text className="text-sm font-semibold text-white">
                            ✕
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View className="mt-3 flex flex-row justify-between">
                <Button
                    size="small"
                    appearance="outline"
                    status="basic"
                    onPress={() => openImageLibrary(index)}
                    style={{ flex: 1, marginRight: 6 }}
                >
                    Gallery
                </Button>
                <Button
                    size="small"
                    appearance="outline"
                    status="basic"
                    onPress={() => openCamera(index)}
                    style={{ flex: 1, marginLeft: 6 }}
                >
                    Camera
                </Button>
            </View>

            {errors.items?.[index]?.imageUrl && (
                <Text status="danger" category="c2" className="mt-1">
                    {errors.items[index]?.imageUrl?.message}
                </Text>
            )}

            {/* Item Name */}
            <Text category="label" className="mb-2 mt-6 font-semibold">
                Item Name
            </Text>
            <Controller
                control={control}
                name={`items.${index}.name`}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Enter item name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        status={
                            errors.items?.[index]?.name ? "danger" : "basic"
                        }
                        caption={errors.items?.[index]?.name?.message}
                    />
                )}
            />

            {/* Price */}
            <Text category="label" className="mb-2 mt-6 font-semibold">
                Price
            </Text>
            <Controller
                control={control}
                name={`items.${index}.price`}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="0.00"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value === 0 ? "" : String(value)}
                        status={
                            errors.items?.[index]?.price ? "danger" : "basic"
                        }
                        caption={errors.items?.[index]?.price?.message}
                    />
                )}
            />

            <Text category="label" className="mb-2 mt-6 font-semibold">
                Description
            </Text>
            <Controller
                control={control}
                name={`items.${index}.description`}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Write a description..."
                        multiline
                        textStyle={{ minHeight: 80 }}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        status={
                            errors.items?.[index]?.description
                                ? "danger"
                                : "basic"
                        }
                        caption={errors.items?.[index]?.description?.message}
                        style={{ backgroundColor: "#f4f4f5" }}
                    />
                )}
            />

            {/* Remove Button */}
            {fieldsLength > 1 && (
                <Button
                    status="danger"
                    appearance="ghost"
                    onPress={handleRemoveItem}
                    className="mt-6"
                >
                    Remove Item
                </Button>
            )}
        </View>
    );
}

export default ItemForm;
