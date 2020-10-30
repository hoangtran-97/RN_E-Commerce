import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AppState } from "../../typings";
import { ThemeContext } from "../../context";
import { CartItem } from "../../Components/CartItem";

const emptyCart = () => (
    <View style={styles.container__empty}>
        <Text>Your cart is empty</Text>
        <Text>Pull down to refresh</Text>
    </View>
);

export const Cart = () => {
    const { theme } = useContext(ThemeContext);
    const { inCart } = useSelector((state: AppState) => state.product);

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.background }}>
            <FlatList
                initialNumToRender={3}
                data={inCart}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={emptyCart}
                refreshing={false}
                onRefresh={() => {}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
    container: {
        flex: 1,
    },
});
