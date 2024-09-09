import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useStore = create((set) => ({
  tasks: [],

  addTask: (todo) =>
    set((state) => ({
      tasks: [...state.tasks, { id: uuidv4(), task: todo, completed: false }],
    })),

  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  updateTask: (id, newTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, task: newTask } : t
      ),
    })),
}));
