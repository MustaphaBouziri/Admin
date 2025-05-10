"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import Attestation from "./atestation";
import Certification from "./certification";
import Quitness from "./quitness";
import Presence from "./presence";

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

export default function Display_info_template() {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") : null;
  

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

  

  return (
    <div>
      {studentInfo?.category==="Attestation" &&(
         <Attestation
         name={studentInfo.name}
         lastname={studentInfo.lastname}
         birth={studentInfo.birth}
         birthplace={studentInfo.birth_place}
         email={studentInfo.email}
         category={studentInfo.category}

         
         />

      )}

{studentInfo?.category === "Certificate" && (
        <Certification
          name={studentInfo.name}
          lastname={studentInfo.lastname}
          birth={studentInfo.birth}
          birthplace={studentInfo.birth_place}
          email={studentInfo.email}
          category={studentInfo.category}
        />
      )}

{studentInfo?.category === "Presence" && (
        <Presence
          name={studentInfo.name}
          lastname={studentInfo.lastname}
          birth={studentInfo.birth}
          birthplace={studentInfo.birth_place}
          email={studentInfo.email}
          category={studentInfo.category}
        />
      )}


{studentInfo?.category === "Quitness" && (
        <Quitness
          name={studentInfo.name}
          lastname={studentInfo.lastname}
          birth={studentInfo.birth}
          birthplace={studentInfo.birth_place}
          email={studentInfo.email}
          category={studentInfo.category}
        />
      )}
    </div>
    
  );
}
