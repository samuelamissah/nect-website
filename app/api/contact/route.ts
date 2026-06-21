import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, reference } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
      },
    });

    // Email content for admin
    const emailSubject = `NECT Contact Form: ${subject}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px;">NECT Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Reference:</strong> <span style="font-family: monospace; font-weight: bold; color: #1e3a5f;">${reference || 'N/A'}</span></p>
        </div>
        
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <p style="font-weight: bold; margin-bottom: 8px;">Message:</p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
          <p>This message was sent from the NECT Contact Form.</p>
          <p>© ${new Date().getFullYear()} National Engineering Coordinating Team</p>
        </div>
      </div>
    `;

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"NECT Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || 'info@nect.gov.gh',
        replyTo: email,
        subject: emailSubject,
        html: emailHtml,
      });

      // Send auto-reply to the user with reference number
      await transporter.sendMail({
        from: `"NECT Team" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "We've Received Your Message",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e3a5f;">Thank You for Contacting NECT</h2>
            
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>We have received your message regarding "<strong>${subject}</strong>" and will get back to you within 48 hours.</p>
            
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e3a5f;">
              <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: bold;">Your Reference Number</p>
              <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #1e3a5f; font-family: monospace;">${reference || 'N/A'}</p>
            </div>
            
            <p><strong>Please keep this reference number for any future follow-ups.</strong></p>
            <p>You can track your report status at: <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/track" style="color: #1e3a5f; font-weight: bold;">Track Your Report</a></p>
            
            <br/>
            <p>Best regards,</p>
            <p style="font-weight: bold; color: #1e3a5f;">NECT Team</p>
            <p style="font-size: 12px; color: #64748b;">National Engineering Coordinating Team</p>
            <p style="font-size: 12px; color: #64748b;">Ministry of Roads and Highways, Accra, Ghana</p>
          </div>
        `,
      });

      console.log(`Email sent to ${email} and ${process.env.EMAIL_TO}`);
      
      return NextResponse.json({ 
        success: true, 
        message: "Email sent successfully" 
      });
      
    } catch (mailError) {
      console.error("Nodemailer error:", mailError);
      // Still return success since the report was saved to the database
      return NextResponse.json({ 
        success: true, 
        message: "Report saved but email notification failed" 
      });
    }
    
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}