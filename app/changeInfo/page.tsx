"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function ChangeInfo() {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    tel: "",
    email: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user) {
        setUserData({
          name: session.user.name || "",
          lastname: session.user.lastname || "",
          tel: session.user.tel || "",
          email: session.user.email || "",
        });
      }
    }

    fetchSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/changeUserInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Information updated successfully");
        setEditing(false);
      } else {
        alert(result.error || "Update failed");
      }
    } catch (err) {
      console.error("Error updating info", err);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Information</h2>

        {["name", "lastname", "tel", "email"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={(userData as any)[field]}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${
                editing ? "focus:outline-none focus:ring-2 focus:ring-blue-500" : "bg-gray-200"
              }`}
            />
          </div>
        ))}

        <button
          onClick={editing ? handleSave : () => setEditing(true)}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
