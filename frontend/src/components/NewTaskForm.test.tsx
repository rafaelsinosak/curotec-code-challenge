import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewTaskForm } from "./NewTaskForm";
import { api } from "../api/api";

jest.mock("../api/api");

describe("<NewTaskForm />", () => {
  const mockedApi = api as jest.Mocked<typeof api>;

  it("creates a new task on submit", async () => {
    mockedApi.post.mockResolvedValueOnce({});

    const onCreated = jest.fn();
    render(<NewTaskForm onCreated={onCreated} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2025-12-31" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith("/tasks", {
        title: "New Task",
        description: "",
        status: "PENDING",
        dueDate: "2025-12-31",
      });
      expect(onCreated).toHaveBeenCalled();
    });
  });

  it("shows an error message when title is missing", async () => {
    render(<NewTaskForm onCreated={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: "2025-12-31" },
    });
    fireEvent.click(screen.getByRole("button", { name: /create task/i }));

    expect(await screen.findByText(/title and due date are required/i)).toBeInTheDocument();
  });
});
