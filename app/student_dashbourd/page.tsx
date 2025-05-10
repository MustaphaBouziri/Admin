"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

interface StudentData {
  pdf: string;
}

export default function StudentDashbourd() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || !session.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/test?email=${session.user.email}`);
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setStudentData(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading student details...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {studentData ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Student Dashboard</h2>
          </div>
          <div className="mt-4">
            <embed
              src={studentData.pdf}
              className="w-full h-[1080px] border border-gray-300 rounded-lg shadow-md"
              type="application/pdf"
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">No data found.</div>
      )}
    </div>
  );
}
