import { authenticator } from "otplib";
import { MfaSetting } from "../domain.layer/models/mfa/mfa.model";
import { logger } from "../utils/logger";

export class MfaService {
  async generateSecret(userId: string, email: string) {
    const secret = authenticator.generateSecret();
    const serviceName = process.env.APP_NAME || "TrustMaven";
    const otpauth = authenticator.keyuri(email, serviceName, secret);

    await MfaSetting.upsert({
      userId,
      secret,
      isEnabled: false,
      method: "totp",
    });

    return { secret, otpauth };
  }

  async enable(userId: string, token: string): Promise<boolean> {
    const mfa = await MfaSetting.findOne({ where: { userId } });
    if (!mfa) throw new Error("MFA not initialized. Generate a secret first.");

    const isValid = authenticator.verify({ token, secret: mfa.secret });
    if (!isValid) throw new Error("Invalid verification code");

    await mfa.update({ isEnabled: true });
    logger.info(`MFA enabled for user ${userId}`);
    return true;
  }

  async disable(userId: string): Promise<void> {
    await MfaSetting.destroy({ where: { userId } });
    logger.info(`MFA disabled for user ${userId}`);
  }

  async verify(userId: string, token: string): Promise<boolean> {
    const mfa = await MfaSetting.findOne({ where: { userId, isEnabled: true } });
    if (!mfa) throw new Error("MFA is not enabled");

    const isValid = authenticator.verify({ token, secret: mfa.secret });
    if (!isValid) throw new Error("Invalid MFA code");

    return true;
  }

  async isEnabled(userId: string): Promise<boolean> {
    const mfa = await MfaSetting.findOne({ where: { userId, isEnabled: true } });
    return !!mfa;
  }

  async getStatus(userId: string) {
    const mfa = await MfaSetting.findOne({ where: { userId } });
    return {
      isEnabled: mfa?.isEnabled || false,
      isConfigured: !!mfa,
    };
  }
}

export const mfaService = new MfaService();
