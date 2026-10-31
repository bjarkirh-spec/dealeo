import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, restaurantName } = await req.json();
  if (!email || !restaurantName) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { error } = await resend.emails.send({
    from: "Dealeo <hello@dealeo.es>",
    to: email,
    subject: `${restaurantName} is now live on Dealeo!`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">

        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:26px;font-weight:900;color:#111;margin:0;">You're live on Dealeo!</h1>
          <p style="color:#888;margin-top:8px;font-size:15px;">${restaurantName}</p>
        </div>

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:24px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            Your venue is now approved and visible to customers nearby. Here's how to make the most of it.
          </p>
        </div>

        <div style="margin-bottom:24px;">
          <div style="margin-bottom:16px;">
            <p style="font-weight:700;color:#111;margin:0 0 4px;font-size:14px;">1. Add your deals</p>
            <p style="color:#666;margin:0;font-size:13px;line-height:1.5;">Log in to your dashboard and add all your happy hours, 2-for-1 offers, and food deals. The more deals you add, the more visible you are.</p>
          </div>
          <div style="margin-bottom:16px;">
            <p style="font-weight:700;color:#111;margin:0 0 4px;font-size:14px;">2. Go Live on quiet nights</p>
            <p style="color:#666;margin:0;font-size:13px;line-height:1.5;">Tap "Go Live" on any deal and nearby customers get an instant push notification. Perfect for filling empty seats on slow evenings.</p>
          </div>
          <div style="margin-bottom:16px;">
            <p style="font-weight:700;color:#111;margin:0 0 4px;font-size:14px;">3. Track redemptions in real time</p>
            <p style="color:#666;margin:0;font-size:13px;line-height:1.5;">Your dashboard shows every redemption live &mdash; today, this week, all time.</p>
          </div>
          <div>
            <p style="font-weight:700;color:#111;margin:0 0 4px;font-size:14px;">Founding Venue &mdash; free during launch</p>
            <p style="color:#666;margin:0;font-size:13px;line-height:1.5;">You're one of the first venues on Dealeo. Free now and locked in at a founder rate for as long as you stay.</p>
          </div>
        </div>

        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es/business/dashboard" style="background:#f97316;color:#fff;font-weight:900;font-size:15px;padding:14px 36px;border-radius:14px;text-decoration:none;display:inline-block;">Open my dashboard &rarr;</a>
        </div>

        <div style="border-top:1px solid #f0f0f0;margin:28px 0;"></div>

        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:24px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            Tu local ya est&aacute; aprobado y visible para los clientes cercanos. A&ntilde;ade tus ofertas desde el panel para aparecer en la app.
          </p>
        </div>

        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es/business/dashboard" style="background:#f97316;color:#fff;font-weight:900;font-size:15px;padding:14px 36px;border-radius:14px;text-decoration:none;display:inline-block;">Abrir mi panel &rarr;</a>
        </div>

        <div style="background:#f9fafb;border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
          <p style="font-size:13px;color:#888;margin:0;">
            Questions? / &iquest;Preguntas?<br/>
            WhatsApp: <a href="https://wa.me/34643731206" style="color:#f97316;font-weight:700;">+34 643 731 206</a> &middot;
            <a href="mailto:hello@dealeo.es" style="color:#f97316;font-weight:700;">hello@dealeo.es</a>
          </p>
        </div>

        <p style="color:#bbb;font-size:12px;text-align:center;margin:0;">
          Dealeo &middot; <a href="https://www.dealeo.es/privacy" style="color:#bbb;">Privacy</a>
        </p>
      </div>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ sent: true });
}
