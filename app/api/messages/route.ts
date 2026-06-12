import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
    const date = new Date().toISOString();
    const id = Date.now().toString();
    
    await sql`
      INSERT INTO messages (id, name, email, subject, message, date)
      VALUES (${id}, ${newMessage.name}, ${newMessage.email}, ${newMessage.subject}, ${newMessage.message}, ${date})
    `;
    
    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
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
