import { useState, useEffect } from "react";

import { Product } from "../typings";

export const useProduct = () => {
    const [data, setData] = useState<Product[]>([]);
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/api/v1/products",
                );
                const json = await response.json();
                setData(json);
            } catch (error) {}
        };
        loadData();
    }, []);
    return [data];
};
