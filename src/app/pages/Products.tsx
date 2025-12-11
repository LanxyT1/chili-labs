/*Copyright © 2025 Chili Labs. All rights reserved.*/
import { useCallback, useState, type JSX } from "react";
import ProductsFilter from "../../features/products/ProductsFilter";
import ProductList from "../../features/products/ProductList";
import {
    emptyProductFilters,
    type ProductFilters,
} from "../../types/product-filters";

/**
 * Renders the product list component that displays a grid of products.
 * @returns JSX.Element: product list page.
 */
const ProductsPage = (): JSX.Element => {
    const [filterValue, setFilterValue] = useState("");
    const [activeFilters, setActiveFilters] =
        useState<ProductFilters>(emptyProductFilters);

    const handleFilterChange = useCallback((value: string): void => {
        setFilterValue(value);
    }, []);

    const handleOptionsChange = useCallback((filters: ProductFilters): void => {
        setActiveFilters(filters);
    }, []);

    return (
        <section className="p-10">
            <h1 className="text-2xl font-bold mb-4">Our tech collection</h1>
            <p className="mb-6 max-w-3xl">
                Explore our latest smartphones and unbeatable deals. Shop now
                for cutting-edge devices, top brands, and accessories that
                elevate your mobile experience. Whether you’re upgrading or
                searching for the perfect gift, our curated selection has
                something for everyone.
            </p>

            <ProductsFilter
                handleFilterChange={handleFilterChange}
                onFiltersChange={handleOptionsChange}
            />
            <ProductList
                filterValue={filterValue}
                filters={activeFilters}
            />
        </section>
    );
};

export default ProductsPage;
