import BidderDetails from "./bidder-details";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BidRequestSchema, BidRequestType } from "@/types/bidder";
import { Dispatch, SetStateAction } from "react";

import Modal from "react-native-modal";
import { ScrollView, View } from "react-native";
import { Button, Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { bidItem } from "@/firebase/functions";
import { ItemType } from "@/types/item";

import useGetBidders from "@/hooks/useGetBidders";
import NoBidders from "./no-bidders";

interface StealModalProps {
    item: ItemType;
    isModalVisible: boolean;
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isSteal: boolean;
    isAutoFocused: boolean;
}

function BuyerViewBiddersModal(props: Readonly<StealModalProps>) {
    const { item, isModalVisible, setIsModalVisible, isSteal, isAutoFocused } =
        props;
    const { bidders } = useGetBidders(item.id, isModalVisible);
    const theme = useTheme();

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
        try {
            const response = await bidItem(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleMine() {
        try {
            const data = {
                price: item.price,
                itemId: item.id,
            } as BidRequestType;
            const response = await bidItem(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsModalVisible(false);
        }
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
                {bidders.length === 0 ? (
                    <NoBidders></NoBidders>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {bidders.map(
                            ({ bidderData, dateCreated, price }, index) => (
                                <View className="my-4" key={index}>
                                    <BidderDetails
                                        imgURI={bidderData.imageUrl ?? ""}
                                        bid={price}
                                        name={bidderData.name}
                                        date={dateCreated}
                                    ></BidderDetails>
                                </View>
                            ),
                        )}
                    </ScrollView>
                )}
                {isSteal ? (
                    <>
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
                                        className="flex-1"
                                        status={
                                            errors.price ? "danger" : "basic"
                                        }
                                    />
                                )}
                            />
                            <Button
                                className="mx-1 w-32"
                                onPress={handleSubmit(handlePlaceBid)}
                                style={{
                                    backgroundColor: "#E1306C",
                                    borderWidth: 0,
                                }}
                                size="small"
                                appearance="filled"
                                accessoryLeft={
                                    <Icon name="shopping-bag-outline" />
                                }
                            >
                                Steal
                            </Button>
                        </View>
                        {errors.price?.message && (
                            <Text style={{ color: "red" }}>
                                {errors.price.message}
                            </Text>
                        )}
                    </>
                ) : (
                    <View className="mx-1 my-5">
                        <Button
                            className="flex-1"
                            onPress={handleMine}
                            style={{
                                backgroundColor: theme["color-primary-500"],
                                borderWidth: 0,
                            }}
                            size="small"
                            appearance="filled"
                            accessoryLeft={<Icon name="shopping-bag-outline" />}
                        >
                            Mine Now
                        </Button>
                    </View>
                )}
            </View>
        </Modal>
    );
}

export default BuyerViewBiddersModal;
