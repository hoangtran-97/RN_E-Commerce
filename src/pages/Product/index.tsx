import React from "react";
import { View, Text } from "react-native";

export const Product = ({
    route,
    navigation,
}: {
    route: any;
    navigation: any;
}) => {
    const { _id } = route.params.item;
    // navigation.setOptions({ title: `${_id}` });
    return (
        <View>
            <Text>{_id}</Text>
        </View>
    );
};
