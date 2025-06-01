import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
