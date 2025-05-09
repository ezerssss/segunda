import { View, TouchableOpacity } from "react-native";
import { Text, Divider, Icon } from "@ui-kitten/components";
import UserHeader from "../user/user-header";
import { useRef } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

interface PostHeaderProps {
    postId: string;
    userName?: string;
    userImageUrl?: string;
}

function PostHeader(props: PostHeaderProps) {
    const { postId, userName, userImageUrl } = props;
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
                />
                <Text
                    className="mr-1 mt-3 text-xl font-bold text-black"
                    onPress={() => actionSheetRef.current?.show()}
                >
                    ...
                </Text>
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
