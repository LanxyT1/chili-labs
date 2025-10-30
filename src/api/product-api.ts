/*Copyright © 2025 Chili Labs. All rights reserved.*/

import type { ProductApiResponse } from "../types/product-api-response";
import type { ProductData } from "../types/product-data";

const DUMMY_API_URL = "https://dummyjson.com/";

export async function fetchProducts(): Promise<ProductData[]> {
    const response = await fetch(
        `${DUMMY_API_URL}products/category/smartphones`,
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products.map((data: ProductApiResponse) => ({
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        thumbnail: data.thumbnail,
        rating: data.rating,
        images: data.images,
    }));
}

export async function fetchProductById(id: string): Promise<ProductData> {
    const response = await fetch(`${DUMMY_API_URL}products/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }

    const data: ProductApiResponse = await response.json();

    return {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        thumbnail: data.thumbnail,
        rating: data.rating,
        images: data.images,
    };
}
