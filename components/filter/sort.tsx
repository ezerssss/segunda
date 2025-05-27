import { TouchableOpacity } from "react-native";
import { Text, Divider, Icon } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import clsx from "clsx";

const sortByOptions = ["Best match", "Lowest price", "Highest price"];

function SortBy() {
    const [sortBy, setSortBy] = useState("Best match");
    const actionSheetRef = useRef<ActionSheetRef>(null);

    function handleChangeSort(sort: string) {
        setSortBy(sort);
        actionSheetRef.current?.hide();
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => actionSheetRef.current?.show()}
                className={clsx(
                    "flex-row items-center gap-1 self-start rounded-2xl border px-3 py-1",
                    sortBy === "Best match"
                        ? "border-gray-200"
                        : "border-gray-500",
                )}
            >
                <Text
                    className={clsx(
                        "text-sm",
                        sortBy !== "Best match" && "font-bold",
                    )}
                >
                    {sortBy}
                </Text>
                <Icon name="arrow-ios-downward" width={15} height={15} />
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef} gestureEnabled={true}>
                <Text
                    category="h6"
                    className="border-b border-b-gray-100 p-3 text-center"
                >
                    Sort by:
                </Text>
                {sortByOptions.map((sort, index) => (
                    <React.Fragment key={sort}>
                        <TouchableOpacity
                            onPress={() => handleChangeSort(sort)}
                            className="flex-row items-center justify-between p-5"
                        >
                            <Text
                                category="s1"
                                className={clsx(sortBy === sort && "font-bold")}
                            >
                                {sort}
                            </Text>
                            {sortBy === sort && (
                                <Icon name="checkmark" width={20} height={20} />
                            )}
                        </TouchableOpacity>

                        {index !== sortByOptions.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </ActionSheet>
        </>
    );
}

export default SortBy;
