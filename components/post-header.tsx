import { View, TouchableOpacity } from "react-native";
import { Text, Divider, Icon } from "@ui-kitten/components";
import UserHeader from "./user/user-header";
import { useRef } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { TruncatedText } from "./truncated-text";

interface PostHeaderProps {
    postId: string;
    userName?: string;
    userImageUrl?: string;
    date: string;
    campus: string;
    caption: string;
    tags: string[];
}

function PostHeader(props: PostHeaderProps) {
    const { postId, userName, userImageUrl, caption, tags, date, campus } =
        props;
    const actionSheetRef = useRef<ActionSheetRef>(null);

    function handleReport() {
        actionSheetRef.current?.hide();
    }

    return (
        <>
            <View className="w-full flex-row justify-between px-3 py-2">
                <UserHeader
                    key={postId}
                    name={userName}
                    imageUrl={userImageUrl}
                    date={new Date(date)}
                    campus={campus}
                />
                <Text
                    className="mr-1 mt-3 text-xl font-bold text-black"
                    onPress={() => actionSheetRef.current?.show()}
                >
                    ...
                </Text>
            </View>
            <View className="mt-2 w-full px-3">
                <TruncatedText text={caption} isItemCard={false} />
                <View className="mb-2 mt-1 flex-row flex-wrap gap-1">
                    {tags.map((tag) => (
                        <Text key={tag} className="text-[blue]">
                            #{tag}
                        </Text>
                    ))}
                </View>
            </View>
            <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
                <Text
                    category="h6"
                    className="border-b border-b-gray-100 p-3 text-center"
                >
                    Post Options
                </Text>
                <TouchableOpacity
                    onPress={handleReport}
                    className="flex flex-row p-5"
                >
                    <Icon name="flag" fill="red" width={20} height={20} />
                    <Text category="s1" className="ml-2 text-red-500">
                        Report
                    </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                    onPress={() => actionSheetRef.current?.hide()}
                    className="p-5"
                >
                    <Text category="s1">Cancel</Text>
                </TouchableOpacity>
            </ActionSheet>
        </>
    );
}

export default PostHeader;
