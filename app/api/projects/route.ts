import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'projects.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const projects = JSON.parse(fileContents);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json({ error: 'Failed to read projects data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    
    // Read existing
    let projects = [];
    try {
      const fileContents = fs.readFileSync(dataFilePath, 'utf8');
      projects = JSON.parse(fileContents);
    } catch (e) {
      // file might not exist, proceed with empty array
    }

    // Append
    projects.unshift(newProject); // add to top

    // Write back
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2), 'utf8');

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}
