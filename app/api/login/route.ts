import { NextRequest, NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const { username, password } = await req.json();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
