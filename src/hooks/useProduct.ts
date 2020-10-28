import { useState, useEffect } from "react";
import { Platform } from "react-native";

import { Product } from "../typings";

export const useProduct = () => {
    const [data, setData] = useState<Product[]>([]);
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
            } catch (error) {}
        };
        loadData();
    }, []);
    return [data];
};
