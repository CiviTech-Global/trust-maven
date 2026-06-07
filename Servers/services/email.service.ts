import nodemailer from "nodemailer";
import { logger } from "../utils/logger";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "noreply@trustmaven.app";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    logger.warn("Email not configured — SMTP_HOST, SMTP_USER, SMTP_PASS must be set");
    return null;
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const TEXT_TEMPLATES: Record<string, (data: Record<string, string>) => string> = {
  assignment: (d) => `You have been assigned to: ${d.entity}\n\n${d.message}\n\nView details: ${d.url || "#"}`,
  treatment_due: (d) => `Treatment Due: ${d.entity}\n\n${d.message}\n\nDue date: ${d.dueDate || "N/A"}`,
  control_failure: (d) => `Control Failure Alert: ${d.entity}\n\n${d.message}\n\nAction required.`,
  approval: (d) => `Approval Required: ${d.entity}\n\n${d.message}\n\nPlease review and take action.`,
  overdue: (d) => `Overdue Item: ${d.entity}\n\n${d.message}\n\nThis item is past its due date.`,
  info: (d) => `${d.entity}\n\n${d.message}`,
};

export class EmailService {
  async send(options: EmailOptions): Promise<boolean> {
    const t = getTransporter();
    if (!t) return false;

    try {
      await t.sendMail({
        from: EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html || options.text?.replace(/\n/g, "<br>"),
      });
      logger.info(`Email sent to ${options.to}: ${options.subject}`);
      return true;
    } catch (err: any) {
      logger.error(`Failed to send email to ${options.to}: ${err.message}`);
      return false;
    }
  }

  generateText(type: string, data: Record<string, string>): string {
    const template = TEXT_TEMPLATES[type] || TEXT_TEMPLATES.info;
    return template(data);
  }

  isConfigured(): boolean {
    return !!SMTP_HOST && !!SMTP_USER && !!SMTP_PASS;
  }
}

export const emailService = new EmailService();
