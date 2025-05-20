import React from "react";
import { Formik, Field, Form } from "formik";
import {
  FaCodepen,
  FaFacebook,
  FaInstagram,
  FaSlack,
  FaTwitter,
} from "react-icons/fa";

const generateRandomUrl = () => {
  // Generate a random string for demonstration purposes
  return `https://example.com/${Math.random().toString(36).substring(7)}`;
};

const EditSocialInfo = () => {
  return (
    <Formik
      initialValues={{
        twitter: generateRandomUrl(),
        facebook: generateRandomUrl(),
        instagram: generateRandomUrl(),
        github: generateRandomUrl(),
        codepen: generateRandomUrl(),
        slack: generateRandomUrl(),
      }}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
    >
      <Form>
        <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-2">
          <div className="text-xl font-bold">Social Info</div>
          <div className="flex flex-wrap gap-6 w-full ">
            <div className="flex flex-col w-[22.5rem] gap-2">
              <label htmlFor="twitter" className="text-sm font-bold">
                {" "}
                <div className="flex gap-1 items-center">
                  <FaTwitter className=" text-blue-500" />
                  <div className="text-sm">Twitter</div>
                </div>
              </label>
              <Field
                type="text"
                name="twitter"
                className="border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col w-[22.5rem] gap-2">
              <label htmlFor="facebook" className="text-sm font-bold">
                {" "}
                <div className="flex items-center gap-1">
                  <FaFacebook className=" text-blue-500" />
                  <div className="text-sm">Facebook</div>
                </div>
              </label>
              <Field
                type="text"
                name="facebook"
                className="border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col w-[22.5rem] gap-2">
              <label htmlFor="instagram" className="text-sm font-bold">
                <div className="flex items-center gap-1">
                  <FaInstagram className=" text-pink-500" />
                  <div className="text-sm">Instagram</div>
                </div>
              </label>
              <Field
                type="text"
                name="instagram"
                className="border border-gray-200 rounded px-2 py-1"
              />
            </div>
        
            <div className="flex flex-col w-[22.5rem] gap-2">
              <label htmlFor="codepen" className="text-sm font-bold">
                {" "}
                <div className="flex items-center gap-1">
                  <FaCodepen className=" text-teal-500" />
                  <div className="text-sm">CodePen</div>
                </div>
              </label>
              <Field
                type="text"
                name="codepen"
                className="border border-gray-200 rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col w-[22.5rem] gap-2">
              <label htmlFor="slack" className="text-sm font-bold">
                <div className="flex items-center gap-1">
                  <FaSlack className=" text-red-500" />
                  <div className="text-sm">Slack</div>
                </div>
              </label>
              <Field
                type="text"
                name="slack"
                className="border border-gray-200 rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default EditSocialInfo;
