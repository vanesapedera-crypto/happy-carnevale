import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await resend.emails.send({
from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to: "carnevalehappy@gmail.com",
      subject: "Jauna kostīmu rezervācija",
      html: `
        <h2>Jauna kostīmu rezervācija</h2>
        <p><strong>Vārds:</strong> ${body.name || "-"}</p>
        <p><strong>Tālrunis:</strong> ${body.phone || "-"}</p>
        <p><strong>E-pasts:</strong> ${body.email || "-"}</p>
        <p><strong>Datums:</strong> ${body.date || "-"}</p>
        <p><strong>Kostīms:</strong> ${body.costume || "-"}</p>
        <p><strong>Papildu info:</strong> ${body.message || "-"}</p>
      `,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, error: "Resend kļūda" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Neizdevās nosūtīt e-pastu" },
      { status: 500 },
    );
  }
}