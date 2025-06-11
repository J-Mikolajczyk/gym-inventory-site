import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json();
  const gymData = body;
  const { name, address, city, state, zip, phone } = body;

  try {
      const response = await fetch('https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Gym added successfully:', data);
    } catch (error) {
      console.error('Error adding gym:', error);
    }

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