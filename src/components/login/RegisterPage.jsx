import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Corprate from "../Corprate";

export default function RegisterPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    otp: Yup.string().when("otpSent", {
      is: true,
      then: Yup.string().required("OTP is required"),
    }),
  });

  const checkEmailAndSendOtp = async (email) => {
    try {
      setServerError("");
      const res = await fetch(`http://localhost:5000/api/users/check-email?email=${email}`);
      const data = await res.json();
      if (data.exists) {
        throw new Error("Email already registered");
      }

      const otpRes = await fetch(`http://localhost:5000/api/users/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!otpRes.ok) throw new Error("Failed to send OTP");
      setOtpSent(true);
    } catch (err) {
      setServerError(err.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    setServerError("");
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
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
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
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
                  <div className="flex gap-2">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="input input-bordered w-full"
                    />
                    {!otpSent && (
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => checkEmailAndSendOtp(values.email)}
                      >
                        Send OTP
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
                  <label className="label" htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                  />
                  <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                </div>

                <div>
                  <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="input input-bordered w-full"
                  />
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
