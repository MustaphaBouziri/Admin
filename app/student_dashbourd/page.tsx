"use client";

import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";

interface StudentData {
  pdf: string;
}

export default function StudentDashbourd() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const result = await response.json();
        if (result.success && result.data.length > 0) {
             //the reason why i need to do [0] is because without it it will return an array of object [{}] and if i wish to do studentdata.pdf with out it it wont work bcz its acpecting an object not an array of object 
          //rresult.data i usaly works when u do map in my case om 
          setStudentData(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

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
        <div className="text-center text-lg text-gray-600">Loading student details...</div>
      )}
    </div>
  );
}
