/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { useMemo } from "react";

type UsePaginationProps<T> = {
    items: T[];
    currentPage: number;
    itemsPerPage: number;
};

type UsePaginationReturn<T> = {
    paginatedItems: T[];
    totalPages: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

/**
 * Custom hook for managing pagination logic.
 * Calculates paginated items, total pages, and pagination state.
 *
 * @template T - The type of items being paginated
 * @param items - Array of items to paginate
 * @param currentPage - Current page number (1-indexed)
 * @param itemsPerPage - Number of items to display per page
 * @returns Object containing paginated items and pagination metadata
 */
export function usePagination<T>({
    items,
    currentPage,
    itemsPerPage,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
    return useMemo(() => {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = items.slice(startIndex, endIndex);

        return {
            paginatedItems,
            totalPages,
            startIndex,
            endIndex,
            hasNextPage: currentPage < totalPages,
            hasPreviousPage: currentPage > 1,
        };
    }, [items, currentPage, itemsPerPage]);
}
