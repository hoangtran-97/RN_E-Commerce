import React, { useContext } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    ImageBackground,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { AppState, Product } from "../../typings";
import { ThemeContext } from "../../context";

const emptyCart = () => (
    <View style={styles.container__empty}>
        <Text>Your cart is empty</Text>
        <Text>Pull down to refresh</Text>
    </View>
);

export const Cart = () => {
    const { theme } = useContext(ThemeContext);
    const { inCart } = useSelector((state: AppState) => state.product);
    const textStyle = { ...styles.text, color: theme.text };
    // const renderRightActions = (progress: any, dragX: any) => {
    //     const trans = dragX.interpolate({
    //         inputRange: [0, 50, 100, 101],
    //         outputRange: [-20, 0, 0, 1],
    //     });
    //     return (
    //         <TouchableOpacity
    //             style={{ transform: [{ translateX: 0 }], width: 192 }}>
    //             <Animated.Text
    //                 style={[
    //                     styles.actionText,
    //                     {
    //                         transform: [{ translateX: trans }],
    //                     },
    //                 ]}>
    //                 Remove from cart
    //             </Animated.Text>
    //         </TouchableOpacity>
    //     );
    // };
    const renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: any,
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            Alert.alert(text);
        };
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
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
            {renderRightAction("More", "#dd2c00", 64, progress)}
        </View>
    );

    const renderItem = ({ item }: { item: Product }) => (
        <Swipeable renderRightActions={renderRightActions}>
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

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.background }}>
            <FlatList
                initialNumToRender={3}
                data={inCart}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={emptyCart}
                refreshing={false}
                onRefresh={() => {}}
            />
        </View>
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
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    rightActions: {
        width: 192,
        height: 100,
        flexDirection: "row",
    },
    imgOverlay: {
        backgroundColor: "rgba(66, 66, 66, 0.5)",
        flex: 1,
        justifyContent: "center",
    },
});
