import { TouchableOpacity, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { memo } from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import useResetStore from "@/hooks/useResetStore";

interface PostItemImagesProps {
    postId: string;
    imageUrls: string[];
    blurHashes: string[];
}

function PostItemImages(props: PostItemImagesProps) {
    const { postId, imageUrls, blurHashes } = props;
    const { resetPostStore } = useResetStore();

    const count = Math.min(imageUrls.length, 4);

    function navigateToViewPost(index: number) {
        resetPostStore();
        router.push(`/(protected)/view-post/${postId}?index=${index}`);
    }

    if (count === 1) {
        return (
            <TouchableOpacity
                className="aspect-square w-full flex-1"
                onPress={() => navigateToViewPost(0)}
            >
                <Image
                    source={{ uri: imageUrls[0] }}
                    className="flex-1"
                    contentFit="cover"
                    placeholder={{ blurhash: blurHashes[0] }}
                    placeholderContentFit="cover"
                />
            </TouchableOpacity>
        );
    }

    if (count === 2) {
        return (
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(0, 2).map((uri, index) => (
                    <TouchableOpacity
                        key={uri}
                        className="aspect-square flex-1"
                        onPress={() => navigateToViewPost(index)}
                    >
                        <Image
                            source={{ uri }}
                            className="flex-1"
                            contentFit="cover"
                            placeholder={{ blurhash: blurHashes[index] }}
                            placeholderContentFit="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    if (count === 3) {
        return (
            <View className="flex-row gap-[1px]">
                <TouchableOpacity
                    className="flex-1"
                    onPress={() => navigateToViewPost(0)}
                >
                    <Image
                        source={{ uri: imageUrls[0] }}
                        className="flex-1"
                        contentFit="cover"
                        placeholder={{ blurhash: blurHashes[0] }}
                        placeholderContentFit="cover"
                    />
                </TouchableOpacity>

                <View className="w-[40%] gap-[1px]">
                    {imageUrls.slice(1, 3).map((uri, index) => (
                        <TouchableOpacity
                            key={uri}
                            className="aspect-square flex-1"
                            onPress={() => navigateToViewPost(index + 1)}
                        >
                            <Image
                                source={{ uri }}
                                className="flex-1"
                                contentFit="cover"
                                placeholder={{
                                    blurhash: blurHashes[index + 1],
                                }}
                                placeholderContentFit="cover"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View className="flex flex-col gap-[1px]">
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(0, 2).map((uri, index) => (
                    <TouchableOpacity
                        key={uri}
                        className="aspect-square flex-1"
                        onPress={() => navigateToViewPost(index)}
                    >
                        <Image
                            source={{ uri }}
                            className="flex-1"
                            contentFit="cover"
                            placeholder={{ blurhash: blurHashes[index] }}
                            placeholderContentFit="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(2, 4).map((uri, index) => (
                    <View key={uri} className="relative aspect-square flex-1">
                        <TouchableOpacity
                            className="aspect-square flex-1"
                            onPress={() => navigateToViewPost(index + 2)}
                        >
                            <Image
                                source={{ uri }}
                                contentFit="cover"
                                className="flex-1"
                                placeholder={{
                                    blurhash: blurHashes[index + 2],
                                }}
                                placeholderContentFit="cover"
                            />
                        </TouchableOpacity>
                        {index === 1 && imageUrls.length > 4 && (
                            <View className="absolute inset-0 items-center justify-center bg-black/50">
                                <Text category="h4" className="text-white">
                                    + {imageUrls.length - 4}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

export default memo(PostItemImages);
