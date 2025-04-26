import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
     <div className="flex gap-4">
        <Link href={"/register"}>
        <button className="bg-green-400 rounded-lg w-20 h-8 text-white mb-2 ">Register</button></Link>

        <Link href={"/modir"}>
        <button className="bg-blue-400 rounded-lg w-20 h-8 text-white mb-2 ">Director</button></Link>

        <Link href={"/scolarite"}>
        <button className="bg-red-400 rounded-lg w-20 h-8 text-white mb-2 ">Scolarite</button></Link>
      </div>
      
      <div className="w-full max-w-3xl h-64 bg-red-500 flex items-center justify-center text-white text-xl font-bold mb-6">
        Image will be here
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
        <Link href={{ pathname: "/form", query: { category: "Attestation" } }}>
          <button className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Attestation
          </button>
        </Link>

        <Link href={{ pathname: "/form", query: { category: "Certificate" } }}>
          <button className="w-full py-4 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Certificate
          </button>
        </Link>

        <Link href={{ pathname: "/form", query: { category: "Presence" } }}>
          <button className="w-full py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-700 transition">
            Presence
          </button>
        </Link>

        <Link href={{ pathname: "/form", query: { category: "Quitness" } }}>
          <button className="w-full py-4 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
            Quitness
          </button>
        </Link>
      </div>
    </div>
  );
}
