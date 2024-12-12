import { useState } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false); // To toggle between sign up and login
  const [forgotPassword, setForgotPassword] = useState(false); // For forgot password state
  const [emailError, setEmailError] = useState(""); // For email validation errors
  const [bio, setBio] = useState(""); // State for bio or additional text area
  const navigate=useNavigate();
  function isValidEmail(email) {
    // Simple regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function onLogin() {
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    setEmailError("");
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        alert("Login Successful!");
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.code === 'auth/user-not-found') {
          setEmailError("Email not registered.");
        } else {
          setEmailError("Login failed. Please try again.");
        }
      });
  }

  function onSignup() {
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    setEmailError("");
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        alert("Signup Successful!");
        navigate(`/profile/:${res.user.uid}`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.code === 'auth/email-already-in-use') {
          setEmailError("Email is already registered.");
        } else {
          setEmailError("Signup failed. Please try again.");
        }
      });
  }

  function onForgotPassword() {
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }
    setEmailError("");
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        alert("Password reset email sent!");
        setForgotPassword(false); // Optionally return to login/signup form
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.code === 'auth/user-not-found') {
          setEmailError("Email not registered.");
        } else {
          setEmailError("Failed to send reset email. Please try again.");
        }
      });
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍 {isSignup ? "Signup" : "Login"} Success

          </h2>
        ) : (
          <div className="w-80 flex flex-col gap-2 rounded-lg p-4">
            <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
              Welcome to FixYantra
            </h1>
            {forgotPassword ? (
              <>
                <label
                  htmlFor="email"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded mb-2" // Reduced margin-bottom
                />
                {emailError && (
                  <p className="text-red-500 text-center">{emailError}</p>
                )}
                <button
                  onClick={onForgotPassword}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <span>Loading...</span>}
                  <span>Send Password Reset Email</span>
                </button>
                <div className="text-white text-center mt-2">
                  <p>
                    Remembered your password?{" "}
                    <button
                      className="underline"
                      onClick={() => setForgotPassword(false)}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor="email"
                  className="font-bold text-xl text-white text-center"
                >
                  Enter your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded mb-2" // Reduced margin-bottom
                />
                {emailError && (
                  <p className="text-red-500 text-center">{emailError}</p>
                )}
                <label
                  htmlFor="password"
                  className="font-bold text-xl text-white text-center"
                >
                 
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded mb-2" // Reduced margin-bottom
                />
                {isSignup && (
                  <>
                    <label
                      htmlFor="bio"
                      className="font-bold text-xl text-white text-center"
                    >
                      Bio (optional)
                    </label>
                    <textarea
                      id="bio"
                      placeholder="Enter your bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2 rounded mb-2"
                    />
                  </>
                )}
                <button
                  onClick={isSignup ? onSignup : onLogin}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <span>Loading...</span>}
                  <span>{isSignup ? "Signup" : "Login"}</span>
                </button>

                {!isSignup && (
                  <div className="text-white text-center mt-2">
                    <p>
                      <button
                        className="underline"
                        onClick={() => setForgotPassword(true)}
                      >
                        Forgot Password?
                      </button>
                    </p>
                    <p>
                      Don't have an account?{" "}
                      <button
                        className="underline"
                        onClick={() => setIsSignup(true)}
                      >
                        Signup here
                      </button>
                    </p>
                  </div>
                )}
                {isSignup && (
                  <div className="text-white text-center mt-2">
                    <p>
                      Already have an account?{" "}
                      <button
                        className="underline"
                        onClick={() => setIsSignup(false)}
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
