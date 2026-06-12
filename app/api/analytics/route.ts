import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'analytics.json');

const readAnalytics = () => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return { views: 0 };
  }
};

const writeAnalytics = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

export async function GET() {
  try {
    const analytics = readAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read analytics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const analytics = readAnalytics();
    analytics.views = (analytics.views || 0) + 1;
    writeAnalytics(analytics);
    
    return NextResponse.json({ success: true, views: analytics.views });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update analytics' }, { status: 500 });
  }
}
