/*Copyright © 2025 Chili Labs. All rights reserved.*/

export type ProductApiResponse = {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    rating: number;
    images: string[];
    [key: string]: unknown;
};
