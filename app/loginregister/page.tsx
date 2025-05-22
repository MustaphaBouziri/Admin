'use client';

import Register from '../components/Register';
import SignIn from '../components/SignIn';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

export default function LoginRegister() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c4defd] flex items-center justify-center p-6" >

      <div  className={`bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] relative overflow-hidden w-[768px] max-w-full min-h-[480px] ${styles.container} ${isActive ? styles.active : ''}`}>

        {/* ------------------SIG IN---------------------------*/}
        <div 
        className={`absolute top-0 h-full transition-all duration-1000 ease-in-out left-0 w-1/2 z-[2] ${styles.signIn}`}>
          <SignIn />
        </div>

        {/* ----------------------REGISTER---------------------------*/}
        <div className={`absolute top-0 h-full transition-all duration-1000 ease-in-out left-0 w-1/2 opacity-0 z-[1] ${styles.signUp}`}>
          <Register />
        </div>




        {/* --------------------Toggle Container  -------------------------------*/}
        <div  className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-1000 ease-in-out rounded-[30px_0_0_30px] z-[1000] ${styles.toggleContainer}`}>
        
          <div className={`bg-gradient-to-r from-[#043873] to-[#021730] h-full relative -left-full h-full w-[200%] transform translate-x-0 transition-all duration-500 ease-in-out ${styles.toggle}`}>

            
            {/* Toggle Left Panel -------------------------------*/}
            <div className={`absolute w-1/2 h-full flex items-center justify-center flex-col p-[30px] text-center top-0 transform translate-x-0 transition-all duration-1000 ease-in-out ${styles.toggleLeft}`}>
              <h1 className="text-white text-2xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-white text-sm mb-6">Login Now</p>
              <button 
                onClick={() => setIsActive(false)}
                className="bg-transparent border border-white text-white px-[45px] py-[10px] rounded-lg text-xs font-semibold tracking-wider uppercase mt-2 cursor-pointer"
              >
                Log in
              </button>
            </div>

            {/* Toggle Right Panel -------------------------------*/}
            <div className={`absolute w-1/2 h-full flex items-center justify-center flex-col p-[30px] text-center top-0 right-0 transform translate-x-0 transition-all duration-1000 ease-in-out ${styles.toggleRight}`}>
              <h1 className="text-white text-2xl font-bold mb-4">Create Account</h1>
              <p className="text-white text-sm mb-6">first time<br/>you don't have an account?<br/>create one now</p>
              <button 
                onClick={() => setIsActive(true)}
                className="bg-transparent border border-white text-white px-[45px] py-[10px] rounded-lg text-xs font-semibold tracking-wider uppercase mt-2 cursor-pointer">
                create account
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 