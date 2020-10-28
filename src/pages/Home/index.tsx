import React from "react";
import { SafeAreaView, ScrollView, Text, FlatList } from "react-native";

import { useProduct } from "../../hooks/useProduct";
import { Search } from "../../Components/Search";
import { ProductItem } from "../../Components/ProductItem";

export const Home = () => {
    const [products] = useProduct();
    console.log(products);
    return (
        <SafeAreaView>
            <Search />

            {products.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}

            <Text>Test</Text>
        </SafeAreaView>
    );
};
