import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission (in production, you would save to database or send email)
    console.log("Contact form submission received:", {
      type: body.type,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      timestamp: body.timestamp,
    });

    // TODO: In production, implement one or more of the following:
    // 1. Save to database (e.g., MongoDB, PostgreSQL, etc.)
    // 2. Send email notification to sales team
    // 3. Integrate with CRM (e.g., Salesforce, HubSpot)
    // 4. Send to third-party service (e.g., SendGrid, Mailchimp)

    // Example: Send email notification (requires email service setup)
    // await sendEmailNotification({
    //   to: "sales@flexibench.com",
    //   subject: `New ${body.type} inquiry from ${body.firstName} ${body.lastName}`,
    //   body: formatEmailBody(body),
    // });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        data: {
          id: `${body.type}-${Date.now()}`, // Generate a simple ID
          timestamp: body.timestamp,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
