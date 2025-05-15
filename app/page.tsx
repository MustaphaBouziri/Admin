import Link from "next/link";

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
        Image Placeholder
      </div>

      {/* Category Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-3xl">
        <Link href={{ pathname: "/form", query: { category: "Attestation" } }}>
          <button className="w-full py-4 bg-blue-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition duration-200">
            Attestation
          </button>
        </Link>
        <Link href={{ pathname: "/form", query: { category: "Certificate" } }}>
          <button className="w-full py-4 bg-green-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition duration-200">
            Certificate
          </button>
        </Link>
        <Link href={{ pathname: "/form", query: { category: "Presence" } }}>
          <button className="w-full py-4 bg-purple-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-purple-700 hover:scale-105 transition duration-200">
            Presence
          </button>
        </Link>
        <Link href={{ pathname: "/form", query: { category: "Quitness" } }}>
          <button className="w-full py-4 bg-orange-600 text-white text-xl font-semibold rounded-xl shadow-lg hover:bg-orange-700 hover:scale-105 transition duration-200">
            Quitness
          </button>
        </Link>
      </div>
    </div>
  );
}
