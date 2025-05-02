import { Text } from "@ui-kitten/components";
import { View } from "react-native";

interface PostTagsProps {
    tags: string[];
}

function PostTags(props: PostTagsProps) {
    const { tags } = props;

    return (
        <View className="mt-1 flex-row flex-wrap gap-1">
            {tags.map((tag) => (
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
    );
}

export default PostTags;
