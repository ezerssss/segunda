import { Text } from "@ui-kitten/components";

interface PostCaptionProps {
    caption?: string;
}

function PostCaptions(props: PostCaptionProps) {
    const { caption } = props;
    return <Text>{caption}</Text>;
}

export default PostCaptions;
