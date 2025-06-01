import React from "react";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { Task } from "../api/types";
import { api } from "../api/api";

interface TaskListProps {
  refresh: number;
  onModified: () => void;
}

const getNextStatus = (current: string): string => {
  switch (current) {
    case "PENDING":
      return "IN_PROGRESS";
    case "IN_PROGRESS":
      return "COMPLETED";
    case "COMPLETED":
      return "PENDING";
    default:
      return "PENDING";
  }
};

export const TaskList: React.FC<TaskListProps> = ({ refresh, onModified }) => {
  const { data, loading, error } = useFetchTasks(refresh);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      onModified();
    } catch {
      alert("Error deleting task");
    }
  };

  const handleToggle = async (task: Task) => {
    const newStatus = getNextStatus(task.status);
    try {
      await api.put(`/tasks/${task.id}`, { status: newStatus });
      onModified();
    } catch {
      alert("Error toggling status");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!data || data.length === 0) return <p>No tasks found.</p>;

  return (
    <ul className="list-group">
      {data.map((task: Task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{task.title}</strong>
            <br />
            <small className="text-muted">
              Status: {task.status} | Due:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
              <br />
              Created:{" "}
              {new Date(task.createdAt).toLocaleString()}
            </small>
          </div>
          <div className="btn-group btn-group-sm" role="group">
            <button
              className="btn btn-outline-primary"
              onClick={() => handleToggle(task)}
            >
              Toggle Status
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
