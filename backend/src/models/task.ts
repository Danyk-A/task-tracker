export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// In-memory store. Swap for a real database (e.g. PostgreSQL via Prisma)
// in a production version - kept simple here so the app runs instantly
// with zero setup.
const tasks: Task[] = [
  {
    id: "1",
    title: "Set up the project",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build the task list screen",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

export const taskStore = {
  getAll(): Task[] {
    return tasks;
  },

  getById(id: string): Task | undefined {
    return tasks.find((task) => task.id === id);
  },

  create(title: string): Task {
    const task: Task = {
      id: String(nextId++),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  toggleComplete(id: string): Task | undefined {
    const task = taskStore.getById(id);
    if (task) {
      task.completed = !task.completed;
    }
    return task;
  },

  remove(id: string): boolean {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
