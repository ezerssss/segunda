import React from "react";

import SellerActionButton from "./seller-action-button";
import StealerActionButtons from "./stealer-action-buttons";
import MinerActionButton from "./miner-action-button";
import { View, Text } from "react-native";
import { ItemType } from "@/types/item";

interface ActionButtonsProps {
    item: ItemType;
}

function ActionButtons(props: Readonly<ActionButtonsProps>) {
    const { item } = props;

    return (
        <View className="flex-1">
            <View className="w-full flex-row justify-between">
                <StealerActionButtons item={item}></StealerActionButtons>
            </View>
            <View className="my-4"></View>
            <View className="w-full flex-row justify-between">
                <MinerActionButton item={item}></MinerActionButton>
            </View>
            <View className="mt-10">
                <SellerActionButton item={item}></SellerActionButton>
            </View>

            <View className="mt-5 h-12 flex-row justify-between bg-blue-50">
                <View className="w-1/2 bg-red-50">
                    <Text>Random area</Text>
                </View>
                <StealerActionButtons item={item}></StealerActionButtons>
            </View>
        </View>
    );
}
export default ActionButtons;
