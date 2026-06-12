import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'messages.json');

const readMessages = () => {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
};

const writeMessages = (messages: any[]) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), 'utf8');
};

export async function GET() {
  try {
    const messages = readMessages();
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMessage = await request.json();
    newMessage.date = new Date().toISOString();
    newMessage.id = Date.now().toString();
    
    const messages = readMessages();
    messages.unshift(newMessage);
    writeMessages(messages);
    
    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    let messages = readMessages();
    messages = messages.filter((m: any) => m.id !== id);
    writeMessages(messages);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
