import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Corprate from "../Corprate";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("Customer");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    shopName: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    otp: Yup.string(), // manually checked in handleSubmit
    shopName: Yup.string(), // optional, shown conditionally
    mobileNumber:Yup.string().required("Mobile number  is required"),
  });

  const checkEmailAndSendOtp = async (email) => {
    try {
      setServerError("");
      const res = await fetch(`http://localhost:5000/api/auth/check-email?email=${email}`);
      const data = await res.json();
      if (data.exists) {
        throw new Error("Email already registered");
      }

      const otpRes = await fetch(`http://localhost:5000/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!otpRes.ok) throw new Error("Failed to send OTP");

      setOtpSent(true);
      setTimer(300);
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleResendOtp = async (email) => {
    try {
      setServerError("");
      const otpRes = await fetch(`http://localhost:5000/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!otpRes.ok) throw new Error("Failed to resend OTP");

      setTimer(300);
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    if (otpSent && !values.otp) {
      setServerError("OTP is required.");
      actions.setSubmitting(false);
      return;
    }

    const data = {
      name: values.fullName,
      email: values.email,
      password: values.password,
      otp: values.otp,
      userType: userType,
      mobileNumber: values.mobileNumber,
      ...(userType === "Professional" && { shopName: values.shopName }),
    };

    setServerError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Registration failed");
      alert("Registration successful!");
    } catch (err) {
      setServerError(err.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Corprate>
      <div className="min-h-screen flex items-center justify-center bg-base-200 py-20">
        <div className="bg-white dark:bg-neutral p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-brand">Register</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="label" htmlFor="fullName">Full Name</label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage name="fullName" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="label" htmlFor="email">Email</label>
                  <div className="flex gap-2 items-center">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                    />
                    {!otpSent ? (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => checkEmailAndSendOtp(values.email)}
                      >
                        Send OTP
                      </button>
                    ) : timer > 0 ? (
                      <span className="text-sm text-gray-500 w-24 text-right">
                        {formatTime(timer)}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => handleResendOtp(values.email)}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                {otpSent && (
                  <div>
                    <label className="label" htmlFor="otp">OTP</label>
                    <Field
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage name="otp" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                )}

                <div>
                  <label className="label" htmlFor="mobileNumber">Mobile Number</label>
                  <div className="relative">
                    <Field
                      type="number"
                      name="mobileNumber"
                      placeholder="Enter Mobile Number"
                      className="input input-bordered w-full pr-10"
                    />
                    
                  </div>
                  <ErrorMessage name="mobileNumber" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="label">Select User Type</label>
                  <select
                    className="select select-bordered w-full"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="Customer">Customer</option>
                    <option value="Professional">Professional</option>
                  </select>
                </div>

                {userType === "Professional" && (
                  <div>
                    <label className="label" htmlFor="shopName">Shop Name</label>
                    <Field
                      type="text"
                      name="shopName"
                      placeholder="Enter your shop name"
                      className="input input-bordered w-full"
                    />
                    <ErrorMessage name="shopName" component="div" className="text-sm text-red-500 mt-1" />
                  </div>
                )}

                <div>
                  <label className="label" htmlFor="password">Password</label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="input input-bordered w-full pr-10"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      className="input input-bordered w-full pr-10"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                {serverError && <div className="text-red-500 text-sm">{serverError}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="link link-hover text-brand">Login</a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Corprate>
  );
}
