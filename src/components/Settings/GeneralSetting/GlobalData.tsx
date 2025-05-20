import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TbCaretLeftRight } from "react-icons/tb";

const GlobalData = () => {
  return (
    <>
      <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <TbCaretLeftRight />
            <div className="font-bold">Global Meta Data</div>
          </div>
          <Formik
            initialValues={{ metaTitle: "", description: "", keywords: "" }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="metaTitle">Meta Title:</label>
                <Field
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  className="w-full border rounded-md py-2 pl-5 pr-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description">Description:</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={4}
                  className="w-full border rounded-md py-2 pl-5 pr-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="keywords">Keywords:</label>
                <Field
                  as="textarea"
                  id="keywords"
                  name="keywords"
                  rows={4}
                  className="w-full border rounded-md py-2 pl-5 pr-4 focus:outline-none focus:border-blue-500"
                />
              </div>
              <hr />
              <div className=" w-full flex justify-end">
                <button
                  type="submit"
                  className="flex bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default GlobalData;
