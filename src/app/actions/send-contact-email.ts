
'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

// IMPORTANT: You need to set up environment variables for this to work.
// Create a .env.local file in your project root and add:
// RESEND_API_KEY=your_resend_api_key
//
// You will also need to verify a domain with Resend to send emails.
// Update the `from` address below to use your verified domain.
// For example: 'Portfolio Contact <noreply@yourverifieddomain.com>'

const resend = new Resend(process.env.RESEND_API_KEY);
const recipientEmail = 'sayandevelops@gmail.com'; 
// This is where the notification email will be sent.

export async function sendContactEmail(formData: { name: string, email: string, message: string }) {
  try {
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: "Invalid form data.", issues: validation.error.issues };
    }

    const { name, email, message } = validation.data;

    const { data, error } = await resend.emails.send({
      from: 'SayanDevelops Portfolio <onboarding@resend.dev>', // IMPORTANT: Replace with your verified Resend domain email
      to: [recipientEmail],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
      reply_to: email, // Allows you to reply directly to the sender from your email client
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: error.message || "Failed to send email." };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
