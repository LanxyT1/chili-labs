/*Copyright © 2025 Chili Labs. All rights reserved.*/

export type ProductFilters = {
    price: string[];
    ratings: string[];
    brands: string[];
};

export const emptyProductFilters: ProductFilters = {
    price: [],
    ratings: [],
    brands: [],
};
