import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { memo } from "react";
import { Image } from "expo-image";

interface PostItemImagesProps {
    imageUrls: string[];
    blurHashes: string[];
}

function PostItemImages(props: PostItemImagesProps) {
    const { imageUrls, blurHashes } = props;

    const count = Math.min(imageUrls.length, 4);

    if (count === 1) {
        return (
            <Image
                source={{ uri: imageUrls[0] }}
                className="aspect-square w-full flex-1 rounded"
                contentFit="cover"
                placeholder={{ blurhash: blurHashes[0] }}
                placeholderContentFit="cover"
            />
        );
    }

    if (count === 2) {
        return (
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(0, 2).map((uri, index) => (
                    <Image
                        key={uri}
                        source={{ uri }}
                        className="aspect-square flex-1 rounded"
                        contentFit="cover"
                        placeholder={{ blurhash: blurHashes[index] }}
                        placeholderContentFit="cover"
                    />
                ))}
            </View>
        );
    }

    if (count === 3) {
        return (
            <View className="flex-row gap-[1px]">
                <Image
                    source={{ uri: imageUrls[0] }}
                    className="flex-1 rounded"
                    contentFit="cover"
                    placeholder={{ blurhash: blurHashes[0] }}
                    placeholderContentFit="cover"
                />
                <View className="w-[40%] gap-[1px]">
                    {imageUrls.slice(1, 3).map((uri, index) => (
                        <Image
                            key={uri}
                            source={{ uri }}
                            className="aspect-square flex-1 rounded"
                            contentFit="cover"
                            placeholder={{ blurhash: blurHashes[index] }}
                            placeholderContentFit="cover"
                        />
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View className="flex flex-col gap-[1px]">
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(0, 2).map((uri, index) => (
                    <Image
                        key={uri}
                        source={{ uri }}
                        className="aspect-square flex-1 rounded"
                        contentFit="cover"
                        placeholder={{ blurhash: blurHashes[index] }}
                        placeholderContentFit="cover"
                    />
                ))}
            </View>
            <View className="flex-row justify-between gap-[1px]">
                {imageUrls.slice(2, 4).map((uri, index) => (
                    <View key={uri} className="relative aspect-square flex-1">
                        <Image
                            source={{ uri }}
                            className="aspect-square flex-1 rounded"
                            contentFit="cover"
                            placeholder={{ blurhash: blurHashes[index + 2] }}
                            placeholderContentFit="cover"
                        />
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
