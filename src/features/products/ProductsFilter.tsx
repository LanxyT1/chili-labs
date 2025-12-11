/*Copyright © 2025 Chili Labs. All rights reserved.*/

import React, { useEffect, useState, useRef, type JSX } from "react";
import Input from "../../components/ui/Input";
import {
    emptyProductFilters,
    type ProductFilters,
} from "../../types/product-filters";

const DEBOUNCE_DELAY_MS: number = 500;
const PRICE_FILTERS = [
    { label: "Under $300", value: "under-300" },
    { label: "$300 - $700", value: "300-700" },
    { label: "Over $700", value: "over-700" },
];
const RATING_FILTERS = [
    { label: "Rating 4+", value: "4-plus" },
    { label: "Rating 3+", value: "3-plus" },
];
const BRAND_FILTERS = [
    { label: "Apple", value: "apple" },
    { label: "Samsung", value: "samsung" },
    { label: "Xiaomi", value: "xiaomi" },
    { label: "OPPO", value: "oppo" },
    { label: "Huawei", value: "huawei" },
    { label: "Infinix", value: "infinix" },
    { label: "Realme", value: "realme" },
];

type ProductsFilterProps = {
    handleFilterChange: (value: string) => void;
    onFiltersChange: (filters: ProductFilters) => void;
};

/**
 * ProductsFilter component provides a debounced search input for filtering products.
 * This component renders an input field that allows users to type in search queries and send the debounced value back to the parent component.
 * @param handleFilterChange - Callback function triggered with the debounced input value for filtering products.
 * @returns JSX.Element representing the search input field.
 */
const ProductsFilter = ({
    handleFilterChange,
    onFiltersChange,
}: ProductsFilterProps): JSX.Element => {
    const [inputValue, setInputValue] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] =
        useState<ProductFilters>(emptyProductFilters);
    const handleFilterChangeRef = useRef(handleFilterChange);
    const handleOptionsChangeRef = useRef(onFiltersChange);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        handleFilterChangeRef.current = handleFilterChange;
    }, [handleFilterChange]);

    useEffect(() => {
        handleOptionsChangeRef.current = onFiltersChange;
    }, [onFiltersChange]);

    useEffect(() => {
        const searchDebouncer = setTimeout(() => {
            handleFilterChangeRef.current(inputValue);
        }, DEBOUNCE_DELAY_MS);

        return () => {
            clearTimeout(searchDebouncer);
        };
    }, [inputValue]);

    useEffect(() => {
        if (!showFilters) return;
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowFilters(false);
            }
        };
        const handleEsc = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                setShowFilters(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [showFilters]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const toggleFilter = (
        group: keyof ProductFilters,
        value: string,
    ): void => {
        setFilters((prev) => {
            const current = prev[group];
            const alreadySelected = current.includes(value);
            const nextGroup = alreadySelected
                ? current.filter((item) => item !== value)
                : [...current, value];

            const updated = {
                ...prev,
                [group]: nextGroup,
            };

            handleOptionsChangeRef.current(updated);
            return updated;
        });
    };

    return (
        <div
            className="flex flex-col gap-3 mb-8 relative"
            ref={containerRef}
        >
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 w-full">
                <div className="w-full sm:flex-1">
                    <Input
                        label="Search"
                        placeholder="Search products..."
                        className="w-full"
                        role="search"
                        id="productSearch"
                        onChange={onChange}
                        value={inputValue}
                    />
                </div>

                <button
                    type="button"
                    className="cl-button sm:shrink-0"
                    style={{ height: "74px", paddingInline: "32px" }}
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    {showFilters ? "Hide filters" : "Filters"}
                </button>
            </div>

            {showFilters && (
                <div className="absolute z-10 top-full left-0 sm:left-auto sm:right-0 mt-2 sm:w-[520px] border rounded-2xl p-4 bg-white shadow-md flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Price</p>
                        <div className="flex flex-wrap gap-3">
                            {PRICE_FILTERS.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.price.includes(
                                            option.value,
                                        )}
                                        onChange={() =>
                                            toggleFilter("price", option.value)
                                        }
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Rating</p>
                        <div className="flex flex-wrap gap-3">
                            {RATING_FILTERS.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.ratings.includes(
                                            option.value,
                                        )}
                                        onChange={() =>
                                            toggleFilter(
                                                "ratings",
                                                option.value,
                                            )
                                        }
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="font-semibold">Brands</p>
                        <div className="flex flex-wrap gap-3">
                            {BRAND_FILTERS.map((brand) => (
                                <label
                                    key={brand.value}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={filters.brands.includes(
                                            brand.value,
                                        )}
                                        onChange={() =>
                                            toggleFilter(
                                                "brands",
                                                brand.value,
                                            )
                                        }
                                    />
                                    {brand.label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(ProductsFilter);
