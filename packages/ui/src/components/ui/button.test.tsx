import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Button } from "./button"

describe("Button", () => {
    it("renders correctly", () => {
        render(<Button>Click me</Button>)
        expect(screen.getByText("Click me")).toBeInTheDocument()
    })

    it("applies variant classes", () => {
        render(<Button variant="destructive">Delete</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveClass("bg-destructive")
    })

    it("renders as a slot when asChild is true", () => {
        render(
            <Button asChild>
                <a href="/">Link</a>
            </Button>
        )
        expect(screen.getByRole("link")).toBeInTheDocument()
        expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })
})
