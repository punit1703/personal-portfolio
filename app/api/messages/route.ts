import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Resend } from 'resend';

// Conditionally instantiate Resend so the build doesn't crash if the env var is missing
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const isAuthenticated = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_PASSCODE}`;
};

export async function GET(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { rows } = await sql`SELECT * FROM messages ORDER BY date DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMessage = await request.json();

    // 1. Lightweight Honeypot Spam Protection
    if (newMessage.website) {
      // If honeypot is filled, it's a bot. Silently accept to deter bot retries.
      return NextResponse.json({ success: true, message: 'Message saved successfully' });
    }

    // 2. Validate Fields
    if (!newMessage.name || !newMessage.email || !newMessage.subject || !newMessage.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // 3. Sanitize
    const name = String(newMessage.name).trim();
    const email = String(newMessage.email).trim();
    const subject = String(newMessage.subject).trim();
    const message = String(newMessage.message).trim();

    const date = new Date().toISOString();
    const id = Date.now().toString();
    
    // 4. Save to PostgreSQL
    await sql`
      INSERT INTO messages (id, name, email, subject, message, date)
      VALUES (${id}, ${name}, ${email}, ${subject}, ${message}, ${date})
    `;
    
    // 5. Send Transactional Email
    if (resend && process.env.CONTACT_EMAIL) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Default Resend testing domain
          to: process.env.CONTACT_EMAIL,
          replyTo: email,
          subject: `New Portfolio Inquiry — ${subject}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #333; border-bottom: 2px solid #eaeaea; padding-bottom: 10px;">New Message from Portfolio</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="white-space: pre-wrap; margin: 0; color: #555;">${message}</p>
              </div>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">Submitted on: ${new Date(date).toLocaleString()}</p>
            </div>
          `,
        });
      } catch (emailError) {
        // Log silently on server. We still return success to the client because DB saved successfully.
        console.error('Failed to send email notification via Resend:', emailError);
      }
    } else {
      console.warn('Skipping email: RESEND_API_KEY or CONTACT_EMAIL is missing in environment variables.');
    }

    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Failed to save message:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await sql`DELETE FROM messages WHERE id = ${id}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
