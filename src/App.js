import { useStore } from "./storage/stroe";
import { useState } from "react";

function App() {
  const { tasks, addTask, removeTask, updateTask, isCompleted } = useStore();
  const [inputTask, setInputTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [currentTaskEdit, setCurrentTaskEdit] = useState("");

  const handleAddTask = () => {
    if (inputTask) {
      addTask(inputTask);
      setInputTask("");
    }
  };

  const handleEditTask = (word) => {
    setEditingTaskId(word);
    setCurrentTaskEdit(word);
  };

  const handleSaveEditedTask = (id) => {
    if (currentTaskEdit) {
      updateTask(id, currentTaskEdit);
      setEditingTaskId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-6">
      <div className="bg-slate-200 shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-600">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Todo List</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Add a task"
            className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white rounded-md px-6 py-2 hover:bg-blue-400 transition-colors"
          >
            Add Task
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-green-600">
          All Tasks:
        </h3>
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm text-gray-800 ${
                task.completed ? "line-through text-green-500" : ""
              } border border-gray-200`}
            >
              {editingTaskId === task.id ? (
                <div className="flex w-full space-x-4">
                  <input
                    type="text"
                    value={currentTaskEdit}
                    onChange={(e) => setCurrentTaskEdit(e.target.value)}
                    className="border border-blue-300 rounded-md px-4 py-2 w-full bg-gray-50 text-gray-700"
                  />
                  <button
                    onClick={() => handleSaveEditedTask(task.id)}
                    className="bg-green-400 text-white rounded-md px-4 py-2 hover:bg-green-300 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className="bg-gray-400 text-white rounded-md px-4 py-2 hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex w-full justify-between items-center">
                  <span
                    onClick={() => isCompleted(task.id)}
                    className="cursor-pointer"
                  >
                    {task.task}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() =>
                        handleEditTask(task.id) || setCurrentTaskEdit(task.task)
                      }
                      className="bg-yellow-400 text-white rounded-md px-4 py-2 hover:bg-yellow-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="bg-red-400 text-white rounded-md px-4 py-2 hover:bg-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
