// app/api/clients/route.ts (unchanged)
"use server";
import dbConnect from "@/lib/mongodb";
import Case from "@/models/Case";
import Client from "@/models/Client";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "3");
  const search = url.searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  try {
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const clients = await Client.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log(
      `API: Page ${page}, Skip: ${skip}, Limit: ${limit}, Search: ${search}`
    );
    console.log(
      "API: Fetched clients:",
      clients.map((c: any) => c._id)
    );

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

    const totalClients = await Client.countDocuments(searchQuery);
    const hasMore = skip + clients.length < totalClients;

    console.log(`API: Total clients: ${totalClients}, Has more: ${hasMore}`);

    return NextResponse.json({
      clients: clientsWithCaseCounts,
      hasMore,
      totalClients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  try {
    const { name, email, phone, address } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const client = await Client.create({ name, email, phone, address });

    return NextResponse.json(
      {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
};
