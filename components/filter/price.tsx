import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon } from "@ui-kitten/components";
import { useEffect, useRef, useState } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import clsx from "clsx";
import { useDebounce } from "use-debounce";

interface PropsInterface {
    setLowerBound: React.Dispatch<React.SetStateAction<number>>;
    setUpperBound: React.Dispatch<React.SetStateAction<number>>;
}

function PriceRange(props: PropsInterface) {
    const { width } = Dimensions.get("window");
    const { setLowerBound, setUpperBound } = props;
    const [sliderValue, setSliderValue] = useState([0, 100000]);
    const [debouncedValue] = useDebounce(sliderValue, 100);

    useEffect(() => {
        setLowerBound(debouncedValue[0]);
        setUpperBound(debouncedValue[1]);
    }, [debouncedValue]);

    const [isChanged, setIsChanged] = useState(false);
    const actionSheetRef = useRef<ActionSheetRef>(null);

    const priceRange = `₱ ${Number(sliderValue[0]).toLocaleString("en-PH")} - ₱ ${Number(sliderValue[1]).toLocaleString("en-PH")}`;
    const pillText = isChanged ? priceRange : "Budget";

    function clearPriceRange() {
        actionSheetRef.current?.hide();
        setSliderValue([0, 100000]);
        setIsChanged(false);
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                className={clsx(
                    "flex-row items-center gap-1 self-start rounded-2xl border px-3 py-1",
                    isChanged ? "border-gray-500" : "border-gray-200",
                )}
            >
                <Text className={clsx("text-sm", isChanged && "font-bold")}>
                    {pillText}
                </Text>
                <Icon name="arrow-ios-downward" width={15} height={15} />
            </TouchableOpacity>

            <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
                <Text
                    category="h6"
                    className="border-b border-b-gray-100 p-3 text-center"
                >
                    Budget
                </Text>
                <View className="gap-4 p-5">
                    <Text className="mt-2 text-xl font-bold">{priceRange}</Text>

                    <MultiSlider
                        min={0}
                        max={100000}
                        step={10}
                        sliderLength={width - 60}
                        values={[sliderValue[0], sliderValue[1]]}
                        onValuesChange={(val) => {
                            setIsChanged(true);
                            setSliderValue(val);
                        }}
                        selectedStyle={{ backgroundColor: "#007AFF" }}
                        unselectedStyle={{ backgroundColor: "#E5E5EA" }}
                        containerStyle={styles.sliderContainer}
                        trackStyle={{ height: 4, borderRadius: 2 }}
                        markerStyle={styles.thumb}
                        pressedMarkerStyle={styles.thumbPressed}
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

const styles = StyleSheet.create({
    sliderContainer: {
        alignSelf: "center",
        marginBottom: 10,
    },
    thumb: {
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#007AFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
    thumbPressed: {
        backgroundColor: "#e0f0ff",
    },
});

export default PriceRange;
