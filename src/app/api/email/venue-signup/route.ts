import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { venueName, venueEmail, city, address, restaurantId } = await req.json();

  await resend.emails.send({
    from: "Dealeo <hello@dealeo.es>",
    to: "bjarkirh@gmail.com",
    subject: `New venue signup: ${venueName}`,
    html: `
      <p>A new venue just signed up on Dealeo.</p>
      <p><b>Venue:</b> ${venueName}</p>
      <p><b>Email:</b> ${venueEmail}</p>
      <p><b>City:</b> ${city}</p>
      <p><b>Address:</b> ${address}</p>
      <p><b>Restaurant ID:</b> ${restaurantId}</p>
      <p><a href="https://www.dealeo.es/admin">Open admin &rarr;</a></p>
    `,
  });

  return NextResponse.json({ ok: true });
}
