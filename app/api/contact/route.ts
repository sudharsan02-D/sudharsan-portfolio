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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Log the contact form submission
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // In a production environment, you would integrate with an email service
    // Options include:
    // 1. EmailJS (client-side, no backend needed)
    // 2. Resend API (https://resend.com)
    // 3. SendGrid API
    // 4. Nodemailer with SMTP
    // 5. Formspree (form handling service)

    // Example using Resend API (uncomment and add your API key)
    
    const resendApiKey = process.env.RESEND_API_KEY
    if (resendApiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "sudharsan022601@gmail.com",
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        })
      })
    }
    

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! I will get back to you soon."
    })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: "Something went wrong. Please try again."
      },
      { status: 500 }
    )
  }
}
