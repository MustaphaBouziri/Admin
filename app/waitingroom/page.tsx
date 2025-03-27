"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

export default function Waitingroom() {
  const searchParams = useSearchParams();
  const pdfUrl = searchParams.get("pdfUrl");

  console.log("PDF URL:", pdfUrl); // Debugging: Check the URL

  const handlePrint = () => {
    window.print();
  };

  if (!pdfUrl) {
    return <div>No PDF URL provided.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border mt-10">
      <iframe
        src={pdfUrl}
        title="PDF Document"
        type="application/pdf"
        className="w-full h-screen"
      />
      <button
        onClick={handlePrint}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        Print PDF
      </button>
    </div>
  );
}