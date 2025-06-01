import React, { useState, useCallback } from "react";
import { TaskList } from "./components/TaskList";
import { NewTaskForm } from "./components/NewTaskForm";

export const App: React.FC = () => {
  const [refresh, setRefresh] = useState(0);

  const handleModified = useCallback(() => {
    setRefresh((r) => r + 1);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Task Management</h1>
      <NewTaskForm onCreated={handleModified} />
      <TaskList refresh={refresh} onModified={handleModified} />
    </div>
  );
};
