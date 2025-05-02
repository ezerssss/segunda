import { View } from "react-native";
import { PostType } from "@/types/post";
import { ItemType } from "@/types/item";
import PostTags from "./post-tags";
import PostItemImages from "./post-images";
import PostCaptions from "./post-captions";
import PostHearts from "./post-hearts";

interface PostContentProps {
    post: PostType;
    postItems: ItemType[];
    isVisible: boolean;
}

function PostContent({ post, postItems, isVisible }: PostContentProps) {
    return (
        <View>
            <PostCaptions caption={post?.caption} />
            <PostTags tags={post.tags} />
            <PostItemImages postItems={postItems} isVisible={isVisible} />
            <PostHearts />
        </View>
    );
}

export default PostContent;
