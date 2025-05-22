import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongoose';
import { Student } from '@/models/student';

export async function POST(request: Request) {
  try {
    const { studentId, status } = await request.json();

    if (!studentId || !status) {
      return NextResponse.json(
        { success: false, error: 'Student ID and status are required' },
        { status: 400 }
      );
    }

    await connectMongo();
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { status },
      { new: true }
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    console.error('Error updating student status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update student status' },
      { status: 500 }
    );
  }
} 