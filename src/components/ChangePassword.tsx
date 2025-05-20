import React, { useState } from "react";
import { Modal } from "antd";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
const ChangePassword: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} title="Change Password">
      <div className="text-gray-400 mb-4">
        Please enter your current password and choose a new one.
      </div>
      <Formik
        initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("Form Submitted", values);
          setSubmitting(false);
          resetForm();
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <label className="font-semibold" htmlFor="currentPassword">
                  Current Password
                </label>
                <AiOutlineExclamationCircle size={20} />
              </div>
              <div className="relative">
                <Field
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  placeholder="Enter your current password" />
                <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {showCurrentPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <label className="font-semibold" htmlFor="newPassword">
                  New Password
                </label>
                <AiOutlineExclamationCircle size={20} />
              </div>
              <div className="relative">
                <Field
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  placeholder="Enter your new password" />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1 items-center">
                <label className="font-semibold" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <AiOutlineExclamationCircle size={20} />
              </div>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                  placeholder="Confirm your new password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
                disabled={isSubmitting}
              >
                Change Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ChangePassword;
