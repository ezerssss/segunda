import BidderDetails from "./bidder-details";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BidRequestSchema, BidRequestType, BidType } from "@/types/bidder";
import { useContext, useEffect, useState } from "react";

import Modal from "react-native-modal";
import { ScrollView, View, ActivityIndicator } from "react-native";
import { Button, Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { bidItem } from "@/firebase/functions";

import NoBidders from "./no-bidders";
import ConfirmBuyActionModal from "./confirm-buy-action-modal";
import { BiddersModalContext } from "@/contexts/biddersModalContext";
import { itemsCollectionRef } from "@/constants/collections";
import {
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    Unsubscribe,
} from "@react-native-firebase/firestore";
import { CollectionEnum } from "@/enums/collection";

function BuyerViewBiddersModal() {
    const { isBuyerViewModalVisible, setIsBuyerViewModalVisible, item } =
        useContext(BiddersModalContext);
    const itemId = item?.id ?? "";

    const isSteal = item?.miner !== null;
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const [bidData, setBidData] = useState<BidRequestType | null>(null);
    const [bidders, setBidders] = useState<BidType[]>([]);
    const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

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
            const response = await bidItem(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
            reset({ itemId: itemId, price: undefined });
        }
    }

    async function handleMine() {
        setIsLoading(true);
        try {
            const data = {
                price: item?.price,
                itemId: item?.id,
            } as BidRequestType;
            const response = await bidItem(data);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    async function getBidders() {
        if (!item) return;
        setIsLoading(true);
        console.log("id is ", itemId);

        const itemDocRef = doc(itemsCollectionRef, item.id);
        const biddersCollectionRef = collection(
            itemDocRef,
            CollectionEnum.BIDDERS,
        );
        const biddersQuery = query(
            biddersCollectionRef,
            orderBy("price", "desc"),
            orderBy("dateCreated", "asc"),
        );
        try {
            const querySnapshot = await getDocs(biddersQuery);
            const bidders: BidType[] = querySnapshot.docs.map((bidderDoc) => {
                return bidderDoc.data() as BidType;
            });
            setBidders(bidders);
            if (unsubscribe) unsubscribe();
            const unsubscribeBidders = onSnapshot(
                biddersQuery,
                (biddersQuerySnapshot) => {
                    const bidders: BidType[] = biddersQuerySnapshot.docs.map(
                        (bidderDoc) => {
                            return bidderDoc.data() as BidType;
                        },
                    );
                    console.log("bidders", bidders);
                    setBidders(bidders);
                    setIsLoading(false);
                },
                (error) => {
                    console.error(error);
                },
            );
            setUnsubscribe(() => {
                unsubscribeBidders();
                console.log("clean up!");
            });
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    // useEffect(() => {
    //     if (itemId) {
    //         reset({
    //             itemId: itemId,
    //             price: getValues("price") ?? undefined,
    //         });
    //     }
    //     setBidders([]);
    //     getBidders();
    //     return unsubscribe;
    // }, [isBuyerViewModalVisible]);

    useEffect(() => {
        if (item) {
            reset({
                itemId: item.id,
                price: getValues("price") ?? undefined,
            });
            getBidders();
        }
    }, [item]);

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
                    handleConfirm={isSteal ? handlePlaceBid : handleMine}
                    data={bidData}
                    isSteal={isSteal}
                    isModalVisible={isConfirmVisible}
                    setIsModalVisible={setIsConfirmVisible}
                ></ConfirmBuyActionModal>
            </View>
        </Modal>
    );
}

export default BuyerViewBiddersModal;
