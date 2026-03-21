// app/api/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const runtime = "edge";

export async function POST(req: Request) {
  return Response.json({ message: "OK" });
}