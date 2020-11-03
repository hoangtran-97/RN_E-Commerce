import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { removeProduct, removeProductDB, addToast } from "../../redux/actions";
import { Product, AppState } from "../../typings";

export const CartItem = ({ item }: { item: Product }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const swipeRef: any = useRef(null);
    const { currentUser, token } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    const { _id } = currentUser;
    const renderRightAction = (text: string, color: string) => {
        const pressHandler = () => {
            swipeRef.current.close();
            dispatch(addToast({ message: "Item removed from cart" }));
            setIsDelete(true);
        };
        return (
            <Animated.View style={styles.actionView}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };
    const renderRightActions = () => (
        <View style={styles.rightActions}>
            {renderRightAction("Remove from cart", "#dd2c00")}
        </View>
    );

    return (
        <Swipeable
            ref={swipeRef}
            renderRightActions={renderRightActions}
            onSwipeableClose={() => {
                if (isDelete) {
                    if (_id) {
                        dispatch(
                            removeProductDB(currentUser, item, _id, token),
                        );
                    } else {
                        dispatch(removeProduct(item));
                    }
                }
            }}>
            <ImageBackground
                onLoadEnd={() => setIsLoading((prev) => !prev)}
                resizeMode="cover"
                style={styles.img}
                imageStyle={styles.imageStyle}
                source={{
                    uri: `${item.img}`,
                }}>
                <View style={styles.imgOverlay}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>
                        Size: {item.sizes} - Variant: {item.variants}
                    </Text>
                    <Text style={styles.text}>Price: {item.price} EUR</Text>
                </View>
            </ImageBackground>
            <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
                animating={isLoading}
            />
        </Swipeable>
    );
};
const styles = StyleSheet.create({
    text: { fontSize: 16, paddingLeft: 20, fontWeight: "700", color: "white" },
    img: {
        marginBottom: 10,
        width: "100%",
        height: 100,
    },
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
    imageStyle: {},
    leftAction: {
        flex: 1,
        backgroundColor: "#497AFC",
        justifyContent: "center",
    },
    actionText: {
        color: "white",
        fontSize: 16,
        backgroundColor: "transparent",
        padding: 10,
    },
    rightAction: {
        height: 100,
        alignItems: "flex-end",
        flex: 1,
        justifyContent: "center",
    },
    rightActions: {
        width: 150,
        height: 100,
        flexDirection: "row",
    },
    imgOverlay: {
        backgroundColor: "rgba(66, 66, 66, 0.7)",
        flex: 1,
        justifyContent: "center",
    },
    actionView: { flex: 1, transform: [{ translateX: 0 }] },
    activityIndicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
