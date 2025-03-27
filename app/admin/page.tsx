"use client";

import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { useRouter } from "next/navigation";

interface StudentData {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  birth: number;
  birth_place: string;
  category: string;
  pdf: string;
}

export default function Admin() {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch all students initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dattas");
        const result = await response.json();
        if (result.success) {
          setStudentData(result.data);
          setFilteredStudents(result.data); // Initially show all students
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // Search function
  const search = async (value: string) => {
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredStudents(studentData); // Reset to full list if empty
      return;
    }

    try {
      const response = await fetch(`/api/searching?value=${value}`);
      const result = await response.json();

      if (result.success) {
        setFilteredStudents(result.data); // Update only filteredStudents
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Delete student function
  const deletedata = async (id: string, email: string) => {
    try {
      const response = await fetch(`/api/dattas?id=${id}`, { method: "DELETE" });
      const result = await response.json();

      if (result.success) {
        const studentResponse = await fetch("/api/updatestatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, status: "rejected" }),
        });

        const studentResult = await studentResponse.json();
        if (studentResult.success) {
          setStudentData((prev) => prev.filter((student) => student._id !== id));
          setFilteredStudents((prev) => prev.filter((student) => student._id !== id));
        } else {
          console.error("Failed to update student status:", studentResult.error);
        }
      } else {
        console.error("Failed to delete student:", result.error);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Get unique categories for the dropdown
  const categories = Array.from(new Set(studentData.map((s) => s.category)));

  // Filter students by category
  const displayedStudents =
    selectedCategory === "All"
      ? filteredStudents
      : filteredStudents.filter((s) => s.category === selectedCategory);

  return (
    <div className="p-6 mt-10">
      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-bold text-gray-800">Filter by Category:</label>
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, lastname, or email"
        className="w-80 h-11 p-2 border border-gray-300 rounded mb-4"
        value={searchQuery}
        onChange={(e) => search(e.target.value)}
      />

      {/* Student Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedStudents.map((s) => (
          <div
            key={s._id}
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-300 hover:shadow-2xl transition transform hover:-translate-y-1 relative"
          >
            <button
              onClick={() => deletedata(s._id, s.email)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <i className="fa fa-times"></i>
            </button>

            <h2 className="text-2xl font-bold text-gray-900">
              {s.name} {s.lastname}
            </h2>
            <p className="text-gray-700 mt-2">
              Email: <span className="font-medium text-gray-800">{s.email}</span>
            </p>
            <p className="text-gray-700">
              Birth Year: <span className="font-medium text-gray-800">{s.birth}</span>
            </p>
            <p className="text-gray-700">
              Birth Place: <span className="font-medium text-gray-800">{s.birth_place}</span>
            </p>
            <span className="mt-4 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-md">
              {s.category}
            </span>

            {/* Open PDF link */}
            <button
              onClick={() => {
                if (s.pdf) {
                  const pdfDataUrl = s.pdf;
                  window.open(pdfDataUrl, "_blank");
                } else {
                  console.error("PDF URL is invalid");
                }
              }}
              className="mt-4 inline-block bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-md"
            >
              View PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
