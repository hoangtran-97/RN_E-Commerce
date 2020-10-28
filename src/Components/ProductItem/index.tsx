import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { ProductCardProps } from "../../typings";
import { ThemeContext } from "../../context";

export const ProductItem = ({ product }: ProductCardProps) => {
    const { theme } = useContext(ThemeContext);
    const { name, price, img, _id } = product;
    const styles = StyleSheet.create({
        container: {
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
            backgroundColor: theme.background,
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
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{
                    uri: `${img}`,
                }}
            />
            <Text>{name}</Text>
            <Text>{`${price} EUR`}</Text>
        </View>
    );
};
