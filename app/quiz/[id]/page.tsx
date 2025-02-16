'use client'
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditQuiz() {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "true") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/quizzes/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => toast.error("Error fetching quiz details."));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Both title and description are required.");
      return;
    }

    try {
      await axios.put(`/api/quizzes/${id}`, { title, description });
      toast.success("Quiz updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Error updating quiz.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="max-w-lg w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Quiz</h1>
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
          Update Quiz
        </Button>
      </form>
    </div>
  );
}
