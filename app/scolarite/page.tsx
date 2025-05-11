"use client";

import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { redirect, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

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
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
      } else if (session.user?.role !== "admin") {
        redirect("/");
      } else {
        fetchData();
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/dattas");
      const result = await response.json();
      if (result.success) {
        setStudentData(result.data);
        setFilteredStudents(result.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const search = async (value: string) => {
    setSearchQuery(value);

    if (value.trim() === "") {
      setFilteredStudents(studentData);
      return;
    }

    try {
      const response = await fetch(`/api/searching?value=${value}`);
      const result = await response.json();

      if (result.success) {
        setFilteredStudents(result.data);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const deletedata = async (id: string, email: string) => {
    try {
      const response = await fetch(`/api/dattas?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        const studentResponse = await fetch("/api/updatestatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, status: "rejected" }),
        });

        const studentResult = await studentResponse.json();
        if (studentResult.success) {
          setStudentData((prev) => prev.filter((s) => s._id !== id));
          setFilteredStudents((prev) => prev.filter((s) => s._id !== id));
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

  const categories = Array.from(new Set(studentData.map((s) => s.category)));

  const displayedStudents =
    selectedCategory === "All"
      ? filteredStudents
      : filteredStudents.filter((s) => s.category === selectedCategory);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="p-6 mt-10">
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

      <input
        type="text"
        placeholder="Search by name, lastname, or email"
        className="w-80 h-11 p-2 border border-gray-300 rounded mb-4"
        value={searchQuery}
        onChange={(e) => search(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedStudents.map((s) => (
          <div
            key={s._id}
            onClick={() => router.push(`../scolarite/display_info?id=${s._id}`)}
            className="bg-white shadow-xl rounded-2xl p-6 border border-gray-300 hover:shadow-2xl transition transform hover:-translate-y-1 relative cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering card click
                deletedata(s._id, s.email);
              }}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              <i className="fa fa-times"></i>
            </button>

            <h2 className="text-2xl font-bold text-gray-900">
              {s.name} {s.lastname}
            </h2>

            <span className="mt-4 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-md">
              {s.category}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (s.pdf) {
                  window.open(s.pdf, "_blank");
                } else {
                  console.error("PDF URL is invalid");
                }
              }}
              className="mt-4 block bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow-md"
            >
              View PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
