'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      router.push("/");
    }
  }, [router]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("/api/quizzes");
      setQuizzes(res.data);
    } catch (error) {
      toast.error("Error fetching quizzes.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/quizzes/${id}`);
      toast.success("Quiz deleted successfully!");
      fetchQuizzes();
    } catch (error) {
      toast.error("Error deleting quiz.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    toast.success("Logged out successfully.");
    router.push("/");
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
          <Link href="/quiz">
            <Button>Create New Quiz</Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {quizzes.map((quiz) => (
          <Card key={quiz._id} className="p-4">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p className="mt-2">{quiz.description}</p>
            <p className="mt-1 text-sm text-gray-500">
              Created: {new Date(quiz.createdAt).toLocaleString()}
            </p>
            <div className="mt-4 flex space-x-2">
              <Link href={`/quiz/${quiz._id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(quiz._id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
