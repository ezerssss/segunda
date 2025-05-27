import { TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@ui-kitten/components";
import { useRef, useState } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Slider from "@react-native-community/slider";

interface PropsInterface {
    lowerBound: number;
    setLowerBound: React.Dispatch<React.SetStateAction<number>>;
    upperBound: number;
    setUpperBound: React.Dispatch<React.SetStateAction<number>>;
}

function PriceRange(props: PropsInterface) {
    const { lowerBound, setLowerBound, upperBound, setUpperBound } = props;
    const [isChanged, setIsChanged] = useState(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const priceRange = `₱ ${Number(lowerBound).toLocaleString("en-PH")} - ₱ ${Number(upperBound).toLocaleString("en-PH")}`;
    const pillText = isChanged ? priceRange : "Budget";

    function clearPriceRange() {
        setLowerBound(0);
        setUpperBound(1000000);
        setIsChanged(false);
        actionSheetRef.current?.hide();
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                className="flex-row items-center gap-1 self-start rounded-2xl border border-gray-200 px-3 py-1"
            >
                <Text className="text-sm">{pillText}</Text>
                <Icon name="arrow-ios-downward" width={15} height={15} />
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
                <Text
                    category="h6"
                    className="border-b border-b-gray-100 p-3 text-center"
                >
                    Budget
                </Text>
                <View className="gap-5 p-5">
                    <Text className="my-2 text-xl font-bold">{priceRange}</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1000000}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <TouchableOpacity
                        onPress={clearPriceRange}
                        className="items-center justify-center rounded-3xl border border-gray-200 px-4 py-2"
                    >
                        <Text className="text-lg font-bold">Clear</Text>
                    </TouchableOpacity>
                </View>
            </ActionSheet>
        </>
    );
}

export default PriceRange;
