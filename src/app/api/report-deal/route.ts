import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { dealId, dealTitle } = await req.json();

  await resend.emails.send({
    from: "hello@dealeo.es",
    to: "bjarkirh@gmail.com",
    subject: `⚠️ Price report: ${dealTitle}`,
    html: `
      <p>A user flagged a possibly incorrect price.</p>
      <p><b>Deal:</b> ${dealTitle}</p>
      <p><b>Deal ID:</b> ${dealId}</p>
      <p>Check the deal in the dashboard and verify with the venue.</p>
      <p><a href="https://www.dealeo.es/business/dashboard">Open dashboard →</a></p>
    `,
  });

  return NextResponse.json({ ok: true });
}
