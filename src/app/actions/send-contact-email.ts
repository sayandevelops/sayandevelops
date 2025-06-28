'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be less than 50 characters."),
  email: z.string().email("Invalid email address"),
  country: z.string().min(2, "Country must be at least 2 characters.").max(100, "Country must be less than 100 characters."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be less than 500 characters."),
});

const apiKey = process.env.RESEND_API_KEY;
let resend: Resend | null = null;

if (apiKey) {
  resend = new Resend(apiKey);
} else {
  console.error("Resend API key is missing. Make sure RESEND_API_KEY is set in your .env.local file and the server has been restarted.");
}

const recipientEmail = 'sayandevelops@gmail.com';

export async function sendContactEmail(formData: { name: string, email: string, country: string, message: string }) {
  if (!resend) { 
    return { 
      success: false, 
      error: "Email sending is not configured. RESEND_API_KEY is missing. Please check server logs and .env.local file.",
    };
  }

  try {
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: "Invalid form data.", issues: validation.error.issues };
    }

    const { name, email, country, message } = validation.data;

    const { data, error } = await resend.emails.send({
      from: 'SayanDevelops Portfolio <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
      reply_to: email,
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
