"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs

type Task = {
  id: string;
  text: string;
  checked: boolean;
};

export const TodoList = ({ className }: { className: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks((prev) => [
        ...prev,
        { id: uuidv4(), text: newTask, checked: false },
      ]);
      setNewTask("");
    }
  };

  const toggleCheck = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task,
      ),
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prev) => prev.filter((task) => !task.checked));
  };

  const clearAllTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div className={`${className} card bg-base-100 border-base-300 border`}>
      <div className="card-body">
        <h2 className="card-title mb-3 flex-none justify-between">
          Список справ
          <div className="join">
            <button
              className="btn btn-sm join-item"
              onClick={clearCompletedTasks}
            >
              Видалити виконане
            </button>
            <button className="btn btn-sm join-item" onClick={clearAllTasks}>
              Видалити все
            </button>
          </div>
        </h2>
        <ul className="grow space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 text-base">
                <input
                  type="checkbox"
                  className="peer checkbox"
                  id={`task-${task.id}`}
                  checked={task.checked}
                  onChange={() => toggleCheck(task.id)}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className="cursor-pointer break-words break-all peer-checked:line-through"
                >
                  {task.text}
                </label>
              </li>
            ))
          ) : (
            <div className="text-base-content/50 w-full text-center">
              Немає справ
            </div>
          )}
        </ul>
        <form onSubmit={addTask}>
          <input
            type="text"
            className="input input-ghost w-full flex-none text-base focus:outline-0"
            placeholder="Додати нову справу..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};
