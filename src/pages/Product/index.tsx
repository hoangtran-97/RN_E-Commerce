import React from "react";
import { View, Text, SafeAreaView } from "react-native";

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
        <SafeAreaView>
            <Text>{_id}</Text>
        </SafeAreaView>
    );
};
