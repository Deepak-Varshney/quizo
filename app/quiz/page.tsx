'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Both title and description are required.");
      return;
    }

    try {
      await axios.post("/api/quizzes", { title, description });
      toast.success("Quiz created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Error creating quiz.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="max-w-lg w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Create New Quiz</h1>
        <div className="mb-4">
          <Input
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <Textarea
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Quiz
        </Button>
      </form>
    </div>
  );
}
