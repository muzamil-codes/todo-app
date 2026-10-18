import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import dns from "node:dns/promises";
import { Task } from "@/app/models/task";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function GET() {
  await dbConnect();
  const data = await Task.find();
  return NextResponse.json(data);
}

export async function POST(req) {
  await dbConnect();
  const { title, desc, prior } = await req.json();

  if (!title || !prior) {
    return NextResponse.json({ error: "Please fill out all the fields" });
  }

  const addTask = new Task({
    title: title,
    desc: desc,
    prior: prior,
  });

  await addTask.save();
  return NextResponse.json({ message: "Task Saved!" });
}

export async function DELETE(request) {
  await dbConnect();
  const id = request.nextUrl.searchParams.get("id");
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task  Deleted" });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const { newTitle, newDesc, newPrior } = await request.json();
  const id = await params;

  await Task.findByIdAndUpdate(id);

  // const saveTask = await Task.save({
  //   newTitle,
  //   newDesc,
  //   newPrior,
  // });
}
