import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to: "carnevalehappy@gmail.com",
      subject: "🎭 Jauna kostīmu rezervācija",

      html: `
        <div style="max-width:700px;margin:auto;font-family:Arial,sans-serif;background:#fff;border-radius:20px;border:1px solid #eee;overflow:hidden;">

          <div style="background:#ec4899;padding:25px;text-align:center;">
            <h1 style="color:#fff;margin:0;">🎭 Happy Carnevale</h1>
            <p style="color:#fff;margin-top:8px;">
              Jauna kostīmu rezervācija
            </p>
          </div>

          <div style="padding:35px;">

            ${
              body.image
                ? `
                <div style="text-align:center;margin-bottom:30px;">
                  <img
                    src="https://happycarnevale.lv${body.image}"
                    alt="${body.costume || ""}"
                    style="max-width:280px;width:100%;border-radius:16px;border:1px solid #ddd;"
                  />
                </div>
                `
                : ""
            }

            <h2 style="color:#ec4899;margin-bottom:20px;">
              ${body.costume || "-"}
            </h2>

            <hr style="margin:25px 0;">

            <h3>👤 Klienta informācija</h3>

            <p><strong>Vārds:</strong> ${body.name || "-"}</p>
            <p><strong>Tālrunis:</strong> ${body.phone || "-"}</p>
            <p><strong>E-pasts:</strong> ${body.email || "-"}</p>

            <hr style="margin:25px 0;">

            <h3>📅 Rezervācijas informācija</h3>

            <p><strong>Datums:</strong> ${body.date || "-"}</p>

            <hr style="margin:25px 0;">

            <h3>💬 Papildu informācija</h3>

            <div style="background:#fafafa;padding:18px;border-radius:12px;">
              ${body.message || "-"}
            </div>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        {
          ok: false,
          error: "Resend kļūda",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        error: "Neizdevās nosūtīt e-pastu",
      },
      {
        status: 500,
      }
    );
  }
}