import { connectToMongoose } from "@/lib/mongodb";
import User from '@/app/users/api/models/User'
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongoose();
    const users = await User.find().select('-__v'); // Exclude version field
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToMongoose();
    const { name, email } = await req.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = await User.create({ name, email });

    return NextResponse.json(
      { message: "User added successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
}
