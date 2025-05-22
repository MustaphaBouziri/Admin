"use client";

import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { getSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

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

interface UserData {
  name: string;
  email: string;
}

export default function DirectorDashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || !session.user?.email) {
        setLoading(false);
        return;
      }

      setUserData({
        name: session.user.name || '',
        email: session.user.email
      });
      setLoading(false);
    };

    fetchData();
  }, []);

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

  useEffect(() => {
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
    fetchData();
  }, []);

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

  const categories = Array.from(new Set(studentData.map((s) => s.category)));
  const displayedStudents =
    selectedCategory === "All"
      ? filteredStudents
      : filteredStudents.filter((s) => s.category === selectedCategory);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading director details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c4defd] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome <span className="underline italic">{userData?.name || 'Director'}</span> to your Director Dashboard
          </h1>
        </div>

        {/* Director Dashboard Content */}
        <div className="border border-[#F0F0F0] rounded-lg bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Director Controls</h2>
          {/* Add your director-specific content here */}
        </div>

    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-indigo-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Directory</h1>
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-2xl">
        <select
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name or email"
          className="flex-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
          value={searchQuery}
          onChange={(e) => search(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {displayedStudents.map((s) => (
          <div
            key={s._id}
            onClick={() => router.push(`../modir/display_info_template?id=${s._id}&email=${s.email}`)}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800">{s.name} {s.lastname}</h2>
            <p className="text-gray-600 text-sm">{s.email}</p>
            <span className="mt-2 inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              {s.category}
            </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
