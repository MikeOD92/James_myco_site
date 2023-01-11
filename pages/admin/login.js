import react, { useEffect, useRef } from "react";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "../../components/Header";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      }
    });
  }, [router]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email: emailRef.current.value,
        password: passRef.current.value,
      });
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
      <Header />
      <div className="p-20">
        <h1> Admin Login </h1>
        <form onSubmit={handleSubmission}>
          <input type="email" ref={emailRef} className="m-5 p-3" />
          <br />
          <input type="password" ref={passRef} className="m-5 p-3" />
          <button type="submit">Sign in </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
