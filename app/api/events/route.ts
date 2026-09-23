import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  try {
    await resend.emails.send({
from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to: "carnevalehappy@gmail.com",

      subject: `🎉 Jauna pasākuma rezervācija - ${body.pakalpojums}`,

      html: `
<div style="max-width:700px;margin:auto;font-family:Arial,sans-serif;background:#fff;border-radius:20px;border:1px solid #eee;overflow:hidden;">

<div style="background:#ec4899;padding:25px;text-align:center;">
<h1 style="color:white;margin:0;">🎉 Happy Carnevale</h1>
<p style="color:white;margin-top:8px;">
Jauns pasākuma rezervācijas pieteikums
</p>
</div>

<div style="padding:35px;">

<h2 style="color:#ec4899;">
${body.pakalpojums}
</h2>

<hr style="margin:25px 0;">

<h3>👤 Klienta informācija</h3>

<p><strong>Vārds:</strong> ${body.vards}</p>

<p><strong>Telefons:</strong> ${body.telefons}</p>

<p><strong>E-pasts:</strong> ${body.epasts || "-"}</p>

<hr style="margin:25px 0;">

<h3>📅 Pasākuma informācija</h3>

<p><strong>Datums:</strong> ${body.datums}</p>

<p><strong>Laiks:</strong> ${body.laiks || "-"}</p>

<p><strong>Adrese:</strong> ${body.adrese}</p>

<p><strong>Bērnu skaits:</strong> ${body.berni}</p>

<p><strong>Bērnu vecums:</strong> ${body.vecums}</p>

<p><strong>Programmas ilgums:</strong> ${body.ilgums}</p>

${
  body.jubilars
    ? `
<hr style="margin:25px 0;">

<h3>🎂 Informācija par jubilāru</h3>

<p><strong>Vārds:</strong> ${body.jubilars}</p>

<p><strong>Vecums:</strong> ${body.jubilaraVecums}</p>
`
    : ""
}

${
  body.tels
    ? `
<hr style="margin:25px 0;">

<h3>🎭 Izvēlētais tēls</h3>

<p>${body.tels}</p>
`
    : ""
}

${
  body.pakalpojums === "animators"
    ? `
<hr style="margin:25px 0;">

<h3>✨ Papildpakalpojumi</h3>

<ul>
${body.eksperimenti ? "<li>🧪 Eksperimenti</li>" : ""}
${body.slaims ? "<li>🧫 Slaimu meistarklase</li>" : ""}
${body.burbuli ? "<li>🫧 Milzu ziepju burbuļi</li>" : ""}
${body.darbnica ? "<li>🎨 Radošā darbnīca</li>" : ""}
${body.led ? "<li>💡 LED Disco</li>" : ""}
${body.folija ? "<li>✨ Folijas Disco</li>" : ""}
</ul>
`
    : ""
}

<hr style="margin:25px 0;">

<h3>💬 Papildu informācija</h3>

<div style="background:#fafafa;padding:18px;border-radius:12px;">
${body.komentars || "-"}
</div>

</div>

</div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}