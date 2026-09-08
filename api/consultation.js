export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const brief = req.body || {};
    const { organization, work_email, monthly_spend, system_gap, mission, scenario } = brief;

    if (!organization || !work_email || !mission) {
      return res.status(400).json({ error: 'Missing required consultation fields.' });
    }

    const recipient = process.env.NOTIFICATION_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;
    const webhookUrl = process.env.WEBHOOK_URL;
    const timestamp = new Date().toISOString();

    const formattedHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #050811; color: #f1f2f4; border: 1px solid #1e293b; border-radius: 4px; overflow: hidden;">
        <div style="background: #080d17; padding: 24px; border-bottom: 1px solid #1e293b;">
          <h2 style="margin: 0; color: #38bdf8; font-size: 20px; letter-spacing: 1px;">⚡ 10XBIN VIP Architecture Brief</h2>
          <p style="margin: 6px 0 0; font-size: 12px; color: #64748b; font-family: monospace;">RECEIVED AT ${timestamp}</p>
        </div>
        
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-family: monospace; width: 160px;">ORGANIZATION:</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">${organization}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-family: monospace;">WORK EMAIL:</td>
              <td style="padding: 10px 0;"><a href="mailto:${work_email}" style="color: #38bdf8; font-size: 15px; text-decoration: none;">${work_email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-family: monospace;">MONTHLY MEDIA SPEND:</td>
              <td style="padding: 10px 0; color: #f59e0b; font-size: 15px; font-weight: 600;">${monthly_spend || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; font-family: monospace;">SYSTEM GAP:</td>
              <td style="padding: 10px 0; color: #e2e8f0; font-size: 14px;">${system_gap || 'General architecture'}</td>
            </tr>
          </table>

          <div style="background: #0a101d; border: 1px solid #1e293b; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-family: monospace; color: #38bdf8; margin-bottom: 8px; letter-spacing: 1px;">THE MISSION / SYSTEM BREAKDOWN:</div>
            <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #cbd5e1; white-space: pre-wrap;">${mission}</p>
          </div>

          ${scenario ? `
            <div style="background: #061214; border: 1px solid #10b98140; border-radius: 4px; padding: 18px; margin-bottom: 24px;">
              <div style="font-size: 11px; font-family: monospace; color: #10b981; margin-bottom: 12px; letter-spacing: 1px;">CALCULATOR SCENARIO AT SUBMISSION:</div>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8;">Input Media Spend:</td>
                  <td style="padding: 6px 0; text-align: right; color: #f1f5f9; font-family: monospace;">₹${Number(scenario.spend || 0).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8;">Human Response Lag:</td>
                  <td style="padding: 6px 0; text-align: right; color: #f59e0b; font-family: monospace;">${scenario.lag || 0} min</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8;">Spend Exposed to Decay:</td>
                  <td style="padding: 6px 0; text-align: right; color: #ef4444; font-family: monospace;">₹${Number(scenario.burn || 0).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #94a3b8;">Recoverable Contribution:</td>
                  <td style="padding: 6px 0; text-align: right; color: #10b981; font-weight: bold; font-family: monospace;">₹${Number(scenario.recovered || 0).toLocaleString('en-IN')}</td>
                </tr>
              </table>
            </div>
          ` : ''}

          <div style="border-top: 1px solid #1e293b; padding-top: 16px; font-size: 11px; color: #64748b; font-family: monospace; display: flex; justify-content: space-between;">
            <span>10XBIN AUTONOMOUS REVENUE INFRASTRUCTURE</span>
            <span>10XBIN.COM</span>
          </div>
        </div>
      </div>
    `;

    // 1. Resend Dispatch (if RESEND_API_KEY configured)
    let emailDispatched = false;
    if (resendKey && recipient) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: '10XBIN Architecture <onboarding@resend.dev>',
            to: [recipient],
            subject: `⚡ New 10XBIN Consultation Brief: ${organization} (${monthly_spend})`,
            html: formattedHtml,
            reply_to: work_email
          })
        });
        let resendData = await resendRes.json();
        if (resendRes.ok) {
          emailDispatched = true;
          console.log('Dispatched via Resend:', resendData.id);
        } else if (resendData.statusCode === 403) {
          console.log('Primary recipient restricted by unverified Resend domain; falling back to account email');
          const fallbackRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: '10XBIN Architecture <onboarding@resend.dev>',
              to: ['gangulydhrubo@gmail.com'],
              subject: `⚡ [10XBIN VIP Brief] ${organization} (${monthly_spend})`,
              html: formattedHtml,
              reply_to: work_email
            })
          });
          const fallbackData = await fallbackRes.json();
          if (fallbackRes.ok) {
            emailDispatched = true;
            console.log('Dispatched to account fallback via Resend:', fallbackData.id);
          } else {
            console.error('Resend fallback error:', fallbackData);
          }
        } else {
          console.error('Resend error:', resendData);
        }
      } catch (err) {
        console.error('Failed to dispatch via Resend:', err);
      }
    }

    // 2. Webhook Dispatch (if WEBHOOK_URL configured, e.g. Google Apps Script / Zapier / Make)
    let webhookDispatched = false;
    if (webhookUrl) {
      try {
        const whRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'consultation_brief',
            recipient,
            brief,
            html: formattedHtml,
            timestamp
          })
        });
        if (whRes.ok) {
          webhookDispatched = true;
          console.log('Dispatched to webhook successfully');
        }
      } catch (err) {
        console.error('Failed to dispatch to webhook:', err);
      }
    }

    // Always log to runtime logger so submission is never lost
    console.log('VIP Consultation Ingested:', {
      organization,
      work_email,
      monthly_spend,
      system_gap,
      emailDispatched,
      webhookDispatched,
      timestamp
    });

    return res.status(200).json({
      ok: true,
      status: 'dispatched',
      delivered: emailDispatched || webhookDispatched,
      message: 'Consultation brief ingested successfully. Our architecture team will contact you within 24 hours.'
    });
  } catch (err) {
    console.error('Consultation handler error:', err);
    return res.status(500).json({ error: 'Failed to process consultation submission.' });
  }
}
