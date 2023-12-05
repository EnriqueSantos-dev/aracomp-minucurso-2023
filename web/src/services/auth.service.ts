import { api } from "@/lib/axios";

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

export async function login({
  email,
  password,
}: LoginParams): Promise<LoginResponse> {
  const { data } = await api.post("/login", {
    email,
    password,
  });
  return data;
}

type RegisterParams = {
  email: string;
  username: string;
  password: string;
};

export async function registerUser({
  username,
  password,
  email,
}: RegisterParams): Promise<LoginResponse> {
  const { data } = await api.post("/register", {
    email,
    username,
    password,
  });

  return data;
}

type MeResponse = {
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
};

export async function me(token: string): Promise<MeResponse> {
  const { data } = await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.user;
}

export async function verifyToken(token: string = ""): Promise<boolean> {
  try {
    await fetch("http:/localhost:3333/verify-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (e) {
    return false;
  }
}
