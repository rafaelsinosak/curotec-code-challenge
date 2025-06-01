import React from "react";
import { render } from "@testing-library/react";
import { TaskList } from "./TaskList";

describe("<TaskList />", () => {
  it("renders without crashing", () => {
    const mockOnModified = jest.fn();
    render(<TaskList refresh={0} onModified={mockOnModified} />);
  });
});
