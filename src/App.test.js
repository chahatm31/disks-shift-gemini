import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Tower of Hanoi App", () => {
  test("Requirement 1: Moves disks between towers with one disk movable at a time", () => {
    render(<App />);
    const tower1 = screen.getAllByRole("button")[0]; // Assuming towers are buttons
    const tower2 = screen.getAllByRole("button")[1];
    const disk1 = tower1.firstChild;

    fireEvent.click(disk1); // Select disk
    fireEvent.click(tower2); // Move to tower 2

    expect(tower2).toContainElement(disk1); // Disk should be in tower 2
  });

  test("Requirement 2: Prevents invalid moves (larger on smaller)", () => {
    render(<App />);
    const tower1 = screen.getAllByRole("button")[0];
    const tower2 = screen.getAllByRole("button")[1];
    const disk1 = tower1.firstChild;
    const disk2 = tower1.childNodes[1];

    fireEvent.click(disk2); // Select larger disk
    fireEvent.click(tower2); // Move to tower 2 (empty)
    expect(tower2).toContainElement(disk2); // Valid move

    fireEvent.click(disk1); // Select smaller disk
    fireEvent.click(tower2); // Try to move on top of larger disk
    expect(tower1).toContainElement(disk1); // Invalid move, disk should remain in tower 1
  });

  test("Requirement 3: Displays towers and disks clearly", () => {
    render(<App />);
    const towers = screen.getAllByRole("button");
    expect(towers.length).toBe(3); // Should have 3 towers

    const disks = screen.getAllByRole("listitem"); // Assuming disks have role 'listitem'
    expect(disks.length).toBe(3); // Should have 3 disks

    // Add assertions to check disk sizes and arrangement if needed
  });

  // ... (Tests for Requirements 4-12)

  test("Requirement 7: Tracks and displays the number of moves", () => {
    render(<App />);
    const tower1 = screen.getAllByRole("button")[0];
    const tower2 = screen.getAllByRole("button")[1];
    const disk1 = tower1.firstChild;

    fireEvent.click(disk1);
    fireEvent.click(tower2);

    const movesCounter = screen.getByText("Moves: 1"); // Adjust selector if needed
    expect(movesCounter).toBeInTheDocument();
  });

  test("Requirement 8: Resets the puzzle to original positions", () => {
    render(<App />);
    // ... Make some moves ...

    const resetButton = screen.getByRole("button", { name: /reset/i }); // Adjust selector if needed
    fireEvent.click(resetButton);

    // Assert that disks are back to their initial positions
  });

  // ... (Add more tests for other requirements)
});
