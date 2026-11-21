import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const TARGET_EMAIL = process.env.CONTACT_TO_EMAIL || 'vertexdeskcapital@gmail.com';
const WHATSAPP_NUMBER = '919319799796';

interface TraderApplicationBody {
  fullName: string;
  email: string;
  messenger: string;
  country: string;
  experienceYears: string;
  markets: string[];
  monthlyReturnRange: string;
  bio: string;
  acceptedTerms: boolean;
  submittedAt?: string;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildInquirySummaryText(data: TraderApplicationBody): string {
  return [
    'New Trader Application — Vertex Desk Capital',
    '===========================================',
    `Full Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `WhatsApp / Telegram: ${data.messenger}`,
    `Country: ${data.country}`,
    `Trading Experience: ${data.experienceYears}`,
    `Markets Traded: ${data.markets.join(', ')}`,
    `Avg Monthly Return Range: ${data.monthlyReturnRange}`,
    '',
    'Strategy & Bio:',
    data.bio,
    '',
    `Submitted At: ${data.submittedAt || new Date().toISOString()}`,
  ].join('\n');
}

function buildInquiryHtml(data: TraderApplicationBody): string {
  const rows = [
    ['Full Name', escapeHtml(data.fullName)],
    ['Applicant Email', escapeHtml(data.email)],
    ['WhatsApp / Telegram', escapeHtml(data.messenger)],
    ['Country', escapeHtml(data.country)],
    ['Trading Experience', escapeHtml(data.experienceYears)],
    ['Markets Traded', escapeHtml(data.markets.join(', '))],
    ['Avg Monthly Return', escapeHtml(data.monthlyReturnRange)],
    ['Submitted At', escapeHtml(data.submittedAt || new Date().toISOString())],
  ];

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; background:#070B14; color:#F1F5F9; padding:32px; border-radius:12px;">
      <div style="max-width:620px; margin:0 auto; background:#0B1221; border:1px solid #1E293B; border-radius:12px; padding:28px;">
        <p style="margin:0 0 6px; font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#D4AF37;">
          Vertex Desk Capital · Trader Intake
        </p>
        <h1 style="margin:0 0 20px; font-size:20px; color:#FFFFFF;">
          New Funded Trader Application
        </h1>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          ${rows
            .map(
              ([label, val]) => `
            <tr>
              <td style="padding:10px 12px; border-bottom:1px solid #1E293B; color:#94A3B8; width:38%;">${label}</td>
              <td style="padding:10px 12px; border-bottom:1px solid #1E293B; color:#F8FAFC; font-weight:600;">${val}</td>
            </tr>`,
            )
            .join('')}
        </table>
        <div style="margin-top:20px; padding:16px; background:#070B14; border:1px solid #1E293B; border-radius:8px;">
          <p style="margin:0 0 8px; font-size:12px; color:#60A5FA; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
            Short Bio &amp; Strategy Overview
          </p>
          <p style="margin:0; font-size:14px; line-height:1.6; color:#E2E8F0; white-space:pre-wrap;">${escapeHtml(
            data.bio,
          )}</p>
        </div>
      </div>
    </div>
  `;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    const smtpConfigured = Boolean(process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS);
    res.json({ status: 'ok', recipient: TARGET_EMAIL, smtpConfigured });
  });

  // Trader Application submission endpoint -> forwards directly to vertexdeskcapital@gmail.com
  app.post('/api/apply', async (req, res) => {
    const body = req.body as Partial<TraderApplicationBody>;

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const messenger = typeof body.messenger === 'string' ? body.messenger.trim() : '';
    const country = typeof body.country === 'string' ? body.country.trim() : '';
    const experienceYears =
      typeof body.experienceYears === 'string' ? body.experienceYears.trim() : '';
    const monthlyReturnRange =
      typeof body.monthlyReturnRange === 'string' ? body.monthlyReturnRange.trim() : '';
    const bio = typeof body.bio === 'string' ? body.bio.trim() : '';
    const markets = Array.isArray(body.markets)
      ? body.markets.filter((m): m is string => typeof m === 'string' && m.trim().length > 0)
      : [];
    const acceptedTerms = Boolean(body.acceptedTerms);

    if (
      fullName.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      messenger.length < 3 ||
      country.length < 2 ||
      !experienceYears ||
      markets.length === 0 ||
      !monthlyReturnRange ||
      bio.length < 20 ||
      !acceptedTerms
    ) {
      res.status(400).json({
        ok: false,
        error: 'Please complete all required application fields accurately.',
      });
      return;
    }

    const payload: TraderApplicationBody = {
      fullName,
      email,
      messenger,
      country,
      experienceYears,
      markets,
      monthlyReturnRange,
      bio,
      acceptedTerms,
      submittedAt: body.submittedAt || new Date().toISOString(),
    };

    const textBody = buildInquirySummaryText(payload);
    const htmlBody = buildInquiryHtml(payload);
    const subject = `New Trader Application: ${fullName} (${markets.join(', ')})`;

    const smtpPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpUser = process.env.SMTP_USER || TARGET_EMAIL;

    // 1. Direct SMTP delivery (Gmail / custom SMTP)
    if (smtpPass) {
      try {
        const smtpPort = Number(process.env.SMTP_PORT || 465);
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Vertex Desk Capital" <${smtpUser}>`,
          to: TARGET_EMAIL,
          replyTo: email,
          subject,
          text: textBody,
          html: htmlBody,
        });

        res.json({
          ok: true,
          delivery: 'smtp',
          recipient: TARGET_EMAIL,
        });
        return;
      } catch (err) {
        console.error('SMTP delivery error:', err);
        res.status(502).json({
          ok: false,
          error:
            'Unable to dispatch email via SMTP. Please verify your Gmail App Password or contact us directly.',
        });
        return;
      }
    }

    // 2. Optional Resend API key delivery
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Vertex Desk Capital <onboarding@resend.dev>',
            to: [TARGET_EMAIL],
            reply_to: email,
            subject,
            text: textBody,
            html: htmlBody,
          }),
        });

        if (!resendRes.ok) {
          throw new Error(`Resend HTTP ${resendRes.status}`);
        }

        res.json({
          ok: true,
          delivery: 'resend',
          recipient: TARGET_EMAIL,
        });
        return;
      } catch (err) {
        console.error('Resend delivery error:', err);
      }
    }

    // 3. Optional Webhook fallback (e.g. Google Apps Script / Zapier / Make)
    if (process.env.APPLICATION_WEBHOOK_URL) {
      try {
        const hookRes = await fetch(process.env.APPLICATION_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipient: TARGET_EMAIL, ...payload }),
        });
        if (hookRes.ok) {
          res.json({
            ok: true,
            delivery: 'webhook',
            recipient: TARGET_EMAIL,
          });
          return;
        }
      } catch (err) {
        console.error('Webhook delivery error:', err);
      }
    }

    // 4. Logged locally when SMTP secret has not been configured yet;
    // return mailto and WhatsApp prefilled links so the applicant can also send immediately.
    console.info(`[Application Logged -> Pending SMTP Secret for ${TARGET_EMAIL}]`, {
      fullName,
      email,
      messenger,
      country,
      markets,
    });

    const mailtoHref = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(textBody)}`;
    const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textBody)}`;

    res.json({
      ok: true,
      delivery: 'direct_action_fallback',
      recipient: TARGET_EMAIL,
      mailtoHref,
      whatsappHref,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vertex Desk Capital server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
