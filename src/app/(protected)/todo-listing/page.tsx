"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Pagination } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  task: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const PAGE_SIZE = 5;

const TodoPage = () => {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState<Todo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"task" | "description" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("/api/todos");
        setMainTask(res.data.reverse()); // newest first
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      const res = await axios.post("/api/todos", { task, description });
      setMainTask([res.data, ...mainTask]);
      setTask("");
      setDescription("");
      setCurrentPage(1);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setMainTask(mainTask.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const handleSort = (field: "task" | "description") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filter
  const filteredTodos = mainTask.filter((todo) =>
    (todo.task + todo.description)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sort
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!sortField) return 0;

    const aField = a[sortField].toLowerCase();
    const bField = b[sortField].toLowerCase();

    if (aField < bField) return sortOrder === "asc" ? -1 : 1;
    if (aField > bField) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const paginatedTodos = sortedTodos.slice(startIdx, startIdx + PAGE_SIZE);

  const handleRowClick = (id: number) => {
    router.push(`/todo-listing/${id}`); // Redirect to the detail page with the todo ID
  };
  
  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-4">
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </form>

      {/* Search Input */}
      <Input.Search
        placeholder="Search tasks or description"
        allowClear
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1); // Reset to first page
        }}
        className="mb-4"
      />

      {/* Table */}
      <table className="w-full table-auto border border-gray-300 shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th
              className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-700 cursor-pointer"
              onClick={() => handleSort("task")}
            >
              Task Name{" "}
              {sortField === "task" && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </th>
            <th
              className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-700 cursor-pointer"
              onClick={() => handleSort("description")}
            >
              Description{" "}
              {sortField === "description" && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </th>
            <th className="px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-700 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedTodos.map((item, index) => (
            <tr  key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td onClick={() => handleRowClick(item.id)} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-800">
                {item.task}
              </td>
              <td onClick={() => handleRowClick(item.id)} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-800">
                {item.description}
              </td>
              <td className="px-4 py-3 border-b border-gray-200 text-center">
                <Button danger onClick={() => handleDelete(item.id)} size="small">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={filteredTodos.length}
        onChange={(page) => setCurrentPage(page)}
        className="mt-4 text-center"
      />
    </div>
  );
};

export default TodoPage;
