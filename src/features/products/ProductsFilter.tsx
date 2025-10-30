/*Copyright © 2025 Chili Labs. All rights reserved.*/

import React, { useEffect, useState, useRef, type JSX } from "react";
import Input from "../../components/ui/Input";

const DEBOUNCE_DELAY_MS: number = 500;

type ProductsFilterProps = {
    handleFilterChange: (value: string) => void;
};

/**
 * ProductsFilter component provides a debounced search input for filtering products.
 * This component renders an input field that allows users to type in search queries and send the debounced value back to the parent component.
 * @param handleFilterChange - Callback function triggered with the debounced input value for filtering products.
 * @returns JSX.Element representing the search input field.
 */
const ProductsFilter = ({
    handleFilterChange,
}: ProductsFilterProps): JSX.Element => {
    const [inputValue, setInputValue] = useState("");
    const handleFilterChangeRef = useRef(handleFilterChange);

    useEffect(() => {
        handleFilterChangeRef.current = handleFilterChange;
    }, [handleFilterChange]);

    useEffect(() => {
        const searchDebouncer = setTimeout(() => {
            handleFilterChangeRef.current(inputValue);
        }, DEBOUNCE_DELAY_MS);

        return () => {
            clearTimeout(searchDebouncer);
        };
    }, [inputValue]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    return (
        <Input
            label="Search"
            placeholder="Search products..."
            className="w-full mb-8"
            role="search"
            id="productSearch"
            onChange={onChange}
        />
    );
};

export default React.memo(ProductsFilter);
