"use server";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import dbConnect from "../mongodb";
import Client from "@/models/Client";

export const getAllClients = async () => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    return NextResponse.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
};
