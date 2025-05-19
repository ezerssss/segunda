import { View, TouchableOpacity, Image } from "react-native";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { ItemFormType } from "@/types/item";
import { Input, Button, Text } from "@ui-kitten/components";

interface EditItemFormProps {
    control: Control<ItemFormType>;
    errors: any;
    item: ItemFormType;
    setValue: UseFormSetValue<ItemFormType>;
    openImageLibrary: () => Promise<void>;
    openCamera: () => Promise<void>;
    isLoading: boolean;
}

export default function EditItemForm(props: EditItemFormProps) {
    const {
        control,
        errors,
        item,
        setValue,
        openImageLibrary,
        openCamera,
        isLoading,
    } = props;

    function handleRemoveImage() {
        setValue("imageUrl", "");
    }

    return (
        <View className="mb-2">
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
                    onPress={openImageLibrary}
                    className="flex-1"
                >
                    Gallery
                </Button>
                <Button
                    disabled={isLoading}
                    size="small"
                    appearance="outline"
                    status="basic"
                    onPress={openCamera}
                    className="flex-1"
                >
                    Camera
                </Button>
            </View>

            {errors.imageUrl && (
                <Text status="danger" className="mt-1">
                    {errors.imageUrl?.message}
                </Text>
            )}

            <View className="mb-2 mt-4 flex-row items-center">
                <Text category="label" className="mr-2 w-12 font-semibold">
                    Item:
                </Text>
                <View className="flex-1">
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                disabled={isLoading}
                                placeholder="Enter item name"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                status={errors.name ? "danger" : "basic"}
                                caption={errors.name?.message}
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
                        name="price"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                disabled={isLoading}
                                placeholder="0.00"
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value === 0 ? "" : String(value)}
                                status={errors.price ? "danger" : "basic"}
                                caption={errors.price?.message}
                                textClassName="px-3 outline-none"
                            />
                        )}
                    />
                </View>
            </View>

            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        disabled={isLoading}
                        placeholder="Write a description..."
                        multiline
                        className="border-0 bg-white"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        status={errors.description ? "danger" : "basic"}
                        caption={errors.description?.message}
                    />
                )}
            />
        </View>
    );
}
