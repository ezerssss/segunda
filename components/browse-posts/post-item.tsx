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
    isVisible: boolean;
    userName?: string;
    userImageUrl?: string;
    isLast: boolean;
    hasLoadedBefore: boolean;
}

function PostItem(props: PostItemProps) {
    const { post, isVisible, userName, userImageUrl, isLast, hasLoadedBefore } =
        props;

    return (
        <>
            <View className="mb-5 flex flex-col">
                <PostHeader
                    postId={post.id}
                    userName={userName}
                    userImageUrl={userImageUrl}
                />
                <View className="w-full px-2">
                    <Text>{post.caption}</Text>
                    <View className="mt-1 flex-row flex-wrap gap-1">
                        {post.tags.map((tag) => (
                            <Text
                                key={tag}
                                style={{
                                    color: "blue",
                                }}
                            >
                                #{tag}
                            </Text>
                        ))}
                    </View>
                    <PostItemImages
                        imageUrls={post.imageUrls}
                        isVisible={isVisible}
                        hasLoadedBefore={hasLoadedBefore}
                    />
                    <PostHearts />
                </View>
            </View>
            {!isLast && (
                <Divider
                    style={{
                        height: 4,
                        backgroundColor: "#f0f2f5",
                        width: "100%",
                    }}
                />
            )}
        </>
    );
}

export default memo(PostItem);
