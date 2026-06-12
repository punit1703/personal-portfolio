import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'about.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const aboutData = JSON.parse(fileContents);
    return NextResponse.json(aboutData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read about data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedAbout = await request.json();
    fs.writeFileSync(dataFilePath, JSON.stringify(updatedAbout, null, 2), 'utf8');
    return NextResponse.json({ success: true, about: updatedAbout });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about data' }, { status: 500 });
  }
}
