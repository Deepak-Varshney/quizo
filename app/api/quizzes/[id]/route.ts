import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/Quiz";
import { connectToDatabase } from "@/lib/db";

// GET /api/quizzes/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const quiz = await Quiz.findById(params.id);
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
  { params }: { params: Record<string, string> }
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const { title, description } = await req.json();
    const quiz = await Quiz.findByIdAndUpdate(
      params.id,
      { title, description },
      { new: true }
    );
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
  { params }: { params: Record<string, string> }
): Promise<NextResponse> {
  await connectToDatabase();
  try {
    const quiz = await Quiz.findByIdAndDelete(params.id);
    if (!quiz)
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    return NextResponse.json({ message: "Quiz deleted successfully" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error deleting quiz" }, { status: 500 });
  }
}
