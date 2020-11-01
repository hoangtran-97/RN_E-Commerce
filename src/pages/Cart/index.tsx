import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { AppState } from "../../typings";
import { ThemeContext } from "../../context";
import { CartItem } from "../../Components/CartItem";

export const Cart = () => {
    const { theme } = useContext(ThemeContext);
    const { inCart } = useSelector((state: AppState) => state.product);
    const emptyCart = () => (
        <View style={styles.container__empty}>
            <Text style={{ color: theme.text }}>Your cart is empty</Text>
        </View>
    );

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
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
