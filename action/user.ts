/*"use server";

import { signIn } from "@/auth";
import connectMongo from "../../lib/mongoose";
import { User } from "../../models/User";
import { hash } from "bcrypt";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return "Please fill all fields.";
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      username,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause || "Invalid credentials.";
  }

  redirect("/");
};

const register = async (formData: FormData) => {
  const userName = formData.get("username") as string;
  const passWord = formData.get("password") as string;

  if (!userName || !passWord) {
    return "Please fill all fields.";
  }

  await connectMongo();

  const existingUser = await User.findOne({ userName });

  if (existingUser) {
    return "User already exists!";
  }

  const hashedPassword = await hash(passWord, 5);
  await User.create({ userName, passWord: hashedPassword });

  return "User created successfully!";
};

export { register, login };
*/

"use server";

import { signIn } from "@/app/auth";
import connectMongo from "../lib/mongoose";
import { Student } from "../models/student";
//import { hash } from "bcrypt";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

// extract username and pass from login form
const login = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return "Please fill all fields.";
  }
  // call nextauth sign in function
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      username,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause || "Invalid credentials.";
  }

  redirect("/");
};

const register = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const lastname = formData.get("lastname") as string;
  const tel = formData.get("tel") as string;
  const email = formData.get("email") as string;
  const pdf = "";
  const status = "pending";

  if (!name || !lastname || !tel || !email) {
    return "Please fill all fields.";
  }

  const usernameRegex = /^[A-Za-z]+$/; // only letters
  if (name.length < 3) {
    return "Username must be at least 3 characters long.";
  }
  if (!usernameRegex.test(name)) {
    return "Username can only contain letters.";
  }

  /*const passwordRegex = /[<>]/;
  if (passwordRegex.test(passWord)) {
    return "Password cannot contain '<' or '>' characters.";
  }

  if (passWord.length < 5) {
    return "Password must be at least 5 characters long.";
  }*/

  await connectMongo();

  const existingUser = await Student.findOne({ email });

  if (existingUser) {
    return "User already exists!";
  }

  //const hashedPassword = await hash(passWord, 5);

  await Student.create({ name, lastname, tel, email, pdf, status });
  redirect("/");
  return "User created successfully!";
};

export { register, login };
