import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://automated-aquarium-backend.vercel.app/fishFeeder",
      {
        headers: new Headers({
          "api-key": `${process.env.BACKEND_API_KEY}`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching fish feeder data:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}