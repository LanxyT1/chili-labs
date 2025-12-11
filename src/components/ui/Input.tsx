/*Copyright © 2025 Chili Labs. All rights reserved.*/

import React, { type JSX } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

/**
 * Input component renders a styled input field with an optional label.
 * @param label - Optional label for the input field.
 * @param className - Additional CSS classes for styling the input.
 * @param props - Other standard input attributes.
 * @returns JSX.Element representing the input field with label.
 */
const Input = (
    { label, className = "", ...props }: InputProps,
    ref?: React.Ref<HTMLInputElement>,
): JSX.Element => (
    <div className="flex flex-col gap-2 relative">
        {label && (
            <label
                className="cl-label absolute -top-3 left-3 bg-white px-1 text-sm"
                htmlFor={props.id}
            >
                {label}
            </label>
        )}
        <input
            ref={ref}
            className={`cl-input ${className}`}
            {...props}
        />
    </div>
);

export default Input;
