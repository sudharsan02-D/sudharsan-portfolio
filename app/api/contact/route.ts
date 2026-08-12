import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Get Resend API key from environment variables
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing")

      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      )
    }

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: "sudarshanmssudarshan@gmail.com",
        reply_to: email,
        subject: `Portfolio Contact: ${subject}`,

        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Portfolio Contact Message</h2>

            <p>
              <strong>Name:</strong> ${name}
            </p>

            <p>
              <strong>Email:</strong> ${email}
            </p>

            <p>
              <strong>Subject:</strong> ${subject}
            </p>

            <hr />

            <h3>Message</h3>

            <p>
              ${String(message).replace(/\n/g, "<br />")}
            </p>
          </div>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Resend API error:", data)

      return NextResponse.json(
        {
          error: "Failed to send email",
        },
        { status: 500 }
      )
    }

    console.log("Email sent successfully:", data)

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    })
  } catch (error) {
    console.error("Contact API error:", error)

    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    )
  }
}