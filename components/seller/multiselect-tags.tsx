import { View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { MultiSelect } from "react-native-element-dropdown";
import multiSelectStyle from "@/styles/multiselect";

interface MultiSelectPropsInterface {
    tags: { label: string; value: string }[];
    value: string[];
    onChange: (...event: any[]) => void;
    isLoading: boolean;
}

function MultiSelectTags(props: MultiSelectPropsInterface) {
    const theme = useTheme();

    const { tags, value, onChange, isLoading } = props;
    return (
        <MultiSelect
            disable={isLoading}
            data={tags}
            labelField="label"
            valueField="value"
            placeholder="Select tags"
            value={value}
            onChange={onChange}
            style={multiSelectStyle.dropdown}
            containerStyle={multiSelectStyle.dropdownContainer}
            activeColor={theme["color-primary-100"]}
            selectedStyle={{ display: "none" }}
            selectedTextStyle={{ display: "none" }}
            renderSelectedItem={(item, unSelect) => (
                <View
                    key={item.value}
                    style={{
                        ...multiSelectStyle.hashtagChip,
                        backgroundColor: theme["color-primary-500"],
                    }}
                >
                    <Text category="label" style={multiSelectStyle.hashtagText}>
                        #{item.label}
                    </Text>
                    <Text
                        appearance="hint"
                        onPress={() => {
                            if (!isLoading) unSelect && unSelect(item);
                        }}
                        style={multiSelectStyle.hashtagClose}
                    >
                        ×
                    </Text>
                </View>
            )}
        />
    );
}

export default MultiSelectTags;
