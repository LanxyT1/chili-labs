/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { useEffect, useState, type JSX } from "react";
import type { ProductData } from "../../types/product-data";
import Pagination from "../../components/ui/Pagination";
import { Link } from "react-router";
import { fetchProducts } from "../../api/product-api";
import { usePagination, useFilteredItems } from "../../hooks";
import React from "react";
import type { ProductFilters } from "../../types/product-filters";

type ProductListProps = {
    filterValue?: string;
    filters?: ProductFilters;
};

const ITEMS_PER_PAGE: number = 12;

/**
 * ProductList component fetches and displays a paginated list of products.
 * It also filters the products based on the provided filterValue prop.
 * @param filterValue - Optional string to filter products by title.
 * @returns JSX.Element representing the list of products with pagination.
 */
const ProductList = ({
    filterValue,
    filters,
}: ProductListProps): JSX.Element => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setCurrentPage(1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterValue, filters]);

    const onPageChange = (pageNumber: number): void => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const filteredProducts = useFilteredItems({
        items: products,
        filterValue: filterValue || "",
        filterKey: "title",
    });

    const withExtraFilters = filteredProducts.filter((product) => {
        const priceRules = filters?.price || [];
        const ratingRules = filters?.ratings || [];
        const brandRules = filters?.brands || [];

        const matchesPrice =
            priceRules.length === 0 ||
            priceRules.some((rule) => {
                if (rule === "under-300") return product.price < 300;
                if (rule === "300-700")
                    return product.price >= 300 && product.price <= 700;
                if (rule === "over-700") return product.price > 700;
                return true;
            });

        const matchesRating =
            ratingRules.length === 0 ||
            ratingRules.some((rule) => {
                if (rule === "4-plus") return product.rating >= 4;
                if (rule === "3-plus") return product.rating >= 3;
                return true;
            });

        const matchesBrand =
            brandRules.length === 0 ||
            brandRules.includes((product.brand || "").toLowerCase());

        return matchesPrice && matchesRating && matchesBrand;
    });

    const { paginatedItems: paginatedProducts, totalPages } = usePagination({
        items: withExtraFilters,
        currentPage,
        itemsPerPage: ITEMS_PER_PAGE,
    });

    return (
        <div className="flex flex-col gap-6">
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && paginatedProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-600">
                        {filterValue
                            ? "No products found matching your search."
                            : "No products available."}
                    </p>
                </div>
            )}

            {!loading && !error && paginatedProducts.length > 0 && (
                <>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {paginatedProducts.map((product) => (
                            <li
                                key={product.id}
                                className="cl-card"
                            >
                                {product.images &&
                                    product.images.length > 0 && (
                                        <img
                                            alt=""
                                            className="max-h-72 object-contain"
                                            src={product.images[0]}
                                            loading="lazy"
                                        />
                                    )}

                                <h2 className="font-bold">{product.title}</h2>
                                <p className="text-sm text-gray-700">
                                    {product.description}
                                </p>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    {product.brand || "unknown"}
                                </p>
                                <p className="font-medium text-2xl">
                                    ${product.price.toFixed(2)}
                                </p>

                                <Link
                                    aria-label={`View details for ${product.title}`}
                                    className="cl-link"
                                    to={`/products/${product.id}`}
                                >
                                    View Details
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(pageNumber) => onPageChange(pageNumber)}
                    />
                </>
            )}
        </div>
    );
};

export default React.memo(ProductList);
