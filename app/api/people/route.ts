import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const people = await prisma.person.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(people);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch people" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, age, city, bio } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    const person = await prisma.person.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        age: age ? parseInt(age) : null,
        city: city || null,
        bio: bio || null,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("Unique constraint failed")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 }
    );
  }
}
