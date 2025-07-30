import dbConnect from "@/lib/mongodb";
import Case from "@/models/Case";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { NextResponse } from "next/server";

// Get all cases
export const GET = async () => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const cases = await Case.find().populate("clientId");
    return NextResponse.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
};

// Create a new case
export const POST = async (request: Request) => {
  const user = await currentUser();
  if (!user) {
    NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { title, description, clientId, status, hearings } =
    await request.json();

  try {
    const currentDate = new Date();
    const processedHearings =
      hearings?.map((hearing: any) => ({
        ...hearing,
        status: new Date(hearing.date < currentDate ? "Previous" : "Upcoming"),
      })) || [];

    const caseDoc = await Case.create({
      title,
      description,
      clientId,
      status,
      hearings: processedHearings,
    });
    return NextResponse.json(caseDoc, { status: 201 });
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
};
