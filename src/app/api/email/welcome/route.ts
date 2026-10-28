import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, lang } = await req.json();
  if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });

  const isEs = lang === "es";

  const { error } = await resend.emails.send({
    from: "Dealeo <hello@dealeo.es>",
    to: email,
    subject: isEs ? "¡Bienvenido a Dealeo! 🍊" : "Welcome to Dealeo! 🍊",
    html: isEs ? `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:48px;margin-bottom:8px;">🍊</div>
          <h1 style="font-size:28px;font-weight:900;color:#111;margin:0;">¡Bienvenido a Dealeo!</h1>
          <p style="color:#888;margin-top:8px;font-size:15px;">Las mejores ofertas de bares y restaurantes en Alicante</p>
        </div>
        <div style="background:#fff7ed;border-radius:16px;padding:24px;margin-bottom:24px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            Ya puedes ver happy hours, ofertas 2x1 y descuentos en tiempo real cerca de ti. Cuando un local lance una oferta en vivo, te avisamos al instante.
          </p>
        </div>
        <div style="margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="font-size:24px;">🔴</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Ofertas en vivo</p>
              <p style="color:#888;margin:0;font-size:13px;">Notificaciones al instante cuando un local está en vivo cerca de ti</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="font-size:24px;">🎟️</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Canjear es fácil</p>
              <p style="color:#888;margin:0;font-size:13px;">Muestra el código QR al personal — sin impresiones, sin complicaciones</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:24px;">❤️</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Guarda tus favoritas</p>
              <p style="color:#888;margin:0;font-size:13px;">Guarda las mejores ofertas para no perdértelas</p>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es" style="background:#f97316;color:#fff;font-weight:900;font-size:16px;padding:16px 40px;border-radius:16px;text-decoration:none;display:inline-block;">Ver ofertas →</a>
        </div>
        <p style="color:#bbb;font-size:12px;text-align:center;margin:0;">
          Dealeo · Alicante, España · <a href="https://www.dealeo.es/privacy" style="color:#bbb;">Privacidad</a>
        </p>
      </div>
    ` : `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;">
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:48px;margin-bottom:8px;">🍊</div>
          <h1 style="font-size:28px;font-weight:900;color:#111;margin:0;">Welcome to Dealeo!</h1>
          <p style="color:#888;margin-top:8px;font-size:15px;">The best bar & restaurant deals in Alicante</p>
        </div>
        <div style="background:#fff7ed;border-radius:16px;padding:24px;margin-bottom:24px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            You can now browse happy hours, 2-for-1 drinks and live flash deals near you — updated in real time. When a venue goes live, you'll get an instant notification.
          </p>
        </div>
        <div style="margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="font-size:24px;">🔴</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Live deals</p>
              <p style="color:#888;margin:0;font-size:13px;">Instant push notifications when a venue near you goes live</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
            <span style="font-size:24px;">🎟️</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Redeem in seconds</p>
              <p style="color:#888;margin:0;font-size:13px;">Show the QR code to staff — no printing, no hassle</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:24px;">❤️</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Save your favourites</p>
              <p style="color:#888;margin:0;font-size:13px;">Heart any deal to save it and never miss out</p>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es" style="background:#f97316;color:#fff;font-weight:900;font-size:16px;padding:16px 40px;border-radius:16px;text-decoration:none;display:inline-block;">Browse deals →</a>
        </div>
        <p style="color:#bbb;font-size:12px;text-align:center;margin:0;">
          Dealeo · Alicante, Spain · <a href="https://www.dealeo.es/privacy" style="color:#bbb;">Privacy policy</a>
        </p>
      </div>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ sent: true });
}
