import { login } from "@/services/auth.service";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const requestBody = await request.json();
  const { email, password } = requestBody;

  if (!email || !password) {
    return new Response("Missing email or password", {
      status: 400,
    });
  }

  try {
    const data = await login({ email, password });
    cookies().set("access_token", data.access_token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Ocorreu algum erro no servidor" },
      { status: 500 }
    );
  }
}
