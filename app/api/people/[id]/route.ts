import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const person = await prisma.person.findUnique({
      where: { id },
    });

    if (!person) {
      return NextResponse.json(
        { error: "Person not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(person);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch person" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, age, email, phone, position, department, bio } = body;

    if (!name || age === undefined || !email) {
      return NextResponse.json(
        { error: "Name, age, and email are required" },
        { status: 400 }
      );
    }

    const person = await prisma.person.update({
      where: { id },
      data: {
        name,
        age: parseInt(age),
        email,
        phone: phone || null,
        position: position || null,
        department: department || null,
        bio: bio || null,
      },
    });

    return NextResponse.json(person);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("not found")) {
      return NextResponse.json(
        { error: "Person not found" },
        { status: 404 }
      );
    }
    if (errorMessage.includes("Unique constraint failed")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update person" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.person.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("not found")) {
      return NextResponse.json(
        { error: "Person not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete person" },
      { status: 500 }
    );
  }
}
