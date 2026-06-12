import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const { rows } = await sql`SELECT views FROM analytics LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({ views: 0 });
    }
    return NextResponse.json({ views: rows[0].views });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read analytics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'view') {
      const { rows } = await sql`SELECT id FROM analytics LIMIT 1`;
      if (rows.length === 0) {
        await sql`INSERT INTO analytics (views) VALUES (1)`;
      } else {
        await sql`UPDATE analytics SET views = views + 1`;
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
  }
}
