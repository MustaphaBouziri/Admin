"use client";

import { useState } from "react";

export default function Register() {
  const [studentData, setStudentData] = useState({
    name: "",
    lastname: "",
    tel: "",
    email: "",
    //pdf: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  /*const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > 10048576) {  // 1MB limit
        alert("File size exceeds 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setStudentData((prev) => ({
          ...prev,
          pdf: base64, // Updating state with base64 PDF data
        }));
      };
      reader.readAsDataURL(file);
    }
  };*/
  

  const addStudent = async () => {
    try {
      const response = await fetch("api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });
      const result = await response.json();
      if (result.success) {
        alert("Information is sent successfully");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold text-gray-800">Upload your files</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          className="w-full p-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          type="text"
          name="name"
          value={studentData.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Lastname</label>
        <input
          className="w-full p-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          type="text"
          name="lastname"
          value={studentData.lastname}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          className="w-full p-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          type="tel"
          name="tel"
          value={studentData.tel}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          className="w-full p-2 border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          type="email"
          name="email"
          value={studentData.email}
          onChange={handleInputChange}
        />
      </div>

      

      <button
        className="w-full p-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
        onClick={addStudent}
      >
        Submit
      </button>
    </div>
  );
}
