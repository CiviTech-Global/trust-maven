import jwt from "jsonwebtoken";
import { User } from "../domain.layer/models/user/user.model";
import { Organization } from "../domain.layer/models/organization/organization.model";
import { Role } from "../domain.layer/models/role/role.model";
import { JwtPayload, UserRole } from "../types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName: string;
  }) {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const organization = await Organization.create({
      name: data.organizationName,
      slug: data.organizationName.toLowerCase().replace(/\s+/g, "-"),
    });

    let defaultRole = await Role.findOne({ where: { name: UserRole.ADMIN } });
    if (!defaultRole) {
      defaultRole = await Role.create({
        name: UserRole.ADMIN,
        description: "Organization administrator",
        permissions: ["*"],
      });
    }

    const user = await User.create({
      email: data.email,
      passwordHash: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      organizationId: organization.id,
      roleId: defaultRole.id,
    });

    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      organizationId: organization.id,
      role: UserRole.ADMIN,
    });

    return { user: user.toSafeJSON(), ...tokens };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role }, { model: Organization }],
    });

    if (!user || !user.isActive) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    await user.update({ lastLogin: new Date() });

    const tokens = this.generateTokens({
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role?.name as UserRole,
    });

    return { user: user.toSafeJSON(), ...tokens };
  }

  async getMe(userId: string) {
    const user = await User.findByPk(userId, {
      include: [{ model: Role }, { model: Organization }],
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  private generateTokens(payload: JwtPayload) {
    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN as string | number,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN as string | number,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
        iat?: number;
        exp?: number;
      };
      const { userId, email, organizationId, role } = decoded;
      return this.generateTokens({ userId, email, organizationId, role });
    } catch {
      throw new Error("Invalid refresh token");
    }
  }
}

export const authService = new AuthService();
