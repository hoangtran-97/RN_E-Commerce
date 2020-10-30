import React, { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";

import { addProduct, addProductDB } from "../../redux/actions";
import { AppState, Product, ProductProps } from "../../typings";
import { ThemeContext } from "../../context";

export const ProductPage = ({ route }: ProductProps) => {
    const { theme } = useContext(ThemeContext);
    const { currentUser, token } = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();
    const {
        img,
        name,
        description,
        sizes,
        variants,
        price,
        categories,
    } = route.params.item;
    const variantsPicker = variants.map((variant: string) => ({
        label: `${variant}`,
        value: `${variant}`,
    }));
    const sizesPicker = sizes.map((size: number) => ({
        label: `${size}`,
        value: `${size}`,
    }));
    const textStyle = { ...styles.text, color: theme.text };
    const pickerStyle = {
        ...pickerSelectStyles,
        inputIOS: {
            ...pickerSelectStyles.inputIOS,
            backgroundColor: theme.background,
            color: theme.text,
        },
        inputAndroid: {
            ...pickerSelectStyles.inputAndroid,
            backgroundColor: theme.background,
            color: theme.text,
        },
    };
    return (
        <ScrollView
            style={{ ...styles.container, backgroundColor: theme.foreground }}>
            <Formik
                initialValues={{
                    variants: `${variants[0]}`,
                    sizes: `${sizes[0]}`,
                }}
                onSubmit={(values) => {
                    const cartItem: Product = { ...route.params.item };
                    cartItem.sizes = [];
                    cartItem.sizes.push(parseInt(values.sizes, 10));
                    cartItem.variants = [];
                    cartItem.variants.push(values.variants);
                    const { _id } = currentUser;
                    if (_id) {
                        dispatch(
                            addProductDB(currentUser, cartItem, _id, token),
                        );
                    } else {
                        dispatch(addProduct(cartItem));
                    }
                }}>
                {({ handleSubmit, setFieldValue }) => (
                    <>
                        <Image
                            resizeMode="cover"
                            style={styles.img}
                            source={{
                                uri: `${img}`,
                            }}
                        />
                        <Text style={textStyle}>Product name: {name}</Text>
                        <Text style={textStyle}>
                            Product description: {description}
                        </Text>
                        <Text style={textStyle}>
                            Product category: {categories}
                        </Text>
                        <Text style={textStyle}>Price: {price} EUR</Text>
                        <Text style={textStyle}>Variants:</Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) =>
                                setFieldValue("variants", value)
                            }
                            items={variantsPicker}
                            style={pickerStyle}
                        />
                        <Text style={textStyle}>Sizes:</Text>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={(value) =>
                                setFieldValue("sizes", value)
                            }
                            items={sizesPicker}
                            style={pickerStyle}
                        />
                        <View style={styles.button}>
                            <Button
                                onPress={handleSubmit}
                                title="Add to cart"
                                color="#5AC8FA"
                            />
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        marginLeft: 20,
    },
    container: { flex: 1 },
    img: {
        marginBottom: 10,
        width: "100%",
        height: 300,
    },
    button: { marginVertical: 10 },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginHorizontal: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        marginHorizontal: 10,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
