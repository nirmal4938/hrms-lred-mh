import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field } from "formik";

const AddEmailTemplate = () => {
  const [text, setText] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "bullet" }],
      ["image", "link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "image",
    "link",
    "clean",
  ];

  return (
    <>
      <div className=" h-auto w-full ">
        <hr />
        <div className="px-4 pt-4">
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="text-2xl font-bold">Add Email Templates</div>
            <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-14 w-full h-auto">
              <Formik
                initialValues={{
                  emailKey: "",
                  templateName: "",
                  subject: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                <Form>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="emailKey" className="text-sm font-bold">
                          Email Key<span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="emailKey"
                          className="w-[35rem] border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="templateName"
                          className="text-sm font-bold"
                        >
                          Template Name<span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="templateName"
                          className="w-[35rem] border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="subject" className="text-sm font-bold">
                        Subject<span className="text-red-500">*</span>
                      </label>
                      <Field
                        type="text"
                        name="subject"
                        className="w-[35rem] border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1 h-52">
                      <label htmlFor="content" className="text-sm font-bold">
                        Content<span className="text-red-500">*</span>
                      </label>
                      <ReactQuill
                        className="h-48"
                        theme="snow"
                        value={text}
                        onChange={setText}
                        modules={modules}
                        formats={formats}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-14">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded"
                    >
                      Save Email Template{" "}
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmailTemplate;
