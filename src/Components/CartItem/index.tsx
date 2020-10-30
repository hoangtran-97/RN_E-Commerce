import React, { useContext, useRef, useState } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { removeProduct, removeProductDB } from "../../redux/actions";
import { Product, AppState } from "../../typings";
import { ThemeContext } from "../../context";

export const CartItem = ({ item }: { item: Product }) => {
    const [isDelete, setIsDelete] = useState(false);
    const { theme } = useContext(ThemeContext);
    const swipeRef: any = useRef(null);
    const { currentUser, token } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    const textStyle = { ...styles.text, color: theme.text };
    const { _id } = currentUser;
    const renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: any,
    ) => {
        const pressHandler = () => {
            swipeRef.current.close();
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
    const renderRightActions = (progress: any) => (
        <View style={styles.rightActions}>
            {renderRightAction("Remove from cart", "#dd2c00", 64, progress)}
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
                resizeMode="cover"
                style={styles.img}
                imageStyle={styles.imageStyle}
                source={{
                    uri: `${item.img}`,
                }}>
                <View style={styles.imgOverlay}>
                    <Text style={textStyle}>{item.name}</Text>
                    <Text style={textStyle}>
                        Size: {item.sizes} - Variant: {item.variants}
                    </Text>
                    <Text style={textStyle}>Price: {item.price} EUR</Text>
                </View>
            </ImageBackground>
        </Swipeable>
    );
};
const styles = StyleSheet.create({
    text: { fontSize: 16, paddingLeft: 20, fontWeight: "700" },
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
        backgroundColor: "rgba(66, 66, 66, 0.5)",
        flex: 1,
        justifyContent: "center",
    },
    actionView: { flex: 1, transform: [{ translateX: 0 }] },
});
