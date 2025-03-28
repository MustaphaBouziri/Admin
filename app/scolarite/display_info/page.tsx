"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface StudentInfo {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  birth: number;
  birth_place: string;
  category: string;
  pdf: string;
}

export default function Display_info() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detailed_info?id=${id}`);
        const result = await response.json();
        if (result.success) {
          setStudentInfo(result.data);
        } else {
          console.log("Failed to fetch student", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Student Details</h1>
      {studentInfo ? (
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg font-medium text-gray-700">Name:</p>
            <p className="text-lg text-gray-900">{studentInfo.name}</p>
            <p className="text-lg font-medium text-gray-700">Last Name:</p>
            <p className="text-lg text-gray-900">{studentInfo.lastname}</p>
            <p className="text-lg font-medium text-gray-700">Email:</p>
            <p className="text-lg text-gray-900">{studentInfo.email}</p>
            <p className="text-lg font-medium text-gray-700">Birth Year:</p>
            <p className="text-lg text-gray-900">{studentInfo.birth}</p>
            <p className="text-lg font-medium text-gray-700">Birth Place:</p>
            <p className="text-lg text-gray-900">{studentInfo.birth_place}</p>
          </div>
          <div className="mt-6 text-center">
            <a
              href={studentInfo.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              Open PDF
            </a>
          </div>
          <div className="mt-4">
            <embed
              src={studentInfo.pdf}
              className="w-full h-96 border rounded-lg"
              type="application/pdf"
            />
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading student details...</p>
      )}
    </div>
  );
}