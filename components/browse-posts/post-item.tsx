import { PostType } from "@/types/post";
import { View } from "react-native";
import PostHeader from "./post-header";
import { Divider } from "@ui-kitten/components";
import { Text } from "react-native-animatable";
import PostItemImages from "./post-images";
import PostHearts from "./post-hearts";
import { memo } from "react";

interface PostItemProps {
    post: PostType;
    isLast: boolean;
}

function PostItem(props: PostItemProps) {
    const { post, isLast } = props;
    const { id, sellerData, caption, tags, imageUrls, blurHashes } = post;

    return (
        <>
            <View className="mb-2 flex flex-col">
                <PostHeader
                    postId={id}
                    userName={sellerData.name}
                    userImageUrl={sellerData.imageUrl ?? ""}
                />
                <View className="w-full px-2">
                    <Text>{caption}</Text>
                    <View className="mb-2 mt-1 flex-row flex-wrap gap-1">
                        {tags.map((tag) => (
                            <Text key={tag} className="text-[blue]">
                                #{tag}
                            </Text>
                        ))}
                    </View>
                    <PostItemImages
                        imageUrls={imageUrls}
                        blurHashes={blurHashes}
                    />
                    <PostHearts />
                </View>
            </View>
            {!isLast && (
                <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
            )}
        </>
    );
}

export default memo(PostItem);
