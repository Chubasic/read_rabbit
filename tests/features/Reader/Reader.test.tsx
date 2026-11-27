import "../../setup.ts";
import { assert, assertEquals } from "@std/assert";
import { cleanup, render, screen } from "npm:@testing-library/preact";
import Reader from "../../../src/features/Reader/index.tsx";

// Mock tauri invoke
globalThis.invoke = () => Promise.resolve('mock-book-id');

Deno.test("Reader renders children", () => {
  try {
    render(
      <Reader>
        <div data-testid="child">Child content</div>
      </Reader>
    );

    const child = screen.getByTestId("child");
    assert(child !== null, "Child element should be in the document");
    assertEquals(child.textContent, "Child content");
  } finally {
    cleanup();
  }
});

Deno.test("Reader renders toolbar with upload button", () => {
  try {
    render(<Reader><div></div></Reader>);

    const button = screen.getByRole("button");
    assert(button !== null, "Button should be in the document");
  } finally {
    cleanup();
  }
});

Deno.test("Reader renders passed children content", () => {
  try {
    const childText = "Test child content";
    render(
      <Reader>
        <div>{childText}</div>
      </Reader>
    );

    const element = screen.getByText(childText);
    assert(element !== null, "Child text should be in the document");
    assertEquals(element.textContent, childText);
  } finally {
    cleanup();
  }
});

Deno.test("Reader initializes with no file selected", () => {
  try {
    render(<Reader><div></div></Reader>);

    const pdfReader = screen.queryByText(/PDF/i);
    assertEquals(pdfReader, null, "No PDF reader should be present initially");
  } finally {
    cleanup();
  }
});
