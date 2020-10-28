import React, { useContext } from "react";
import {
    SafeAreaView,
    Text,
    FlatList,
    View,
    Image,
    StyleSheet,
} from "react-native";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";
import { Product } from "../../typings";
import { ThemeContext } from "../../context";

export const Home = () => {
    const [products] = useProduct();
    const { theme } = useContext(ThemeContext);
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
    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={{
                    uri: `${item.img}`,
                }}
            />
            <Text>{item.name}</Text>
            <Text>{`${item.price} EUR`}</Text>
        </View>
    );
    return (
        <SafeAreaView>
            <Search />
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            <Text>Test</Text>
        </SafeAreaView>
    );
};
