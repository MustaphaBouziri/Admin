"use client";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import ApprovedDocumentModal from '../components/ApprovedDocumentModal';
import { useRouter } from 'next/navigation';

interface StudentData {
  pdf: string;
  status: string;
  email?: string;
  name?: string;
  category: string;
}

interface UserData {
  name: string;
  email: string;
}

const documentTypes = [
  {
    title: "Attestation",
    color: "bg-[#FFF4DE]",
    description: "Request attestation documents",
    category: "Attestation"
  },
  {
    title: "Certificate",
    color: "bg-[#F3E8FF]",
    description: "Request certificate documents",
    category: "Certificate"
  },
  {
    title: "Presence",
    color: "bg-[#DCFCE7]",
    description: "Request presence documents",
    category: "Presence"
  },
  {
    title: "Quittance",
    color: "bg-[#FFE2E5]",
    description: "Request quittance documents",
    category: "Quitness"
  }
];

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session || !session.user?.email) {
        setLoading(false);
        return;
      }

      setUserEmail(session.user.email);
      setUserData({
        name: session.user.name || '',
        email: session.user.email
      });

      try {
        const response = await fetch(`/api/test?email=${session.user.email}`);
        const result = await response.json();
        if (result.success && result.data.length > 0) {
          setStudentData(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResetStatus = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch("/api/updatestatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, status: "pending" }),
      });

      const result = await res.json();
      if (result.success) {
        setStudentData(result.data);
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDocumentClick = (category: string) => {
    router.push(`/form?category=${category}`);
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading student details...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c4defd] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome <span className="text-blue-600 underline italic">{userData?.name || 'Student'}</span> to your Student Dashboard
          </h1>
        </div>

        {/* Approved Documents Section */}
        <div className="mb-8 bg-gradient-to-r from-[#043873] to-[#021730] border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-4">View Your Approved Documents</h2>
          {studentData?.pdf && studentData.status !== "rejected" ? (
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex items-center space-x-6">
                  <h3 className="text-lg font-medium text-white">Approved Document</h3>
                  <p className="text-sm text-blue-200">Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-6 py-2.5 rounded-xl text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-white/10"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Document
              </button>
            </div>
          ) : (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
              <svg className="mx-auto h-12 w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">No approved documents</h3>
              <p className="mt-1 text-sm text-blue-200">You have no approved documents yet, please check later.</p>
            </div>
          )}
        </div>

        {/* Request Documents Section */}
        <div className="bg-gradient-to-r from-[#043873] to-[#021730] border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6">Request Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentTypes.map((doc) => (
              <div
                key={doc.title}
                onClick={() => handleDocumentClick(doc.category)}
                className={`${doc.color} p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:scale-105 border border-white/10 backdrop-blur-sm`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ApprovedDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={studentData?.pdf}
      />
    </div>
  );
}
