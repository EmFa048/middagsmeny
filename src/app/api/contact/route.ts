import { mailerSend } from "@/lib/mailersend";
import { EmailParams, Sender, Recipient } from "mailersend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sentFrom = new Sender(
      process.env.MAILERSEND_SENDER_EMAIL || "MS_X@trial-domain.mlsend.com",
      "Middagsmeny Kontaktform"
    );
    
    // We send the email TO ourselves
    const recipients = [
      new Recipient("hello@edy.se", "Middagsmeny Admin")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(new Recipient(email, name))
      .setSubject(`Nytt meddelande från ${name} via Middagsmeny`)
      .setHtml(`
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #051c2c;">Nytt meddelande från kontaktformuläret</h2>
          <p><strong>Namn:</strong> ${name}</p>
          <p><strong>E-post:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `)
      .setText(`Namn: ${name}\nE-post: ${email}\n\nMeddelande:\n${message}`);

    await mailerSend.email.send(emailParams);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("MailerSend Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
