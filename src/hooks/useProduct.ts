import { useState, useEffect } from "react";
import { Platform } from "react-native";

import { Product } from "../typings";

export const useProduct = (query: string) => {
    const [data, setData] = useState<Product[]>([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const URL =
            Platform.OS === "ios"
                ? "http://localhost:3001/api/v1/products"
                : "http://10.0.2.2:3001/api/v1/products";
        const loadData = async () => {
            try {
                const response = await fetch(URL);
                const json = await response.json();
                setData(json);
                setProducts(json);
            } catch (error) {}
        };
        loadData();
    }, []);
    useEffect(() => {
        const sorted = [...products].filter((product: Product) =>
            product.name.toLowerCase().includes(query.toLowerCase()),
        );
        setData(sorted);
    }, [query, products]);
    return [data];
};
