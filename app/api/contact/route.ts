import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const subjectLabel = {
      'product-inquiry': 'Product Inquiry',
      'order-status': 'Order Status',
      returns: 'Returns & Refunds',
      partnership: 'Partnership Opportunities',
      feedback: 'Feedback',
      other: 'Other',
    }[body.subject] || body.subject;

    // Send email to admin
    const adminResponse = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'sleepycare.lb@gmail.com',
      subject: `New Contact Form Submission: ${subjectLabel}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subjectLabel}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to user
    const userResponse = await resend.emails.send({
      from: 'SleepyCare <onboarding@resend.dev>',
      to: body.email,
      subject: 'We received your message',
      html: `
        <h2>Thank you for contacting SleepyCare!</h2>
        <p>Hi ${body.firstName},</p>
        <p>We have received your message and will get back to you as soon as possible, typically within 24-48 hours during business days.</p>
        <p><strong>Message Details:</strong></p>
        <p><strong>Subject:</strong> ${subjectLabel}</p>
        <p><strong>Your Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>If you have any urgent matters, please contact us directly:</p>
        <p>Email: <a href="mailto:support@sleepycare.com">support@sleepycare.com</a></p>
        <p>Phone: +1 (123) 456-7890</p>
        <p>Best regards,<br>The SleepyCare Team</p>
      `,
    });

    if (!adminResponse || !userResponse) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
