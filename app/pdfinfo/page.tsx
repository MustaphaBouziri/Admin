"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";


interface Information {
  name: string;
  lastname: string;
  email: string;
  birth: number;
  birth_place: string;
  category: string;
}

export default function Pdfinfo() {
  const [information, setInformation] = useState<Information | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/pdfinfo?id=${id}`);
        const result = await response.json();

        if (result.success) {
          setInformation(result.data);
        } else {
          console.error("Failed to fetch data:", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!information) {
    return <h1 className="text-center text-2xl font-semibold mt-10">Loading...</h1>;
  }

  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border mt-10">
      
      <div id="pdf" className="p-6 bg-white shadow-lg rounded-lg border">
        <h1 className="text-3xl font-bold text-gray-800 text-center">{information.category}</h1>
        <div className="mt-6 text-lg text-gray-700 space-y-2">
          <p><span className="font-semibold">Name:</span> {information.name}</p>
          <p><span className="font-semibold">Last Name:</span> {information.lastname}</p>
          <p><span className="font-semibold">Email:</span> {information.email}</p>
          <p><span className="font-semibold">Birth Year:</span> {information.birth}</p>
          <p><span className="font-semibold">Birth Place:</span> {information.birth_place}</p>
          <p><span className="font-semibold">Category:</span> {information.category}</p>
        </div>
        {information.category === "Attestation" && (
          <h2 className="mt-6 text-xl font-bold text-center text-blue-600">Attestation Document</h2>
        )}
        {information.category === "Certificate" && (
          <h2 className="mt-6 text-xl font-bold text-center text-green-600">Certificate Document</h2>
        )}
        {information.category === "Quitness" && (
          <h2 className="mt-6 text-xl font-bold text-center text-red-600">Quitness Document</h2>
        )}
      </div>
    </div>
  );
}