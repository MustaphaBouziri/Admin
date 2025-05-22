"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Form() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "";

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    tel: "",
    birth: "",
    birth_place: "",
    category: category,
    pdf: "",
  });

  useEffect(() => {
    const fillUserData = async () => {
      const session = await getSession();
      if (session && session.user) {
        setFormData((prev) => ({
          ...prev,
          name: session.user.name|| "",
          lastname: session.user.lastname || "",
          email: session.user.email || "",
          tel: (session.user as any).tel || "", // fallback if tel is in user object
          category,
        }));
      }
    };

    fillUserData();
  }, [category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          setFormData((prev) => ({ ...prev, pdf: base64String }));
        }
      };
    }
  };

  const addForm = async () => {
    try {
      const response = await fetch("api/validateStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        alert("The form is sent successfully, we will inform you later");
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      
    <h1>form page</h1>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      
      <form className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">User Information</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            readOnly
            className="w-full p-2 border rounded-lg bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="tel"
            value={formData.tel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year of Birth</label>
          <input
            type="number"
            name="birth"
            value={formData.birth}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Place of Birth</label>
          <input
            type="text"
            name="birth_place"
            value={formData.birth_place}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Upload PDF</label>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <button
          type="button"
          onClick={addForm}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submitfffffffffffff
        </button>
      </form>
    </div>
    </div>
  );
}
