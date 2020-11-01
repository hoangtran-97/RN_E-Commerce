import React, { useContext, useState } from "react";
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";

import { Product } from "../../typings";
import { ThemeContext } from "../../context";

export const HomeItem = ({
    item,
    navigation,
}: {
    item: Product;
    navigation: any;
}) => {
    const { theme } = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(true);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                navigation.navigate("Product", { item });
            }}
            style={{
                ...styles.container__item,
                backgroundColor: theme.foreground,
            }}>
            <Image
                onLoadEnd={() => setIsLoading((prev) => !prev)}
                resizeMode="cover"
                style={styles.img}
                source={{
                    uri: `${item.img}`,
                }}
            />
            <ActivityIndicator
                size="large"
                style={styles.activityIndicator}
                animating={isLoading}
            />
            <Text style={{ ...styles.item__name, color: theme.text }}>
                {item.name}
            </Text>
            <Text style={{ ...styles.item__price, color: theme.text }}>
                {`${item.price} EUR`}
            </Text>
        </TouchableOpacity>
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    activityIndicator: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
