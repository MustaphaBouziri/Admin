'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <footer className="w-full bg-black min-h-[500px] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          {/* Left group */}
          <div className="flex flex-wrap gap-4">
            <Link href="/">
              <button className="px-6 py-3 bg-[#FFF689] text-black font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Home
              </button>
            </Link>
            <Link href="/modir">
              <button className="px-6 py-3 bg-[#5998C5] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Director
              </button>
            </Link>
            <Link href="/scolarite">
              <button className="px-6 py-3 bg-[#EA7317] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Scolarite
              </button>
            </Link>
            <Link href="/student_dashbourd">
              <button className="px-6 py-3 bg-[#58355E] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Student Dashboard
              </button>
            </Link>
          </div>

          {/* Right group */}
          <div className="flex flex-wrap gap-4">
            <Link href="/changeInfo">
              <button className="px-6 py-3 bg-[#BC9CB0] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Change Info
              </button>
            </Link>
            <Link href="/register">
              <button className="px-6 py-3 bg-[#73BFB8] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Register
              </button>
            </Link>
            <Link href="/auth/signin">
              <button className="px-6 py-3 bg-[#183A37] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200">
                Sign In
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-[#B80C09] text-white font-medium rounded-xl shadow-md hover:opacity-90 transition transform duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
} 