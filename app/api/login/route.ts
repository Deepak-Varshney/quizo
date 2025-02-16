import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {

  const { username, password } = await req.json();
  const staticUsername = process.env.TEACHER_USERNAME;
  const staticPassword = process.env.TEACHER_PASSWORD;

  if (username === staticUsername && password === staticPassword) {
    return NextResponse.json({ message: 'Login successful' })
  } else {
    return NextResponse.json({ message: 'Invalid Credentials! Login not success' })
  }
}
