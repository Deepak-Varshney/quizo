import { NextRequest, NextResponse } from "next/server"; 
import { connectToDatabase } from "@/lib/db";
import Quiz from "@/models/Quiz";

// GET /api/quizzes/[id]
export async function GET(
  req: NextRequest,
  context: any
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const { id } = context.params as { id: string };
    const quiz = await Quiz.findById(id);
    if (!quiz)
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    return NextResponse.json(quiz, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error retrieving quiz" }, { status: 500 });
  }
}

// PUT /api/quizzes/[id]
export async function PUT(
  req: NextRequest,
  context: any
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const { id } = context.params as { id: string };
    const { title, description } = await req.json();
    const quiz = await Quiz.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!quiz)
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    return NextResponse.json(quiz, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error updating quiz" }, { status: 500 });
  }
}

// DELETE /api/quizzes/[id]
export async function DELETE(
  req: NextRequest,
  context: any
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const { id } = context.params as { id: string };
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz)
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting quiz" }, { status: 500 });
  }
}
