'use client';

import { register } from "@/action/user";
import Image from 'next/image';
import styles from './styleregsign.module.css';

export default function Register() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const message = await register(formData);

    if (message) {
      alert(message);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Create Account</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="First Name"
          required
        />

        <input
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Last Name"
          required
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          id="tel"
          name="tel"
          type="tel"
          placeholder="Phone Number"
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
} 