import BidderDetails from "./bidder-details";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BidRequestSchema, BidRequestType } from "@/types/bidder";
import { Dispatch, SetStateAction } from "react";

import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { bidItem } from "@/firebase/functions";
import { ItemType } from "@/types/item";

function StealButtonText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Steal</Text>;
}

interface StealModalProps {
    item: ItemType;

    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isAutoFocused: boolean;
}

function StealModal(props: Readonly<StealModalProps>) {
    const { item, isModalVisible, setIsModalVisible, isAutoFocused } = props;
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<BidRequestType>({
        resolver: zodResolver(BidRequestSchema),
        defaultValues: {
            itemId: item.id,
        },
    });

    async function handlePlaceBid(data: BidRequestType) {
        console.log("Placed bid: ", data);
        const response = await bidItem(data);
        console.log(response);
    }

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={false}
            backdropTransitionOutTiming={1}
            style={{ justifyContent: "flex-end", margin: 0 }}
        >
            <View className="max-h-[75vh] min-h-60 rounded-t-3xl bg-white p-4">
                <Text category="h4" className="mb-4">
                    Active Bidders
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="my-4">
                        <BidderDetails
                            imgURI="https://i.imgur.com/CzXTtJV.jpg"
                            bid={50.0}
                            name="John Smilga"
                            date="04/10/2025 | 11:20 pm"
                        ></BidderDetails>
                    </View>
                    <View className="my-4">
                        <BidderDetails
                            imgURI="https://i.imgur.com/CzXTtJV.jpg"
                            bid={50.0}
                            name="John Smilga"
                            date="04/10/2025 | 11:20 pm"
                        ></BidderDetails>
                    </View>
                    <View className="my-4">
                        <BidderDetails
                            imgURI="https://i.imgur.com/CzXTtJV.jpg"
                            bid={50.0}
                            name="John Smilga"
                            date="04/10/2025 | 11:20 pm"
                        ></BidderDetails>
                    </View>
                </ScrollView>
                <View className="mt-5 flex-row">
                    <Controller
                        control={control}
                        name="price"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                autoFocus={isAutoFocused}
                                keyboardType="numeric"
                                placeholder="Place your bid"
                                onChangeText={onChange}
                                value={value?.toString()}
                                textClassName="mx-4"
                                className="grow"
                                style={{
                                    marginBottom: 0,
                                    marginTop: 0,
                                    height: "auto",
                                }}
                                status={errors.price ? "danger" : "basic"}
                                caption={errors.price?.message}
                            />
                        )}
                    />
                    <Button
                        className="mx-1 w-32"
                        appearance="ghost"
                        style={{
                            backgroundColor: "#E1306C",
                        }}
                        accessoryLeft={() => StealButtonText()}
                        onPress={handleSubmit(handlePlaceBid)}
                    ></Button>
                </View>
            </View>
        </Modal>
    );
}

export default StealModal;
