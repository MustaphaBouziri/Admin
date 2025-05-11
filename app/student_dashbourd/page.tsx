"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

interface StudentData {
  pdf: string;
  status: string;
  email?: string;
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || !session.user?.email) {
        setLoading(false);
        return;
      }

      setUserEmail(session.user.email);

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

  const handleResetStatus = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch("/api/updatestatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, status: "pending" }),
      });

      const result = await res.json();
      if (result.success) {
        setStudentData(result.data);
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

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

          {studentData.status === "rejected" && (
            <>
              <div className="mb-6 text-red-600 font-medium text-center">
                Your form was rejected. Please submit correct information next time.
              </div>
              <div className="text-center">
                <button
                  onClick={handleResetStatus}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Set Status to Pending
                </button>
              </div>
            </>
          )}

          {studentData.pdf && studentData.status !== "rejected" && (
            <div className="mt-4">
              <embed
                src={studentData.pdf}
                className="w-full h-[1080px] border border-gray-300 rounded-lg shadow-md"
                type="application/pdf"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">No data found.</div>
      )}
    </div>
  );
}
