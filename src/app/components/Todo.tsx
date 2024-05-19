"use client";
import React, { useState, useEffect } from "react";

export interface todos {
  id: number;
  title: string;
  completed: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  const addTodos = () => {
    const newTodo = {
      id: Math.random(),
      title: todoName,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodoName("");
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        t.completed = !t.completed;
      }
      return t;
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 md:p-8 lg:p-16">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
      <div className="relative w-full max-w-md p-6 md:p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl backdrop-filter backdrop-blur-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          Todo App
        </h1>
        <div className="flex flex-col mb-6">
          <textarea
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            placeholder="Add a new todo..."
            className="p-3 md:p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4 resize-none text-gray-700 placeholder-gray-400 shadow-sm"
            rows={3}
          />
          <button
            className="p-2 md:p-3 bg-purple-700 rounded-lg hover:bg-purple-900 text-white font-bold transition-colors duration-300 shadow-md"
            onClick={addTodos}
          >
            Add Todo
          </button>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col items-center md:flex-row justify-between p-3 md:p-4 bg-gray-200 bg-opacity-75 rounded-lg shadow-md backdrop-filter backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-2 md:mb-0 w-full md:w-auto">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => checkTodo(todo.id)}
                  className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span
                  className={`text-base md:text-lg font-medium ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="flex items-center bg-gradient-to-r from-red-500 to-red-600 px-2 md:px-3 py-1 md:py-2 rounded-lg hover:from-red-600 hover:to-red-700 text-white font-bold transition-transform duration-300 transform hover:scale-105 shadow-md"
              >
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
