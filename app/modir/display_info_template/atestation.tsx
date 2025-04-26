"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

interface StudentInfo {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    birth: number;
    birth_place: string;
    category: string;
    pdf: string;
  }

export default function Attestation(prop) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;
  const email = searchParams ? searchParams.get("email") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/detailed_info?id=${id}`);
        const result = await response.json();
        if (result.success) {
          setStudentInfo(result.data);
        } else {
          console.log("Failed to fetch student", result.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (id) fetchData();
  }, [id]);

  const generatePdfAndUpdate = async () => {
    if (!studentInfo) return;
  
    // select the element
    const element = document.getElementById("pdf-content");
    if (!element) return;
  
    try {
      // generate pdf as blob
      const pdfBlob = await html2pdf().from(element).outputPdf("blob");
  
      // making blod to base64
      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);
      reader.onloadend = async function () {
        const base64String = reader.result?.toString().split(",")[1];
  
        if (base64String) {
          // now the base64String is in the format "data:application/pdf;base6JVBERi0xLjQKJfbk/N8KMSAwIG9i..."
          const base64Url = `data:application/pdf;base64,${base64String}`;
  
          // posting
          const response = await fetch(`/api/postpdf?email=${email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pdf: base64Url }), 
          });
  
          const result = await response.json();
          if (result.success) {
            alert("PDF sent to the student successfully!");
          } else {
            console.log("Failed to update student PDF", result.error);
          }
        }
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-12">
      <div id="pdf-content" className="w-full max-w-3xl border border-gray-800 p-10 shadow-lg bg-white text-black">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">République Tunisienne</h1>
          <h2 className="text-xl">Ministère de l'Enseignement Supérieur et de la Recherche Scientifique</h2>
          <h3 className="text-lg font-semibold mt-4">Institut Supérieur des Etudes Technologiques de Rades</h3>
          <hr className="my-4 border-gray-700" />
          <h2 className="text-2xl font-bold mt-6 underline">Attestation d'Inscription</h2>
        </header>

        {studentInfo ? (
          <div className="text-lg leading-relaxed mt-6">
            <p>Nous attestons que :</p>
            <p className="mt-4 font-semibold">{prop.name} {prop.lastname}</p>
            <p>Né(e) en {prop.birth} à {prop.birthplace},</p>
            <p>Adresse e-mail : {prop.email}</p>
            <p>Catégorie : {prop.category}</p>
            <p className="mt-4">Est inscrit(e) à l'Institut Supérieur des Etudes Technologiques de Rades pour l'année universitaire en cours.</p>
            <p className="mt-6">Fait à Radès, le {new Date().toLocaleDateString()}</p>
            <div className="mt-12 text-right">
              <p className="font-semibold">Le Directeur</p>
              <img src="/images/sig2.avif" alt="Signature" className="mt-2 w-32 h-auto inline-block" />
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center">Chargement des détails de l'étudiant...</p>
        )}
      </div>
      <div className="pt-8">
        <button onClick={generatePdfAndUpdate} className="w-36 h-8 bg-green-600 rounded-lg text-white hover:bg-green-900">
          Send
        </button>
      </div>
    </div>
  );
}
