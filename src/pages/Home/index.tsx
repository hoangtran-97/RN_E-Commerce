import React, { useContext, useState } from "react";
import {
    Text,
    FlatList,
    View,
    Image,
    StyleSheet,
    Button,
    Pressable,
} from "react-native";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";
import { Product } from "../../typings";
import { ThemeContext } from "../../context";

export const Home = ({ navigation }: { navigation: any }) => {
    const [query, setQuery] = useState("");
    const [products] = useProduct(query);
    const { theme } = useContext(ThemeContext);
    const renderItem = ({ item }: { item: Product }) => (
        <Pressable
            onPress={() => {
                navigation.navigate("Product", {
                    item,
                    name: "Custom profile header",
                });
            }}
            style={{
                ...styles.container__item,
                backgroundColor: theme.foreground,
            }}>
            <Image
                resizeMode="cover"
                style={styles.img}
                source={{
                    uri: `${item.img}`,
                }}
            />
            <Text style={{ ...styles.item__name, color: theme.text }}>
                {item.name}
            </Text>
            <Text style={{ ...styles.item__price, color: theme.text }}>
                {`${item.price} EUR`}
            </Text>
        </Pressable>
    );

    const emptyCart = () => (
        <View style={styles.container__empty}>
            <Text>Your cart is empty</Text>
            <Text>Pull down to refresh</Text>
        </View>
    );

    return (
        <View
            style={{ ...styles.container, backgroundColor: theme.background }}>
            <Search setQuery={setQuery} query={query} />
            <FlatList
                data={products}
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
    item__name: {
        fontSize: 26,
        fontWeight: "700",
        marginVertical: 10,
    },
    item__price: {
        fontSize: 16,
        fontWeight: "500",

        fontStyle: "italic",
        marginVertical: 10,
    },
    container: {
        flex: 1,
    },
    container__item: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 10,
        height: 400,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

        borderRadius: 10,
    },
    img: {
        width: "100%",
        height: 300,
        // resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    container__empty: {
        marginTop: 20,
        alignItems: "center",
    },
});
