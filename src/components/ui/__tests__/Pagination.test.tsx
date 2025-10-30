/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

const mockPagination: { [key: string]: number } = {
    currentPage: 1,
    totalPages: 3,
};

describe("Pagination", () => {
    it("renders pagination buttons and handles page changes", () => {
        const onPageChange = vi.fn();

        render(
            <Pagination
                currentPage={mockPagination.currentPage}
                totalPages={mockPagination.totalPages}
                onPageChange={onPageChange}
            />,
        );

        expect(
            screen.getByLabelText("Go to previous page"),
        ).toBeInTheDocument();

        for (let page = 1; page <= mockPagination.totalPages; page++) {
            expect(
                screen.getByLabelText(`Go to page ${page}`),
            ).toBeInTheDocument();
        }

        expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    });
});
