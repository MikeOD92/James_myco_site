import react, { useRef } from "react";
import AnimationWrapper from "../../components/AnimationWrapper";
import hasToken from "../../utils/checkUser";
import { getSession, useSession } from "next-auth/react";

const Users = (props) => {
  const emailRef = useRef();
  const passRef = useRef();

  const { data } = useSession();
  // if (status === "authenticated") {
  //   console.log(data.user);
  // }

  const register = async (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value.toLowerCase(),
      password: "12345678",
    };
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data); //temp to check status
      // this should show some kind of accepted / created update if it is good to go
    } catch (err) {
      console.error(err);
    }
  };
  const editUser = async (e) => {
    e.preventDefault();
    const userData = {
      _id: data.user._id,
      password: passRef.current.value,
    };
    try {
      const response = await fetch("/api/auth/register", {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AnimationWrapper>
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-3 md:p-10 min-h-full">
        <div className="flex-col p-5 my-5 md:p-12 md:max-w-full md:m-auto shadow-xl rounded-2xl bg-zinc-800">
          <h1> Change password </h1>
          <form onSubmit={(e) => editUser(e)}>
            <input
              type="password"
              ref={passRef}
              className="m-5 p-3"
              placeholder="new password"
            />
            <br />
            <button type="submit" className="p-5 bg-green-600">
              Change Password
            </button>
          </form>
        </div>
        <div className="flex-col p-5 md:p-12 md:max-w-full md:m-auto shadow-xl rounded-2xl bg-zinc-800">
          <h1>Register New users</h1>
          <form onSubmit={(e) => register(e)}>
            <input
              type="email"
              ref={emailRef}
              className="m-5 p-3"
              placeholder="new user email"
            />
            <br />
            <p className="p-5">
              * New users will be given the password &apos;12345678&apos; and
              should change password on first login
            </p>
            <button type="submit" className="p-5 bg-green-600">
              Register New User{" "}
            </button>
          </form>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
export default Users;
