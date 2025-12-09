import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ForgotPasswordRequest {
  email: string;
  resetToken: string;
  resetLink: string;
  userName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ForgotPasswordRequest;

    // Validate required fields
    if (!body.email || !body.resetToken || !body.resetLink) {
      return NextResponse.json(
        { error: 'Missing required fields: email, resetToken, resetLink' },
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

    // Send password reset email
    const response = await resend.emails.send({
      from: 'SleepyCare <onboarding@resend.dev>',
      to: body.email,
      subject: 'Reset Your SleepyCare Password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .header p { margin: 8px 0 0 0; opacity: 0.95; }
              .content { background: #f9fafb; padding: 30px 20px; border-radius: 0 0 8px 8px; }
              .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; color: #92400e; }
              .button-container { text-align: center; margin: 30px 0; }
              .button { background: #667eea; color: white; padding: 14px 32px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold; transition: background 0.3s; }
              .button:hover { background: #5568d3; }
              .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 6px; border: 1px solid #e5e7eb; }
              .info-row { display: flex; margin: 10px 0; }
              .info-label { color: #6b7280; font-weight: 500; min-width: 120px; }
              .info-value { color: #1f2937; }
              .code-box { background: #f3f4f6; padding: 15px; border-radius: 6px; font-family: monospace; word-break: break-all; margin: 15px 0; border: 1px solid #d1d5db; }
              .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
              .footer a { color: #667eea; text-decoration: none; }
              .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
                <p>Secure your account</p>
              </div>

              <div class="content">
                <p>Hi ${body.userName || 'there'},</p>

                <p>We received a request to reset your SleepyCare password. If you didn't make this request, you can safely ignore this email.</p>

                <div class="alert">
                  <strong>⏰ Important:</strong> This password reset link will expire in <strong>1 hour</strong> for security reasons. Please reset your password as soon as possible.
                </div>

                <p>To reset your password, click the button below:</p>

                <div class="button-container">
                  <a href="${body.resetLink}" class="button">Reset Password</a>
                </div>

                <p style="text-align: center; color: #6b7280; margin-top: 15px;">
                  Or copy and paste this link in your browser:
                </p>
                <div class="code-box">
                  ${body.resetLink}
                </div>

                <div class="divider"></div>

                <div class="info-box">
                  <h3 style="margin-top: 0; color: #1f2937;">Security Tips:</h3>
                  <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>Never share this link with anyone</li>
                    <li>Use a strong password (at least 6 characters)</li>
                    <li>This link is unique and will only work once</li>
                    <li>If you didn't request this, change your password immediately</li>
                  </ul>
                </div>

                <div class="divider"></div>

                <p style="color: #6b7280; font-size: 14px;">
                  <strong>Having trouble?</strong> If the button above doesn't work, you can also use the token below to manually reset your password:
                </p>
                <div class="code-box" style="font-size: 12px;">
                  Token: ${body.resetToken}
                </div>

                <p style="margin-top: 20px;">
                  If you have any questions or concerns about your account security, please don't hesitate to <a href="mailto:support@sleepycare.com" style="color: #667eea; text-decoration: none;">contact our support team</a>.
                </p>

                <div class="footer">
                  <p>© 2024 SleepyCare. All rights reserved.</p>
                  <p>This is an automated message, please don't reply to this email.</p>
                  <p>
                    <a href="https://sleepycare.com/privacy">Privacy Policy</a> |
                    <a href="https://sleepycare.com/terms">Terms of Service</a> |
                    <a href="https://sleepycare.com/help">Help Center</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (!response) {
      return NextResponse.json(
        { error: 'Failed to send password reset email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset email sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
