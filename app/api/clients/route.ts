"use server";

import dbConnect from "@/lib/mongodb";
import Case from "@/models/Case";
import Client from "@/models/Client";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get all clients
export const GET = async () => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const clients = await Client.find().lean();
    const cases = await Case.find().lean();

    const clientsWithCaseCounts = clients.map((client) => {
      const clientCases = cases.filter(
        (c) => c.clientId.toString() === client._id.toString()
      );
      const activeCases = clientCases.filter((c) =>
        ["Open", "In Progress"].includes(c.status)
      );
      return {
        ...client,
        totalCases: clientCases.length,
        activeCases: activeCases.length,
      };
    });

    return NextResponse.json(clientsWithCaseCounts);

    // return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
};

// Create a client
export const POST = async (request: Request) => {
  //   const user = await currentUser();
  //   if (!user) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  await dbConnect();
  const { name, email, phone, address } = await request.json();

  try {
    const client = await Client.create({ name, email, phone, address });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
};
