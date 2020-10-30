import React, { useContext } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
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
    const renderRightActions = (progress: any, dragX: any) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <TouchableOpacity>
                <Animated.Text>Archive</Animated.Text>
            </TouchableOpacity>
        );
    };

    const renderItem = ({ item }: { item: Product }) => (
        <Swipeable renderRightActions={renderRightActions}>
            <ImageBackground
                resizeMode="cover"
                style={styles.img}
                imageStyle={styles.imageStyle}
                source={{
                    uri: `${item.img}`,
                }}>
                <Text style={textStyle}>{item.name}</Text>
                <Text style={textStyle}>
                    Size: {item.sizes} - Variant: {item.variants}
                </Text>
                <Text style={textStyle}>Price: {item.price} EUR</Text>
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
    text: { fontSize: 16, paddingLeft: 20, opacity: 1 },
    img: {
        marginBottom: 10,
        width: "100%",
        height: 100,

        justifyContent: "center",
    },
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
    imageStyle: { opacity: 0.5 },
});
