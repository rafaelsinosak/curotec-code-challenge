export interface Task {
  id: number;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  dueDate: Date;
  createdAt: Date;
}