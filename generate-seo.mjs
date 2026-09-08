import fs from 'node:fs/promises';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>https://10xbin.com/</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://10xbin.com/#architecture</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://10xbin.com/#anatomy</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://10xbin.com/#console</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://10xbin.com/#protocol</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://10xbin.com/#commission</loc>
    <lastmod>2026-09-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

# Dedicated AI Answer Engines & LLM Search Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

User-agent: meta-externalagent
Allow: /

Sitemap: https://10xbin.com/sitemap.xml
Sitemap: https://10xbin.vercel.app/sitemap.xml
`;

const llms = `# 10xbin — Autonomous AI Revenue Infrastructure

> 10xbin engineers autonomous AI revenue infrastructure for high-growth enterprises. Bridges media spend, qualification agents, and bank-settled margin reconciliation into a single high-velocity architecture.

## Overview
- Website: https://10xbin.com
- Production URL: https://10xbin.vercel.app
- Source: https://github.com/ganguydhrubo/10xbin
- Architecture: Autonomous Revenue Engine & 14-Day Sprint

## Core Value Propositions
1. Sub-second Intake Pulse: Real-time autonomous lead qualification via WhatsApp, voice, and conversational agents in under 8 seconds.
2. Signal Loss Mitigation: Consent-aware first-party server-side attribution reconciliation bridging iOS/Safari pixel blackout.
3. Cash Settlement Loop: Directly reconciles reported platform ROAS with bank-settled margin, accounting for cancellations, refunds, and fulfillment fees.
4. INR Director Console: Interactive financial sensitivity calculator modeling revenue recovery based on monthly media spend (₹1L to ₹1Cr) and human response lag.

## 14-Day Execution Protocol
- Chapter I (Days 01–03): Ingestion Audit & Revenue System Blueprint.
- Chapter II (Days 04–10): Agent Deployment & Integrated Intake Pipeline.
- Chapter III (Days 11–14): Margin Lock, Telemetry Instrumentation & Handover.

## Ingestion & Consultation
Submit inquiries via the consultation terminal on https://10xbin.com/#commission or dispatch directly to https://10xbin.com/api/consultation.
`;

await fs.writeFile('sitemap.xml', sitemap.trim() + '\n', 'utf8');
await fs.writeFile('robots.txt', robots.trim() + '\n', 'utf8');
await fs.writeFile('llms.txt', llms.trim() + '\n', 'utf8');
console.log('SEO and AEO files generated successfully.');
