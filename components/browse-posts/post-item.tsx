import { PostType } from "@/types/post";
import { Pressable, View } from "react-native";
import PostHeader from "../post-header";
import { Divider } from "@ui-kitten/components";
import PostItemImages from "./post-images";
import PostHearts from "./post-hearts";
import { memo } from "react";
import { router } from "expo-router";
import useResetStore from "@/hooks/useResetStore";

interface PostItemProps {
    post: PostType;
}

function PostItem(props: PostItemProps) {
    const { post } = props;
    const {
        id,
        sellerData,
        caption,
        tags,
        imageUrls,
        blurHashes,
        dateCreated,
    } = post;

    const { resetPostStore } = useResetStore();

    function navigateToViewPost() {
        resetPostStore();
        router.push(`/(protected)/view-post/${id}`);
    }

    return (
        <Pressable onPress={navigateToViewPost} className="mt-2">
            <View className="mb-2 flex flex-col">
                <PostHeader
                    postId={id}
                    userName={sellerData.name}
                    userImageUrl={sellerData.imageUrl ?? ""}
                    caption={caption}
                    tags={tags}
                    date={dateCreated}
                    campus={sellerData.campus}
                />
                <View className="w-full">
                    <PostItemImages
                        postId={id}
                        imageUrls={imageUrls}
                        blurHashes={blurHashes}
                    />
                    <PostHearts />
                </View>
            </View>
            <Divider className="h-1 flex-1 rounded-lg bg-gray-200" />
        </Pressable>
    );
}

export default memo(PostItem);
