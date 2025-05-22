'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  const handleLogin = () => {
    router.push('/loginregister?view=login');
  };

  const handleRegister = () => {
    router.push('/loginregister?view=register');
  };

  return (
    <nav className="bg-gradient-to-r from-[#043873] to-[#021730] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              {!imageError ? (
                <Image
                  src="/images/yourdoclogo.png"
                  alt="Ya"
                  width={45}
                  height={45}
                  className="h-11 w-auto transition-transform duration-300 group-hover:scale-110"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="h-11 w-11 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-lg font-bold">YD</span>
                </div>
              )}
              <span className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">YourDoc</span>
            </Link>
          </div>

          {/* Middle Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === '/'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Home
            </Link>

            {status === 'authenticated' && session?.user?.email === 'admin@gmail.com' && (
              <>
                <Link
                  href="/modir"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === '/modir'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Director
                </Link>
                <Link
                  href="/scolarite"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === '/scolarite'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Scolarite
                </Link>
                <Link
                  href="/admin/students"
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === '/admin/students'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Students
                </Link>
              </>
            )}

            {status === 'authenticated' && session?.user?.email !== 'admin@gmail.com' && (
              <Link
                href="/student_dashbourd"
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === '/student_dashbourd'
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Student Dashboard
              </Link>
            )}
          </div>

          {/* Right side nav items */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {status === 'authenticated' ? (
              <div className="flex items-center space-x-4">
                <span className="text-white/90 text-sm font-medium">
                  Logged in as <span className="text-blue-300 font-semibold">{session?.user?.name}</span>
                </span>
                <Link
                  href="/changeInfo"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  Change Info
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleRegister}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-500/20 hover:bg-blue-500/30 transition-all duration-300"
                >
                  Register
                </button>
                <button
                  onClick={handleLogin}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-500/20 hover:bg-green-500/30 transition-all duration-300"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/50"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {status === 'authenticated' && (
            <div className="px-4 py-3 border-b border-white/10">
              <span className="text-white/90 text-sm">
                Logged in as <span className="text-blue-300 font-semibold">{session?.user?.name}</span>
              </span>
            </div>
          )}
          <Link
            href="/"
            className={`block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium ${
              pathname === '/'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            Home
          </Link>

          {status === 'authenticated' && session?.user?.email === 'admin@gmail.com' && (
            <>
              <Link
                href="/modir"
                className={`block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium ${
                  pathname === '/modir'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Director
              </Link>
              <Link
                href="/scolarite"
                className={`block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium ${
                  pathname === '/scolarite'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Scolarite
              </Link>
              <Link
                href="/admin/students"
                className={`block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium ${
                  pathname === '/admin/students'
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                Students
              </Link>
            </>
          )}

          {status === 'authenticated' && session?.user?.email !== 'admin@gmail.com' && (
            <Link
              href="/student_dashbourd"
              className={`block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium ${
                pathname === '/student_dashbourd'
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Student Dashboard
            </Link>
          )}

          {status === 'authenticated' ? (
            <>
              <Link
                href="/changeInfo"
                className="block pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                Change Info
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleRegister}
                className="block w-full text-left pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
              >
                Register
              </button>
              <button
                onClick={handleLogin}
                className="block w-full text-left pl-3 pr-4 py-3 rounded-lg mx-2 text-base font-medium text-green-400 hover:bg-green-500/20 hover:text-green-300"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 