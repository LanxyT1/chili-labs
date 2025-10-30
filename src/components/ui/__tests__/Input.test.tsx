/*Copyright © 2025 Chili Labs. All rights reserved.*/

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "../Input";

const mockInput = {
    id: "test-input",
    label: "Test Label",
    placeholder: "Enter text",
};

describe("Input", () => {
    it("renders input with label correctly", () => {
        render(
            <Input
                id={mockInput.id}
                label={mockInput.label}
                placeholder={mockInput.placeholder}
            />,
        );

        expect(screen.getByLabelText(mockInput.label)).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(mockInput.placeholder),
        ).toBeInTheDocument();
    });
});
