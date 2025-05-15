import { PostType } from "@/types/post";
import { Pressable, View } from "react-native";
import PostHeader from "../post-header";
import { Divider } from "@ui-kitten/components";
import PostItemImages from "./post-images";
import PostHearts from "./post-hearts";
import { memo } from "react";
import { useRouter } from "expo-router";

interface PostItemProps {
    post: PostType;
    hasDivider: boolean;
}

function PostItem(props: PostItemProps) {
    const { post, hasDivider } = props;
    const { id, sellerData, caption, tags, imageUrls, blurHashes } = post;

    const router = useRouter();

    function navigateToViewPost(postId: string) {
        router.push(`/(protected)/view-post/${postId}`);
    }

    return (
        <Pressable onPress={() => navigateToViewPost(id)}>
            <View className="mb-2 flex flex-col">
                <PostHeader
                    postId={id}
                    userName={sellerData.name}
                    userImageUrl={sellerData.imageUrl ?? ""}
                    caption={caption}
                    tags={tags}
                />
                <View className="w-full">
                    <PostItemImages
                        imageUrls={imageUrls}
                        blurHashes={blurHashes}
                    />
                    <PostHearts />
                </View>
            </View>
            {hasDivider && (
                <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
            )}
        </Pressable>
    );
}

export default memo(PostItem);
