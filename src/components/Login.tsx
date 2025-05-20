import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineExclamationCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import AuthLayout from "../layouts/AuthLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../config/config";


const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [useEmail, setUseEmail] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const togglePasswordVisibility = () => setShowPassword(!showPassword);


  const validationSchema = Yup.object({
    identifier: Yup.string()
      .required("Email or Phone is required")
      .test("is-valid", "Phone number must be 10 digits only", function (value) {
        if (useEmail) return true;
        return /^\d{10}$/.test(value || "");
      }),
    password: Yup.string().required("Password is required"),
  });


  const handleSubmit = async (values: { identifier: string; password: string }, { setSubmitting }: any) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: useEmail ? values.identifier : undefined,
          phone: !useEmail ? values.identifier : undefined,
          password: values.password,
        }),
      });


      const data = await response.json();


      if (data.status === "success") {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <AuthLayout>
     
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-center text-red-600 mb-6">Admin LogIn</h2>


       


          <Formik
            initialValues={{ identifier: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col gap-5">
                {/* Identifier Field */}
                <div className="flex flex-col">
                  <label htmlFor="identifier" className="text-sm font-medium text-gray-700 mb-1">
                    {useEmail ? "Email ID" : "Phone Number"}
                  </label>
                  <Field
                    type={useEmail ? "email" : "tel"}
                    name="identifier"
                    inputMode={useEmail ? "email" : "numeric"}
                    maxLength={useEmail ? undefined : 10}
                    placeholder={useEmail ? "Enter your email" : "Enter your phone number"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (!useEmail && !/^\d*$/.test(e.target.value)) return;
                      setFieldValue("identifier", e.target.value);
                    }}
                  />
                  <ErrorMessage name="identifier" component="div" className="text-sm text-red-500 mt-1" />
                </div>


                {/* Password Field */}
                <div className="flex flex-col relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    Password <AiOutlineExclamationCircle className="text-gray-400" />
                  </label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                  <div
                    className="absolute right-3 top-10 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                </div>


                {/* Error Message */}
                {error && <div className="text-sm text-red-600">{error}</div>}


                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 rounded-lg shadow-md"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
     
    </AuthLayout>
  );
};


export default Login;
