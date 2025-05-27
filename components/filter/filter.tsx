import { TouchableOpacity } from "react-native";
import { Text, Divider, Icon } from "@ui-kitten/components";
import { useRef } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

function Filters() {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    return (
        <>
            <TouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                className="items-center self-start rounded-2xl border border-gray-200 px-3 py-1"
            >
                <Text className="text-sm">Clothes</Text>
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
                <Text
                    category="h6"
                    className="border-b border-b-gray-100 p-3 text-center"
                >
                    Post Options
                </Text>
                <TouchableOpacity className="flex flex-row p-5">
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

export default Filters;
