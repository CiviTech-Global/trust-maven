import { User } from "../domain.layer/models/user/user.model";
import { Role } from "../domain.layer/models/role/role.model";
import { Organization } from "../domain.layer/models/organization/organization.model";
import crypto from "crypto";

export class UserService {
  async findAll(organizationId: string) {
    return User.findAll({
      where: { organizationId },
      attributes: { exclude: ["passwordHash"] },
      include: [{ model: Role, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id: string, organizationId: string) {
    const user = await User.findOne({
      where: { id, organizationId },
      attributes: { exclude: ["passwordHash"] },
      include: [
        { model: Role, attributes: ["id", "name"] },
        { model: Organization, attributes: ["id", "name", "slug"] },
      ],
    });
    if (!user) throw new Error("User not found");
    return user;
  }

  async update(id: string, data: Partial<{ firstName: string; lastName: string }>, organizationId: string) {
    const user = await User.findOne({ where: { id, organizationId } });
    if (!user) throw new Error("User not found");

    await user.update(data);
    return user.toSafeJSON();
  }

  async create(
    data: { email: string; firstName: string; lastName: string; roleId?: string },
    organizationId: string
  ) {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) throw new Error("A user with this email already exists");

    const tempPassword = crypto.randomBytes(8).toString("hex");

    let resolvedRoleId = data.roleId;
    if (resolvedRoleId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(resolvedRoleId)) {
      const roleByName = await Role.findOne({ where: { name: resolvedRoleId } });
      if (roleByName) resolvedRoleId = roleByName.id;
      else resolvedRoleId = undefined;
    }

    const user = await User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: tempPassword,
      organizationId,
      roleId: resolvedRoleId || undefined,
      isActive: true,
    });

    return user.toSafeJSON();
  }

  async updateRole(id: string, roleId: string, organizationId: string) {
    const user = await User.findOne({ where: { id, organizationId } });
    if (!user) throw new Error("User not found");

    await user.update({ roleId });
    return user.toSafeJSON();
  }

  async deactivate(id: string, organizationId: string) {
    const user = await User.findOne({ where: { id, organizationId } });
    if (!user) throw new Error("User not found");

    await user.update({ isActive: false });
  }

  async activate(id: string, organizationId: string) {
    const user = await User.findOne({ where: { id, organizationId } });
    if (!user) throw new Error("User not found");

    await user.update({ isActive: true });
  }
}

export const userService = new UserService();
