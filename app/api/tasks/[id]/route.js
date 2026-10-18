import { Task } from "@/app/models/task";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const { title, desc, prior } = await request.json();

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: title,
        desc: desc,
        prior: prior,
      },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" });
    }

    return NextResponse.json({ message: "Updated", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Failed to update task", error: error.message },
      { status: 500 }
    );
  }
}