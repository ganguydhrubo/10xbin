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

    console.log('VMP Consultation Ingestion:', brief);

    return res.status(200).json({
      ok: true,
      status: 'dispatched',
      message: 'Consultation brief ingested successfully. Our architecture team will contact you within 24 hours.'
    });
  } catch (err) {
    console.error('Consultation handler error:', err);
    return res.status(500).json({ error: 'Failed to process consultation submission.' });
  }
}
