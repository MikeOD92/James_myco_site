import react, { useState, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const { data: session } = useSession();
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    /// this is the code the register a user save this for the time being
    //////////////////////////////////////////////////////////////
    // e.preventDefault();
    // const email = emailRef.current.value;
    // const password = passRef.current.value;
    // try {
    //   const reg = await fetch("/api/auth/register", {
    //     method: "POST",
    //     body: JSON.stringify({ email, password }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   const data = await reg;
    //   console.log(data);
    // } catch (err) {
    //   console.error(err);
    // }
  };
  return (
    <div>
      <h1> Admin Login </h1>
      <form onSubmit={handleSubmission}>
        <input type="email" ref={emailRef} />
        <input type="password" ref={passRef} />
        <button type="submit">Sign in </button>
      </form>
    </div>
  );
};

export default Login;
