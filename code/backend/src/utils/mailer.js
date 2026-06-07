const { SESv2Client, SendEmailCommand } = require('@aws-sdk/client-sesv2');
const logger = require('./logger');

const client = new SESv2Client({ region: process.env.AWS_REGION || 'ap-south-1' });

const FROM    = 'Zenith Estate Leads <noreply@zenithestate.in>';
const NOTIFY  = process.env.LEAD_NOTIFY_EMAIL || 'info@zenithestate.in';

const sendLeadNotification = async (enquiry) => {
  const sourceLabel = enquiry.source.replace(/_/g, ' ');
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9fafb;padding:24px;border-radius:12px;">
      <div style="background:#006d77;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:20px;">🏠 New Lead — Zenith Estate</h2>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#6b7280;width:140px;font-size:14px;">Name</td>
              <td style="padding:8px 0;font-weight:600;font-size:14px;color:#111827;">${enquiry.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Phone</td>
              <td style="padding:8px 0;font-weight:600;font-size:14px;color:#006d77;">${enquiry.phone}</td></tr>
          ${enquiry.email ? `
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Email</td>
              <td style="padding:8px 0;font-size:14px;color:#111827;">${enquiry.email}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Source</td>
              <td style="padding:8px 0;font-size:14px;">
                <span style="background:#e6f4f5;color:#006d77;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:600;text-transform:capitalize;">${sourceLabel}</span>
              </td></tr>
          ${enquiry.message ? `
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;vertical-align:top;">Message</td>
              <td style="padding:8px 0;font-size:14px;color:#374151;">${enquiry.message}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Received</td>
              <td style="padding:8px 0;font-size:14px;color:#6b7280;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td></tr>
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f3f4f6;">
          <a href="https://admin.zenithestate.in/enquiries"
             style="background:#006d77;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">
            View in Admin Panel →
          </a>
        </div>
      </div>
      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">Zenith Estate — zenithestate.in</p>
    </div>
  `;

  try {
    await client.send(new SendEmailCommand({
      FromEmailAddress: FROM,
      Destination: { ToAddresses: [NOTIFY] },
      Content: {
        Simple: {
          Subject: { Data: `New Lead: ${enquiry.name} (${enquiry.phone})` },
          Body: {
            Html: { Data: html },
            Text: {
              Data: `New lead from Zenith Estate website.\n\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email || 'N/A'}\nSource: ${sourceLabel}\nMessage: ${enquiry.message || 'N/A'}\n\nView at https://admin.zenithestate.in/enquiries`,
            },
          },
        },
      },
    }));
    logger.info(`Lead notification sent for enquiry from ${enquiry.name}`);
  } catch (err) {
    // Non-fatal — lead is already saved in DB, notification is best-effort
    logger.warn(`Lead notification email failed: ${err.message}`);
  }
};

module.exports = { sendLeadNotification };
