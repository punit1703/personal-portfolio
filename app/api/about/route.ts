import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const isAuthenticated = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_PASSCODE}`;
};

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM about LIMIT 1`;
    if (rows.length === 0) {
      return NextResponse.json({});
    }
    const aboutData = rows[0];
    return NextResponse.json({
      title: aboutData.title,
      bio: aboutData.bio,
      philosophy: aboutData.philosophy,
      skills: aboutData.skills,
      resumeLink: aboutData.resume_link
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read about data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await request.json();
    
    // Check if about exists
    const { rows } = await sql`SELECT id FROM about LIMIT 1`;
    
    if (rows.length === 0) {
      await sql`
        INSERT INTO about (title, bio, philosophy, skills, resume_link)
        VALUES (
          ${data.title || ''}, 
          ${data.bio || ''}, 
          ${data.philosophy || ''}, 
          ${JSON.stringify(data.skills || [])}, 
          ${data.resumeLink || ''}
        )
      `;
    } else {
      await sql`
        UPDATE about 
        SET 
          title = ${data.title || ''},
          bio = ${data.bio || ''},
          philosophy = ${data.philosophy || ''},
          skills = ${JSON.stringify(data.skills || [])},
          resume_link = ${data.resumeLink || ''}
      `;
    }
    
    return NextResponse.json({ success: true, message: 'About data updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
