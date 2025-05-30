import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Corprate from "../Corprate";

export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
  });

  const handleSubmit = (values, actions) => {
    console.log("Login data:", values);
    actions.setSubmitting(false);
  };

  return (
    <Corprate>
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white dark:bg-neutral p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-brand">Login</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="label" htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
              </div>

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

              <div className="text-right text-sm">
                <a href="#" className="link link-hover text-brand">Forgot Password?</a>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <a href="/register" className="link link-hover text-brand">Sign up</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </Corprate>
  );
}
