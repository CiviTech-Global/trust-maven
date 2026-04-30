import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, firstName, lastName, organizationName } = req.body;

      if (!email || !password || !firstName || !lastName || !organizationName) {
        res.status(400).json({
          success: false,
          message: "All fields are required",
        });
        return;
      }

      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        organizationName,
      });

      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      const result = await authService.login(email, password);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = await authService.getMe(req.user!.userId);
      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies?.refreshToken || req.body.refreshToken;

      if (!token) {
        res.status(400).json({ success: false, message: "Refresh token required" });
        return;
      }

      const tokens = await authService.refreshToken(token);
      res.json({ success: true, data: tokens });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }
}

export const authController = new AuthController();
