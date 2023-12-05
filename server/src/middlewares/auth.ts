import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorization = request.headers.authorization;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) {
    return response.status(401).json({ message: "Token não informado" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    request.user = { id: payload.sub as string };
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token inválido" });
  }
}
