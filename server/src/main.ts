import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";
import { authMiddleware } from "./middlewares/auth";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3333;

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ message: "Email, senha e nome de usuário são obrigatórios" });
  }

  try {
    const hasConflict = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (hasConflict) {
      return res.status(409).json({
        message: "Existe um usuário cadastrado com o mesmo email ou username!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
      data: { email, hash: hashedPassword, username },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("PATH: /register - ERROR: ", error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const passwordsMath = await bcrypt.compare(password, user.hash);

    if (!passwordsMath) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    return res.status(200).json({ access_token: token });
  } catch (error) {
    console.error("PATH: /login - ERROR: ", error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  const { id } = req.user!;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const { hash, ...rest } = user;
    return res.status(200).json({ user: rest });
  } catch (error) {
    console.error("PATH: /me - ERROR: ", error);
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

app.post("/verify-token", authMiddleware, async (_req, res) => {
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
