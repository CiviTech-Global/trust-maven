import { Response } from "express";
import { ApiResponse } from "../types";

export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
): void {
  const response: ApiResponse<T> = { success: true, data, message };
  res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode: number = 500
): void {
  const response: ApiResponse = { success: false, message };
  res.status(statusCode).json(response);
}

export function paginate(page: number = 1, limit: number = 20) {
  const offset = (page - 1) * limit;
  return { offset, limit: Math.min(limit, 100) };
}
