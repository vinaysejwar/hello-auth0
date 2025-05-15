"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the Todo interface
interface Todo {
  id: string;
  task: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

const TodoDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTodoDetail = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`/api/todos/${id}`);
          setTodo(res.data);
        } catch (err) {
          console.error("Error fetching todo detail:", err);
          setError("Failed to load todo");
        } finally {
          setLoading(false);
        }
      };

      fetchTodoDetail();
    }
  }, [id]);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!todo) return <div>Todo not found.</div>;

  return (

    <div className="p-4">
      <h1 className="text-xl font-semibold">{todo.task}</h1>
      <p>{todo.description}</p>
      <p>ID: {todo.id}</p>
      <p>createdAt: {todo.createdAt}</p>
      <p>updatedAt: {todo.updatedAt}</p>
    </div>
  );
};

export default TodoDetailPage;
