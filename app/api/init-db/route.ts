import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSCODE}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        date TIMESTAMP NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        tech_stack JSONB NOT NULL,
        tags JSONB NOT NULL,
        github_link VARCHAR(255),
        preview_link VARCHAR(255)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS about (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        philosophy TEXT NOT NULL,
        skills JSONB NOT NULL,
        resume_link VARCHAR(255)
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        views INTEGER NOT NULL DEFAULT 0
      );
    `;

    // Initialize analytics if empty
    const analyticsResult = await sql`SELECT count(*) FROM analytics`;
    if (parseInt(analyticsResult.rows[0].count) === 0) {
      await sql`INSERT INTO analytics (views) VALUES (0)`;
    }

    return NextResponse.json({ success: true, message: 'Database tables created and initialized.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
