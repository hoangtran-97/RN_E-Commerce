import React, { useContext } from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
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
    console.log(inCart);
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
            <Image
                resizeMode="cover"
                style={styles.img}
                source={{
                    uri: `${item.img}`,
                }}
            />
            <Text>"hello"</Text>
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
    img: {
        marginBottom: 10,
        width: "100%",
        height: 300,
    },
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
});
