import React from "react";
import { View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { AppState, Product } from "../../typings";

export const Cart = () => {
    const { inCart } = useSelector((state: AppState) => state.product);
    console.log(inCart);

    return (
        <View>
            <Text>Cart</Text>
        </View>
    );
};
