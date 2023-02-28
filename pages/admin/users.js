import react, { useRef, useState } from "react";
import AnimationWrapper from "../../components/AnimationWrapper";
import hasToken from "../../utils/checkUser";
import { getSession, useSession } from "next-auth/react";

const Users = (props) => {
  const emailRef = useRef();
  const passRef = useRef();
  const confrimPass = useRef();
  const [passStatus, setPassStatus] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const { data } = useSession();

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
      if (response.status === 201) {
        setUserStatus(true);
        emailRef.current.value = "";
      } else {
        setUserStatus(false);
        emailRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };
  const editUser = async (e) => {
    e.preventDefault();

    if (passRef.current.value !== confrimPass.current.value) {
      setPassStatus(false);
    } else {
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
        if (response.status === 202) {
          setPassStatus(true);
          passRef.current.value = "";
          confrimPass.current.value = "";
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <AnimationWrapper>
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-3 md:p-10 min-h-full">
        <div className="flex-col p-5 my-5 md:p-12 md:max-w-full md:m-auto shadow-xl rounded-2xl bg-zinc-800">
          <h1> Change password </h1>
          <form onSubmit={(e) => editUser(e)} className="flex flex-col">
            <label className="text-white">New Password</label>
            <div className="flex flex-row">
              <input
                type="password"
                ref={passRef}
                className="m-5 p-3 w-2/3 md:w-1/4"
              />
              {passStatus === true ? (
                <>
                  <div className="p-5 bg-green-600 w-2 h-2 rounded-full"></div>
                  <p className="text-green-500 pl-5">password updated</p>
                </>
              ) : passStatus === false ? (
                <>
                  <div className="p-5 bg-red-500 w-2 h-2 rounded-full"></div>
                  <p className="text-red-500 pl-5">password does not match</p>
                </>
              ) : (
                ""
              )}
            </div>
            <label className="text-white">Confirm New Password</label>
            <input
              type="password"
              ref={confrimPass}
              className="m-5 p-3 w-2/3 md:w-1/4"
            />
            <br />
            <button type="submit" className="p-5 bg-green-600 w-1/2">
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
            {userStatus === true ? (
              <>
                <div className="p-5 bg-green-600 w-2 h-2 rounded-full"></div>
                <p className="text-green-500 pl-5">User created</p>
              </>
            ) : userStatus === false ? (
              <>
                <div className="p-5 bg-red-500 w-2 h-2 rounded-full"></div>
                <p className="text-red-500 pl-5">Error creating new user</p>
              </>
            ) : (
              ""
            )}
            <p className="p-5">
              * New users will be given the password &apos;12345678&apos; and
              should change password on first login
            </p>
            <button type="submit" className="p-5 bg-green-600 w-1/2">
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
