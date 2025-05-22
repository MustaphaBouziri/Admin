import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Student } from '@/models/student';

export async function GET() {
  try {
    await connectMongo();
    const students = await Student.find({});
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch students' }, { status: 500 });
  }
} 