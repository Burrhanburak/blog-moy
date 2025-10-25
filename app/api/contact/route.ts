import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, serviceType, budget, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Moydus Contact <hello@moydus.com>",
      to: ["hello@moydus.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff4d00; border-bottom: 2px solid #ff4d00; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ff4d00; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
            ${
              serviceType
                ? `<p><strong>Service Type:</strong> ${serviceType
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}</p>`
                : ""
            }
            ${
              budget
                ? `<p><strong>Budget:</strong> ${budget
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}</p>`
                : ""
            }
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Project Details</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Next Steps:</strong> Please respond to this inquiry within 24 hours to maintain our excellent customer service standards.
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 14px;">
            This email was sent from the Moydus contact form at moydus.com/contact
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: "Moydus <hello@moydus.com>",
      to: [email],
      subject: "Thank you for contacting Moydus!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff4d00;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting Moydus! We've received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">What happens next?</h3>
            <ul style="color: #475569;">
              <li>Our team will review your project requirements</li>
              <li>We'll prepare a customized proposal for your needs</li>
              <li>We'll schedule a call to discuss your project in detail</li>
            </ul>
          </div>
          
          <p>In the meantime, feel free to check out our <a href="https://moydus.com/portfolio" style="color: #ff4d00;">portfolio</a> to see examples of our work.</p>
          
          <p>Best regards,<br>The Moydus Team</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 14px;">
            Moydus Digital Agency<br>
            Web Design • SEO • Digital Marketing<br>
            <a href="https://moydus.com" style="color: #ff4d00;">moydus.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
