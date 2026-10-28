import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { email, restaurantName } = await req.json();
  if (!email || !restaurantName) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const { error } = await resend.emails.send({
    from: "Dealeo <hello@dealeo.es>",
    to: email,
    subject: `âœ… ${restaurantName} ya estÃ¡ en Dealeo! / is now live on Dealeo!`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;background:#fff;">

        <!-- Header -->
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:48px;margin-bottom:8px;">âœ…</div>
          <h1 style="font-size:26px;font-weight:900;color:#111;margin:0;">Â¡Ya estÃ¡s en Dealeo! / You're live on Dealeo!</h1>
          <p style="color:#888;margin-top:8px;font-size:15px;">${restaurantName}</p>
        </div>

        <!-- Divider label -->
        <div style="text-align:center;margin-bottom:20px;">
          <span style="background:#fff7ed;color:#f97316;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:99px;">EspaÃ±ol</span>
        </div>

        <!-- Spanish -->
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:20px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            Tu local ya es visible para miles de clientes en Alicante. AquÃ­ tienes cÃ³mo sacarle el mÃ¡ximo partido.
          </p>
        </div>
        <div style="margin-bottom:24px;">
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
            <span style="font-size:22px;">ðŸ”´</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Activa una oferta en vivo</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">Pulsa "En Vivo" en cualquier oferta y los clientes cercanos reciben una notificaciÃ³n al instante. Perfecto para noches tranquilas.</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
            <span style="font-size:22px;">ðŸ“Š</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Sigue tus canjes en tiempo real</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">Tu panel muestra cada canje al momento â€” hoy, esta semana, en total.</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="font-size:22px;">ðŸŽ</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Local Fundador â€” gratis durante el lanzamiento</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">Eres uno de los primeros 50 locales. Gratis ahora y con precio bloqueado mientras sigas con nosotros.</p>
            </div>
          </div>
        </div>

        <!-- Spanish CTA -->
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es/business/dashboard" style="background:#f97316;color:#fff;font-weight:900;font-size:15px;padding:14px 36px;border-radius:14px;text-decoration:none;display:inline-block;">Abrir mi panel â†’</a>
        </div>

        <!-- Divider -->
        <div style="border-top:1px solid #f0f0f0;margin:28px 0;"></div>

        <!-- English label -->
        <div style="text-align:center;margin-bottom:20px;">
          <span style="background:#fff7ed;color:#f97316;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 12px;border-radius:99px;">English</span>
        </div>

        <!-- English -->
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:16px;padding:20px;margin-bottom:20px;">
          <p style="font-size:15px;color:#333;line-height:1.6;margin:0;">
            Your venue is now visible to thousands of customers in Alicante. Here's how to make the most of it.
          </p>
        </div>
        <div style="margin-bottom:24px;">
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
            <span style="font-size:22px;">ðŸ”´</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Go Live to fill empty seats</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">Tap "Go Live" on any deal and nearby customers get an instant push notification. Great for quiet evenings.</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;">
            <span style="font-size:22px;">ðŸ“Š</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Track your redemptions in real time</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">Your dashboard shows every redemption live â€” today, this week, all time.</p>
            </div>
          </div>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <span style="font-size:22px;">ðŸŽ</span>
            <div>
              <p style="font-weight:700;color:#111;margin:0;font-size:14px;">Founding Venue â€” free during launch</p>
              <p style="color:#888;margin:2px 0 0;font-size:13px;">You're one of the first 50 venues. Free now and locked in at half the standard rate for as long as you stay.</p>
            </div>
          </div>
        </div>

        <!-- English CTA -->
        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://www.dealeo.es/business/dashboard" style="background:#f97316;color:#fff;font-weight:900;font-size:15px;padding:14px 36px;border-radius:14px;text-decoration:none;display:inline-block;">Open my dashboard â†’</a>
        </div>

        <!-- Support -->
        <div style="background:#f9fafb;border-radius:12px;padding:16px;text-align:center;margin-bottom:24px;">
          <p style="font-size:13px;color:#888;margin:0;">
            Â¿Preguntas? / Questions?<br/>
            WhatsApp: <a href="https://wa.me/34643731206" style="color:#f97316;font-weight:700;">+34 643 731 206</a> Â·
            <a href="mailto:hello@dealeo.es" style="color:#f97316;font-weight:700;">hello@dealeo.es</a>
          </p>
        </div>

        <p style="color:#bbb;font-size:12px;text-align:center;margin:0;">
          Dealeo Â· Alicante, EspaÃ±a Â· <a href="https://www.dealeo.es/privacy" style="color:#bbb;">Privacidad / Privacy</a>
        </p>
      </div>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ sent: true });
}

