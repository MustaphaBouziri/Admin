"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

// Define services data
const services = [
  {
    category: "Attestation",
    label: "Attestation",
    description: "Request attestation documents"
  },
  {
    category: "Certificate",
    label: "Certificate",
    description: "Request certificate documents"
  },
  {
    category: "Presence",
    label: "Presence",
    description: "Request presence documents"
  },
  {
    category: "Quitness",
    label: "Quitness",
    description: "Request quitness documents"
  }
];

// Carousel images
const carouselImages = [
  { src: "/images/adminpic.png", alt: "Admin" },
  { src: "/images/studnetpic.png", alt: "Student" },
  { src: "/images/newmember.jpg", alt: "New Member" }
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Full-screen Carousel Background */}
      <div className="fixed inset-0 -z-10">
        <div className="relative h-full w-full">
          {carouselImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative min-h-screen bg-black bg-opacity-30 flex flex-col items-center justify-center px-6 py-10">
        

        {/* Welcome Section with Register/Login  */}
        <div className="w-full max-w-2xl text-center mb-10">
          <h1 className="text-4xl font-bold mb-6 text-white">Welcome</h1>
          <div className="flex gap-4 justify-center">
            <Link href="/loginregister">
              <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl shadow-md hover:bg-emerald-700 transition transform hover:scale-105 duration-200">
                Are you new? Register
              </button>
            </Link>
            <Link href="/loginregister">
              <button className="px-6 py-3 bg-sky-600 text-white font-medium rounded-xl shadow-md hover:bg-sky-700 transition transform hover:scale-105 duration-200">
                Already a member? Login
              </button>
            </Link>
          </div>
        </div>

       
       
      </div>
    </div>
  );
}