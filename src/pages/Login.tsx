import { useState, FormEvent, useEffect } from "react";
import pinterestLogo from "../assets/pinterest-logo.png";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../app/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../Global";
import ErrorComp from "../component/ErrorComp";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    register,
    {
      isLoading: isLoadingRegister,
      isError: isErrorRegister,
      error: errorRegister,
    },
  ] = useRegisterMutation();

  const [
    login,
    { isLoading: isLoadingLogin, isError: isErrorLogin, error: errorLogin },
  ] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    if (!showLogin) {
      // register
      const result = await register(userData);
      if ("data" in result && result.data) {
        dispatch(setCredentials(result.data));
        navigate("/", { replace: true });
      }
    } else {
      // login
      const result = await login(userData);
      if ("data" in result && result.data) {
        dispatch(setCredentials(result.data));
        navigate("/", { replace: true });
      }
    }
  };

  useEffect(() => {
    if (isErrorRegister) {
      setErrorMessage((errorRegister as ErrorType)?.data?.message);
    } else if (isErrorLogin) {
      setErrorMessage((errorLogin as ErrorType)?.data?.message);
    }
  }, [isErrorRegister, isErrorLogin, errorLogin, errorRegister]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [username, email, password]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {/* container */}
      <div className="bg-white h-full md:h-fit py-8 p-4 w-full md:w-[28rem] flex flex-col justify-center items-center md:shadow-lg gap-5">
        <header className="flex flex-col items-center gap-2">
          <div className="w-12 h-12">
            <img
              src={pinterestLogo}
              alt="pinterest-logo"
              className="object-contain object-center"
            />
          </div>
          <h1 className="text-xl font-bold">Welcome to Pinterest</h1>
          {!showLogin && <p>Find new ideas to try</p>}
        </header>
        <main className="w-[90%] xs:w-[20rem] space-y-4">
          {/* if something error */}
          {errorMessage && <ErrorComp error={errorMessage} />}
          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            {!showLogin && (
              <div className="inputBlock">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="inputBlock">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputBlock">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {/* Action Buttons */}
            <div className="space-y-2 mt-2">
              <button
                className="actionBtn bg-redPin text-white hover:bg-redPin/80"
                type="submit"
              >
                {!isLoadingRegister && !isLoadingLogin && <p>Continue</p>}
                {(isLoadingRegister || isLoadingLogin) && (
                  <div className="spinner w-5 h-5"></div>
                )}
              </button>
              <p className="text-center">OR</p>
              <button
                type="button"
                className="actionBtn bg-blueFb hover:bg-blueFb/90 text-white"
              >
                Continue with Facebook
              </button>
              <button type="button" className="actionBtn border">
                Continue with Google
              </button>
            </div>
          </form>
        </main>
        <footer className="text-sm font-semibold">
          <p
            className="cursor-pointer"
            onClick={() => setShowLogin((prev) => !prev)}
          >
            {showLogin
              ? "Not on Pinterest yet? Sign up"
              : "Already a Member? Log in"}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
