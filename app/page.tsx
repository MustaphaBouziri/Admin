import Link from "next/link";
import Image from "next/image";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex flex-col items-center justify-center px-6 py-10">
      {/* Top Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link href="/register">
          <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl shadow-md hover:bg-emerald-700 hover:scale-105 transition transform duration-200">
            Register
          </button>
        </Link>

        <Link href="/auth/signin">
          <button className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl shadow-md hover:bg-emerald-700 hover:scale-105 transition transform duration-200">
            Sign In
          </button>
        </Link>

        <Link href="/modir">
          <button className="px-6 py-3 bg-sky-600 text-white font-medium rounded-xl shadow-md hover:bg-sky-700 hover:scale-105 transition transform duration-200">
            Director
          </button>
        </Link>
        <Link href="/scolarite">
          <button className="px-6 py-3 bg-rose-600 text-white font-medium rounded-xl shadow-md hover:bg-rose-700 hover:scale-105 transition transform duration-200">
            Scolarite
          </button>
        </Link>
      </div>

      {/* Visual Placeholder / Image Section */}
      <div className="w-full max-w-5xl h-60 rounded-2xl bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500 shadow-lg flex items-center justify-center text-white text-3xl font-bold mb-10">
        <Image 
          src="/images/children.png"
          alt="Placeholder image"
          width={40}
          height={40}
          className="object-contain"
        />
        <span>Image Placeholder <br /> hello
         </span>
      </div>

      {/* Category Buttons Grid */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-sky-600">
          Select Your Service
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link 
              key={service.category}
              href={{ pathname: "/form", query: { category: service.category } }}
            >
              <div className="w-full py-4 bg-white text-xl font-semibold rounded-xl shadow-lg hover:scale-105 transition duration-200 border-2 border-sky-300 cursor-pointer">
                <h3 className="text-sky-600 font-bold">{service.label}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
                {service.category === "Certificate" && <span>gggggggggggg</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}