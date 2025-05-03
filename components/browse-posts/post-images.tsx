import { ItemType } from "@/types/item";
import { View, Image, Pressable } from "react-native";
import { Text } from "@ui-kitten/components";

interface PostItemImagesProps {
    postItems: ItemType[];
    isVisible: boolean;
}

function PostItemImages(props: PostItemImagesProps) {
    const { postItems, isVisible } = props;
    return (
        <View className="mt-4 flex-row flex-wrap justify-between">
            {isVisible &&
                postItems.length > 0 &&
                (() => {
                    const count = Math.min(postItems.length, 4);

                    if (count === 1) {
                        return (
                            <View key={postItems[0].id} className="mb-2 w-full">
                                <Pressable>
                                    <Image
                                        source={{
                                            uri: postItems[0]?.imageUrl ?? "",
                                        }}
                                        className="h-[350px] w-full"
                                        resizeMode="cover"
                                    />
                                </Pressable>
                            </View>
                        );
                    }

                    if (count === 2) {
                        return postItems.slice(0, 2).map((item) => (
                            <View key={item.id} className="mb-2 w-[49%]">
                                <Pressable>
                                    <Image
                                        source={{ uri: item?.imageUrl ?? "" }}
                                        className="h-[200px] w-full"
                                        resizeMode="cover"
                                    />
                                </Pressable>
                            </View>
                        ));
                    }

                    if (count === 3) {
                        return (
                            <View className="w-full flex-row">
                                <View className="mb-2 w-[66%] pr-1">
                                    <Pressable>
                                        <Image
                                            source={{
                                                uri:
                                                    postItems[0]?.imageUrl ??
                                                    "",
                                            }}
                                            className="h-[250px] w-full"
                                            resizeMode="cover"
                                        />
                                    </Pressable>
                                </View>
                                <View className="mb-2 w-[33%] flex-col gap-1">
                                    {postItems.slice(1, 3).map((item) => (
                                        <Pressable key={item.id}>
                                            <Image
                                                key={item.id}
                                                source={{
                                                    uri: item?.imageUrl ?? "",
                                                }}
                                                className="h-[123px] w-full"
                                                resizeMode="cover"
                                            />
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                        );
                    }

                    if (count === 4) {
                        return postItems.slice(0, 4).map((item, index) => (
                            <View key={item.id} className="mb-2 w-[49%]">
                                <View className="relative">
                                    <Pressable>
                                        <Image
                                            source={{
                                                uri: item?.imageUrl ?? "",
                                            }}
                                            className="h-[150px] w-full"
                                            resizeMode="cover"
                                        />
                                    </Pressable>
                                    {index === 3 && postItems.length > 4 && (
                                        <View className="absolute inset-0 items-center justify-center bg-black/50">
                                            <Text className="text-xl font-bold text-white">
                                                +{postItems.length - 4}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ));
                    }

                    return null;
                })()}

            {!isVisible && <View className="h-[175px] w-full bg-gray-200" />}
        </View>
    );
}

export default PostItemImages;
