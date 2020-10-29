import React from "react";
import { View, Text } from "react-native";

import { ProductProps } from "../../typings";

export const Product = ({ route }: ProductProps) => {
    const {
        _id,
        img,
        name,
        description,
        sizes,
        variants,
        price,
        categories,
    } = route.params.item;
    // navigation.setOptions({ title: `${_id}` });
    return (
        <View>
            <Text>{_id}</Text>
        </View>
    );
};
