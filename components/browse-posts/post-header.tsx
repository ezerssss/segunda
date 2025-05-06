import { View, TouchableOpacity } from "react-native";
import { Text, Divider, Icon } from "@ui-kitten/components";
import UserHeader from "../user/user-header";
import { useRef } from "react";
import ActionSheet from "react-native-actions-sheet";

interface PostHeaderProps {
    postId: string;
    userName?: string;
    userImageUrl?: string;
}

function PostHeader(props: PostHeaderProps) {
    const { postId, userName, userImageUrl } = props;
    const actionSheetRef = useRef<any>(null); // never mind lang ito type script error (mag work man code di ko alam pano i debug HAHAH)
    // bandaid fix ko was typeOf ActionSheet pero
    // yung mangyayari kay yung mga methods ng actionsheetRef kay mag typescript error din

    function handleReport() {
        console.log("REPORTED KA NA: ", userName);
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
                    style={{
                        marginRight: 3,
                        fontWeight: "bold",
                        fontSize: 20,
                        marginTop: 10,
                        color: "black",
                    }}
                    onPress={() => actionSheetRef.current?.show()}
                >
                    ...
                </Text>
            </View>
            <ActionSheet
                ref={actionSheetRef}
                containerStyle={{
                    backgroundColor: "white",
                    padding: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}
                indicatorStyle={{
                    backgroundColor: "#ccc",
                    width: 50,
                    height: 5,
                    alignSelf: "center",
                    marginVertical: 5,
                }}
                gestureEnabled={true}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                        textAlign: "center",
                    }}
                >
                    Post Options
                </Text>
                <TouchableOpacity
                    onPress={handleReport}
                    className="flex flex-row p-[20px]"
                >
                    <Icon name="flag" fill="red" width={20} height={20} />
                    <Text style={{ fontSize: 16, color: "red", marginLeft: 4 }}>
                        Report
                    </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                    onPress={() => actionSheetRef.current?.hide()}
                    className="p-[20px]"
                >
                    <Text style={{ fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
            </ActionSheet>
        </>
    );
}

export default PostHeader;
