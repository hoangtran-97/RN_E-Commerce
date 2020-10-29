import React, { useContext } from "react";
import { Text, FlatList, View, Image, StyleSheet } from "react-native";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";
import { Product } from "../../typings";
import { ThemeContext } from "../../context";

export const Home = () => {
    const [products] = useProduct();
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        item__name: {
            fontSize: 26,
            fontWeight: "700",
            color: theme.text,
            marginVertical: 10,
        },
        item__price: {
            fontSize: 16,
            fontWeight: "500",
            color: theme.text,
            fontStyle: "italic",
            marginVertical: 10,
        },
        container: {
            backgroundColor: theme.background,
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
            backgroundColor: theme.foreground,
            borderRadius: 10,
        },
        img: {
            width: "100%",
            height: 300,
            resizeMode: "cover",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
        },
    });
    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.container__item}>
            <Image
                style={styles.img}
                source={{
                    uri: `${item.img}`,
                }}
            />
            <Text style={styles.item__name}>{item.name}</Text>
            <Text style={styles.item__price}>{`${item.price} EUR`}</Text>
        </View>
    );
    const emptyCart = () => <Text>Cart is empty</Text>;

    return (
        <View style={styles.container}>
            <Search />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={emptyCart}
            />
        </View>
    );
};
