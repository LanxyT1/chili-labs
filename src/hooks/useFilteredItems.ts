/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { useMemo } from "react";

type UseFilteredItemsProps<T> = {
    items: T[];
    filterValue: string;
    filterKey: keyof T;
};

/**
 * Custom hook for filtering items based on a search value.
 * Performs case-insensitive string matching on the specified key.
 *
 * @template T - The type of items being filtered
 * @param items - Array of items to filter
 * @param filterValue - Search string to filter by
 * @param filterKey - The key of the item to search in
 * @returns Filtered array of items
 */
export function useFilteredItems<T>({
    items,
    filterValue,
    filterKey,
}: UseFilteredItemsProps<T>): T[] {
    return useMemo(() => {
        if (!filterValue) return items;

        const searchTerm = filterValue.toLowerCase();

        return items.filter((item) => {
            const value = item[filterKey];
            if (typeof value === "string") {
                return value.toLowerCase().includes(searchTerm);
            }
            return false;
        });
    }, [items, filterValue, filterKey]);
}
