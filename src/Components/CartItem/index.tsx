import React, { useContext } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Alert,
    ImageBackground,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { Product } from "../../typings";
import { ThemeContext } from "../../context";

const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: any,
) => {
    const pressHandler = () => {
        Alert.alert(text);
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

export const CartItem = ({ item }: { item: Product }) => {
    const { theme } = useContext(ThemeContext);
    const textStyle = { ...styles.text, color: theme.text };
    return (
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
    actionView: { flex: 1, transform: [{ translateX: 0 }] },
});
