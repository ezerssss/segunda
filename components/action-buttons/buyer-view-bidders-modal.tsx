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

import useGetBidders from "@/hooks/useGetBidders";

function StealButtonText() {
    return <Text style={{ fontWeight: "bold", color: "white" }}>Steal</Text>;
}

interface StealModalProps {
    item: ItemType;
    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isAutoFocused: boolean;
}

function BuyerViewBiddersModal(props: Readonly<StealModalProps>) {
    const { item, isModalVisible, setIsModalVisible, isAutoFocused } = props;
    const { bidders } = useGetBidders(item.id, isModalVisible);

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
                    {bidders.map(({ dateCreated, price }, index) => (
                        <View className="my-4" key={index}>
                            <BidderDetails
                                imgURI={"bidderData.imageUrl"}
                                bid={price}
                                name={"bidderData.name"}
                                date={dateCreated}
                            ></BidderDetails>
                        </View>
                    ))}
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

export default BuyerViewBiddersModal;
