import express from "express";
import cors from "cors";
import { tasksRouter } from "./routes/tasks";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "task-tracker-api" });
});

app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Task Tracker API running on http://localhost:${PORT}`);
});
