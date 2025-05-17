import BidderDetails from "./bidder-details";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BidRequestSchema, BidRequestType } from "@/types/bidder";
import { useEffect, useState } from "react";

import Modal from "react-native-modal";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { Button, Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { bidItem } from "@/firebase/functions";

import NoBidders from "./no-bidders";
import ConfirmBuyActionModal from "./confirm-buy-action-modal";
import { doc, onSnapshot } from "@react-native-firebase/firestore";
import { itemsCollectionRef } from "@/constants/collections";
import { useUserStore } from "@/states/user";
import { useBidderModalStore } from "@/states/modal";

function BuyerViewBiddersModal() {
    const { user } = useUserStore();
    const {
        isBuyerViewModalVisible,
        setIsBuyerViewModalVisible,
        item,
        bidders,
    } = useBidderModalStore();

    const itemId = item?.id ?? "";
    const [isSteal, setIsSteal] = useState(false);
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [bidData, setBidData] = useState<BidRequestType | null>(null);

    const {
        handleSubmit,
        formState: { errors },
        control,
        getValues,
        reset,
    } = useForm<BidRequestType>({
        resolver: zodResolver(BidRequestSchema),
        defaultValues: {
            itemId: itemId,
        },
        disabled: isLoading,
    });

    function setConfirmModalParams(data: BidRequestType | null) {
        setBidData(data);
        setIsConfirmVisible(true);
    }

    async function handlePlaceBid(data: BidRequestType | null) {
        setIsLoading(true);
        try {
            if (!isSteal) {
                data = {
                    price: item?.price,
                    itemId: item?.id,
                } as BidRequestType;
            }
            await bidItem(data);
            reset({ itemId: itemId, price: undefined });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!item) return;
        reset({
            itemId: item.id,
            price: getValues("price") ?? undefined,
        });
    }, [item]);

    useEffect(() => {
        if (!itemId || !user) return;
        const currItemRef = doc(itemsCollectionRef, itemId);
        const unsubscribeItem = onSnapshot(
            currItemRef,
            (currItemSnapshot) => {
                const currItem = currItemSnapshot.data();
                setIsSteal(currItem?.miner !== null);
            },
            (error) => {
                console.error(error);
            },
        );

        return unsubscribeItem;
    }, [itemId, user]);

    return (
        <Modal
            isVisible={isBuyerViewModalVisible}
            onBackdropPress={() => setIsBuyerViewModalVisible(false)}
            onBackButtonPress={() => setIsBuyerViewModalVisible(false)}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            useNativeDriver={false}
            backdropTransitionOutTiming={1}
            style={{ justifyContent: "flex-end", margin: 0 }}
        >
            <View className="max-h-[75vh] min-h-60 rounded-t-3xl bg-white p-4">
                <Text category="h4" className="mb-4 w-full text-left">
                    Active Bidders
                </Text>
                {bidders.length === 0 && <NoBidders />}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    {bidders.map(({ bidderData, dateCreated, price, id }) => (
                        <View className="my-4" key={id}>
                            <BidderDetails
                                imgURI={bidderData.imageUrl ?? ""}
                                bid={price}
                                name={bidderData.name}
                                date={dateCreated}
                            ></BidderDetails>
                        </View>
                    ))}
                </ScrollView>
                {isSteal ? (
                    <>
                        <View className="mt-5 flex-row">
                            <Controller
                                control={control}
                                name="price"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <Input
                                        keyboardType="numeric"
                                        placeholder="Place your bid"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value?.toString()}
                                        textClassName="mx-4"
                                        className="flex-1"
                                        status={
                                            errors.price ? "danger" : "basic"
                                        }
                                        disabled={isLoading}
                                    />
                                )}
                            />
                            <Button
                                className="mx-1 w-32"
                                onPress={handleSubmit(setConfirmModalParams)}
                                style={{
                                    backgroundColor: "#E1306C",
                                    borderWidth: 0,
                                }}
                                size="small"
                                appearance="filled"
                                accessoryLeft={
                                    isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Icon name="shopping-bag-outline" />
                                    )
                                }
                            >
                                {isLoading ? "" : "Steal"}
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
                            onPress={() => setConfirmModalParams(null)}
                            style={{
                                backgroundColor: theme["color-primary-500"],
                                borderWidth: 0,
                            }}
                            size="small"
                            appearance="filled"
                            accessoryLeft={
                                isLoading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Icon name="shopping-bag-outline" />
                                )
                            }
                        >
                            {isLoading ? "" : "Mine Now"}
                        </Button>
                    </View>
                )}
                <ConfirmBuyActionModal
                    handleConfirm={handlePlaceBid}
                    data={bidData}
                    isSteal={isSteal}
                    isModalVisible={isConfirmVisible}
                    setIsModalVisible={setIsConfirmVisible}
                />
            </View>
        </Modal>
    );
}

export default BuyerViewBiddersModal;
