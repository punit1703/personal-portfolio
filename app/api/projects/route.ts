import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const isAuthenticated = (request: Request) => {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_PASSCODE}`;
};

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM projects ORDER BY id DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const project = await request.json();
    
    await sql`
      INSERT INTO projects (title, description, tech_stack, tags, github_link, preview_link)
      VALUES (
        ${project.title}, 
        ${project.description}, 
        ${JSON.stringify(project.techStack || [])}, 
        ${JSON.stringify(project.tags || [])}, 
        ${project.githubLink || ''}, 
        ${project.previewLink || ''}
      )
    `;
    
    return NextResponse.json({ success: true, message: 'Project saved successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const project = await request.json();
    
    await sql`
      UPDATE projects 
      SET 
        description = ${project.description}, 
        tech_stack = ${JSON.stringify(project.techStack || [])}, 
        tags = ${JSON.stringify(project.tags || [])}, 
        github_link = ${project.githubLink || ''}, 
        preview_link = ${project.previewLink || ''}
      WHERE title = ${project.title}
    `;
    
    return NextResponse.json({ success: true, message: 'Project updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    await sql`DELETE FROM projects WHERE title = ${title}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
