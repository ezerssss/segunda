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
    isLoading: boolean;
}

function ItemForm(props: ItemFormProps) {
    const {
        control,
        index,
        errors,
        item,
        remove,
        setValue,
        openImageLibrary,
        openCamera,
        fieldsLength,
        isLoading,
    } = props;

    function handleRemoveImage() {
        setValue(`items.${index}.imageUrl`, "");
    }

    function handleRemoveItem() {
        remove(index);
    }

    return (
        <View className="mb-4">
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

                {!!item.imageUrl && (
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
                    onPress={() => openImageLibrary(index)}
                    className="flex-1"
                >
                    Gallery
                </Button>
                <Button
                    disabled={isLoading}
                    size="small"
                    appearance="outline"
                    status="basic"
                    onPress={() => openCamera(index)}
                    className="flex-1"
                >
                    Camera
                </Button>
            </View>

            {errors.items?.[index]?.imageUrl && (
                <Text status="danger" category="c2" className="mt-1">
                    {errors.items[index]?.imageUrl?.message}
                </Text>
            )}

            <View className="mb-2 mt-4 flex-row items-center">
                <Text category="label" className="mr-2 w-12 font-semibold">
                    Item:
                </Text>
                <View className="flex-1">
                    <Controller
                        control={control}
                        name={`items.${index}.name`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                disabled={isLoading}
                                placeholder="Enter item name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                status={
                                    errors.items?.[index]?.name
                                        ? "danger"
                                        : "basic"
                                }
                                caption={errors.items?.[index]?.name?.message}
                                textClassName="px-3 outline-none"
                            />
                        )}
                    />
                </View>
            </View>

            <View className="mb-4 flex-row items-center">
                <Text category="label" className="mr-2 w-12 font-semibold">
                    Price:
                </Text>
                <View className="flex-1">
                    <Controller
                        control={control}
                        name={`items.${index}.price`}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                disabled={isLoading}
                                placeholder="0.00"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value === 0 ? "" : String(value)}
                                status={
                                    errors.items?.[index]?.price
                                        ? "danger"
                                        : "basic"
                                }
                                caption={errors.items?.[index]?.price?.message}
                                textClassName="px-3 outline-none"
                            />
                        )}
                    />
                </View>
            </View>
            <Controller
                control={control}
                name={`items.${index}.description`}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        disabled={isLoading}
                        placeholder="Write a description..."
                        multiline
                        className="border-0 bg-white"
                        onBlur={onBlur}
                        onChangeText={(text) => {
                            onChange(text);
                        }}
                        value={value}
                        status={
                            errors.items?.[index]?.description
                                ? "danger"
                                : "basic"
                        }
                        caption={errors.items?.[index]?.description?.message}
                    />
                )}
            />
            {fieldsLength > 1 && (
                <View className="mt-2">
                    <Button
                        disabled={isLoading}
                        status="danger"
                        appearance="outline"
                        onPress={handleRemoveItem}
                    >
                        Remove Item
                    </Button>
                </View>
            )}
        </View>
    );
}

export default ItemForm;
