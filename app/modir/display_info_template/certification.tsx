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

export default function Certification(prop) {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
    <div id="pdf-content" className="w-full max-w-3xl border-2 border-gray-700 bg-white shadow-xl text-black">
      <div className="p-10">
        {/* Institution Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">République Tunisienne</h1>
          <h2 className="text-xl font-semibold text-gray-700">
            Ministère de l'Enseignement Supérieur et de la Recherche Scientifique
          </h2>
          <h3 className="text-lg font-medium mt-4 text-gray-800">
            Institut Supérieur des Etudes Technologiques de Rades
          </h3>
          <div className="my-6 border-t-2 border-gray-700 w-3/4 mx-auto" />
          <h2 className="text-2xl font-bold uppercase tracking-wide text-gray-900">
            Certificat de Scolarité
          </h2>
        </header>

        {studentInfo ? (
          <div className="space-y-6 text-lg">
            {/* Student Information Section */}
            <div className="mb-8">
              <p className="mb-6 font-medium">Nous certifions que :</p>
              
              <div className="space-y-4 pl-6 border-l-2 border-gray-300">
                <p>
                  <span className="font-semibold">Nom complet :</span>{' '}
                  {prop.name} {studentInfo.lastname}
                </p>
                <p>
                  <span className="font-semibold">Né(e) le :</span>{' '}
                  {prop.birth} à {prop.birthplace}
                </p>
                <p>
                  <span className="font-semibold">Catégorie :</span>{' '}
                  {prop.category}
                </p>
                <p>
                  <span className="font-semibold">Contact :</span>{' '}
                  {prop.email}
                </p>
              </div>
            </div>

            {/* Registration Statement */}
            <div className="mt-8 border-t-2 pt-6 border-gray-300">
              <p className="mb-4 text-justify">
                Est dûment inscrit(e) à l'Institut Supérieur des Etudes Technologiques 
                de Rades pour l'année universitaire en cours, conformément aux 
                règlements en vigueur de l'établissement.
              </p>
              
              {/* Signature & Date */}
              <div className="mt-10 flex justify-between items-end">
                <div className="text-gray-700">
                  <p className="font-medium">Fait à Radès,</p>
                  <p>le {new Date().toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold mb-2">Le Directeur</p>
                  <div className="h-1 bg-gray-700 w-32 mb-1 mx-auto" />
                  <p className="text-sm text-gray-600">Signature et cachet</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-600 text-center py-8">
            Chargement des informations étudiantes...
          </p>
        )}
      </div>
    </div>

    {/* Generate PDF Button */}
    <div className="mt-12">
      <button 
        onClick={generatePdfAndUpdate}
        className="px-10 py-3 bg-gray-800 text-white rounded-md font-semibold
                   hover:bg-gray-900 transition-colors shadow-md"
      >
        Générer le PDF
      </button>
    </div>
  </div>
  );
}
