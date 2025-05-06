import { View, Image } from "react-native";
import { Text } from "@ui-kitten/components";

interface PostItemImagesProps {
    imageUrls: string[];
    isVisible: boolean;
    hasLoadedBefore: boolean;
}

function PostItemImages(props: PostItemImagesProps) {
    const { imageUrls, isVisible, hasLoadedBefore } = props;

    if (!isVisible && !hasLoadedBefore) {
        return <View className="h-[175px] w-full bg-gray-200" />;
    }

    const count = Math.min(imageUrls.length, 4);

    if (count === 1) {
        return (
            <View className="mb-2 w-full">
                <Image
                    source={{ uri: imageUrls[0] }}
                    className="h-[350px] w-full"
                    resizeMode="cover"
                />
            </View>
        );
    }

    if (count === 2) {
        return (
            <View className="mt-4 flex-row justify-between">
                {imageUrls.slice(0, 2).map((uri) => (
                    <View key={uri} className="mb-2 w-[49%]">
                        <Image
                            source={{ uri }}
                            className="h-[200px] w-full"
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </View>
        );
    }

    if (count === 3) {
        return (
            <View className="mt-4 w-full flex-row">
                <View className="mb-2 w-[66%] pr-1">
                    <Image
                        source={{ uri: imageUrls[0] }}
                        className="h-[250px] w-full"
                        resizeMode="cover"
                    />
                </View>
                <View className="mb-2 w-[33%] flex-col gap-1">
                    {imageUrls.slice(1, 3).map((uri) => (
                        <Image
                            key={uri}
                            source={{ uri }}
                            className="h-[123px] w-full"
                            resizeMode="cover"
                        />
                    ))}
                </View>
            </View>
        );
    }

    return (
        <View className="mt-4 flex-row flex-wrap justify-between">
            {imageUrls.slice(0, 4).map((uri, idx) => (
                <View key={uri} className="relative mb-2 w-[49%]">
                    <Image
                        source={{ uri }}
                        className="h-[150px] w-full"
                        resizeMode="cover"
                    />
                    {idx === 3 && imageUrls.length > 4 && (
                        <View className="absolute inset-0 items-center justify-center bg-black/50">
                            <Text className="text-xl font-bold text-white">
                                +{imageUrls.length - 4}
                            </Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}

export default PostItemImages;
