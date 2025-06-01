import React, { useState, useCallback } from "react";
import { api } from "../api/api";

interface NewTaskFormProps {
  onCreated: () => void;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!title.trim() || !dueDate) {
        setError("Title and due date are required");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        await api.post("/tasks", {
          title: title.trim(),
          description: description.trim(),
          status,
          dueDate,
        });

        setTitle("");
        setDescription("");
        setStatus("PENDING");
        setDueDate("");
        onCreated();
      } catch {
        setError("Failed to create task");
      } finally {
        setLoading(false);
      }
    },
    [title, description, status, dueDate, onCreated]
  );

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-2">
        <label htmlFor="task-title" className="form-label">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
          placeholder="Enter title"
          disabled={loading}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="task-desc" className="form-label">
          Description
        </label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Enter description"
          disabled={loading}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="task-status" className="form-label">
          Status
        </label>
        <select
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-select"
          disabled={loading}
        >
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
      </div>

      <div className="mb-2">
        <label htmlFor="task-due" className="form-label">
          Due Date
        </label>
        <input
          id="task-due"
          type="date"
          value={dueDate.slice(0, 10)}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-control"
          disabled={loading}
        />
      </div>

      {error && <div className="form-text text-danger">{error}</div>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};
