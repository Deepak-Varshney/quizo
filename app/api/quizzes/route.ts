import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/Quiz";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  await connectToDatabase();
  try {
    const teacher = process.env.TEACHER_USERNAME;
    const quizzes = await Quiz.find({ teacher }).sort({ createdAt: -1 });
    return NextResponse.json(quizzes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving quizzes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
    await connectToDatabase();

  try {
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required" },
        { status: 400 }
      );
    }
    const teacher = process.env.TEACHER_USERNAME;
    const quiz = await Quiz.create({ title, description, teacher });
    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating quiz" },
      { status: 500 }
    );
  }
}
