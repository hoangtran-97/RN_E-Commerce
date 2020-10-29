import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchProducts } from "../redux/actions/";
import { AppState, Product } from "../typings";

export const useProduct = (query: string) => {
    // const [data, setData] = useState<Product[]>([]);
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const URL =
    //         Platform.OS === "ios"
    //             ? "http://localhost:3001/api/v1/products"
    //             : "http://10.0.2.2:3001/api/v1/products";
    //     const loadData = async () => {
    //         try {
    //             const response = await fetch(URL);
    //             const json = await response.json();
    //             setData(json);
    //             setProducts(json);
    //         } catch (error) {}
    //     };
    //     loadData();
    // }, []);
    // useEffect(() => {
    //     const sorted = [...products].filter((product: Product) =>
    //         product.name.toLowerCase().includes(query.toLowerCase()),
    //     );
    //     setData(sorted);
    // }, [query, products]);
    // return [data];
    const [data, setData] = useState<Product[]>([]);
    const dispatch = useDispatch();
    const products = useSelector((state: AppState) => state.product.list);
    useEffect(() => {
        console.log("rendered");
        dispatch(fetchProducts());
    }, [dispatch]);
    useEffect(() => {
        setData(products);
    }, [products]);
    useEffect(() => {
        const sorted = [...products].filter((product: Product) =>
            product.name.toLowerCase().includes(query.toLowerCase()),
        );
        setData(sorted);
    }, [query, products]);
    return [data];
};
