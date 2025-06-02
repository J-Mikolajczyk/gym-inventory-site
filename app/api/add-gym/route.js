import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json();
  const { name, address, city, state, zip, phone } = body;

  console.log('Gym added:', { name, address, city, state, zip, phone });

  return NextResponse.json({
    message: "Gym added successfully",
  },
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}