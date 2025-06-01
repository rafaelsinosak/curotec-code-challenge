import React, { useState, useCallback } from "react";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { useSearchTasks } from "../hooks/useSearchTasks";
import { Task } from "../api/types";
import { api } from "../api/api";

interface TaskListProps {
  tasks: Task[];
  onModified: () => void;
}

const TaskListInline: React.FC<TaskListProps> = ({ tasks, onModified }) => {
  const [optimisticStatus, setOptimisticStatus] = useState<Record<number, string>>({});
  const [toggleError, setToggleError] = useState<string | null>(null);

  const handleToggleStatus = async (task: Task) => {
    const originalStatus = task.status;
    const newStatus =
      originalStatus === "PENDING"
        ? "IN_PROGRESS"
        : originalStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : "PENDING";

    setOptimisticStatus((prev) => ({ ...prev, [task.id]: newStatus }));

    try {
      await api.put<Task>(`/tasks/${task.id}`, {
        title: task.title,
        description: task.description,
        status: newStatus,
        dueDate: task.dueDate,
      });
      setOptimisticStatus((prev) => {
        const copy = { ...prev };
        delete copy[task.id];
        return copy;
      });
      onModified();
    } catch {
      setOptimisticStatus((prev) => {
        const copy = { ...prev };
        delete copy[task.id];
        return copy;
      });
      setToggleError("Failed to toggle status. Please try again.");
      setTimeout(() => setToggleError(null), 3000);
    }
  };

  return (
    <div>
      {toggleError && <div className="alert alert-danger">{toggleError}</div>}

      <ul className="list-group">
        {tasks.map((task) => {
          const displayedStatus = optimisticStatus[task.id] ?? task.status;
          return (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between"
            >
              <div>
                <strong>{task.title}</strong>
                <br />
                <small className="text-muted">
                  Status: {displayedStatus} | Due: {new Date(task.dueDate).toLocaleDateString()}
                </small>
              </div>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => handleToggleStatus(task)}
              >
                {displayedStatus === "COMPLETED" ? "Mark Pending" : "Toggle Status"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const TaskPage: React.FC = () => {
  const [tab, setTab] = useState<"all" | "search">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshCounter, setRefreshCounter] = useState(0);

  const { data: allData, loading: allLoading, error: allError } = useFetchTasks(refreshCounter);
  const { data: searchData, loading: searchLoading, error: searchError } = useSearchTasks(searchTerm);

  const handleModified = useCallback(() => {
    setRefreshCounter((c) => c + 1);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Task Manager (with Optimistic Toggle + Debounced Search)</h1>

      <div className="mb-3">
        <button
          className={`btn btn-${tab === "all" ? "primary" : "secondary"} me-2`}
          onClick={() => setTab("all")}
        >
          All Tasks
        </button>
        <button
          className={`btn btn-${tab === "search" ? "primary" : "secondary"}`}
          onClick={() => setTab("search")}
        >
          Search Tasks
        </button>
      </div>

      {tab === "search" && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type a task title / description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {tab === "all" ? (
        allLoading ? (
          <p>Loading all tasks...</p>
        ) : allError ? (
          <p className="text-danger">{allError}</p>
        ) : allData ? (
          <TaskListInline tasks={allData} onModified={handleModified} />
        ) : (
          <p>No tasks found.</p>
        )
      ) : (
        searchLoading ? (
          <p>Searching...</p>
        ) : searchError ? (
          <p className="text-danger">{searchError}</p>
        ) : searchData && searchData.length > 0 ? (
          <TaskListInline tasks={searchData} onModified={handleModified} />
        ) : (
          <p>No matching tasks.</p>
        )
      )}
    </div>
  );
};
