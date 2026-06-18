import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We will use standard Nodemailer with Gmail SMTP.
    // Ensure you have EMAIL_USER and EMAIL_PASS set in your .env.local
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-gmail@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    });

    let subject = '';
    let text = '';
    let html = '';

    if (body.type === 'submission') {
      subject = `Report Received - ${body.reference}`;
      text = `Dear ${body.name},\n\nYour report regarding "${body.report_type}" has been successfully submitted. You can track it using the reference: ${body.reference}.\n\nThank you for helping protect Ghana's infrastructure.`;
      html = `
        <div style="font-family: Arial, sans-serif; max-w-xl; margin: 0 auto;">
          <h2 style="color: #0f172a;">Report Successfully Submitted</h2>
          <p>Dear <strong>${body.name}</strong>,</p>
          <p>Your report regarding "<strong>${body.report_type}</strong>" has been successfully submitted.</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase;">Tracking Reference</p>
            <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #0284c7;">${body.reference}</p>
          </div>
          <p>You can use this reference number on our tracking portal to monitor updates on your issue.</p>
          <br/>
          <p>Thank you for helping protect Ghana's infrastructure.</p>
          <p style="color: #64748b; font-size: 14px;">- NECT Team</p>
        </div>
      `;
    } else if (body.type === 'status_update') {
      subject = `Status Update - ${body.reference}`;
      text = `Dear ${body.name},\n\nThe status of your report (${body.reference}) has been updated to: ${body.status}.\n\nVisit the tracking portal to see any official notes or action taken.`;
      html = `
        <div style="font-family: Arial, sans-serif; max-w-xl; margin: 0 auto;">
          <h2 style="color: #0f172a;">Report Status Update</h2>
          <p>Dear <strong>${body.name}</strong>,</p>
          <p>The status of your report (<strong>${body.reference}</strong>) has been updated.</p>
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase;">New Status</p>
            <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: bold; color: #059669;">${body.status}</p>
          </div>
          <p>Visit the tracking portal to see any official notes or action taken by our officers.</p>
          <br/>
          <p>Thank you for your cooperation.</p>
          <p style="color: #64748b; font-size: 14px;">- NECT Team</p>
        </div>
      `;
    }

    // Try to send the email (will fail gracefully if credentials aren't set)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: `"NECT Support" <${process.env.EMAIL_USER}>`,
          to: body.email,
          subject: subject,
          text: text,
          html: html,
        });
        console.log(`Live Email sent to ${body.email}`);
      } else {
        console.log("Mock Email (Configure EMAIL_USER in .env.local to send live emails):", { subject, to: body.email });
      }
    } catch (mailError) {
      console.error("Nodemailer failed:", mailError);
    }

    return NextResponse.json({ success: true, message: "Email processed successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to process email" }, { status: 500 });
  }
}