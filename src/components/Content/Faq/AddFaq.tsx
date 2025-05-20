import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { FaArrowLeft } from "react-icons/fa"; // Importing back icon
import { useNavigate } from "react-router-dom";
import config from '../../../config/config';

const AddFaq = () => {
  const [text, setText] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    // Update the fetchCategories function
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/faq-categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


  // Function to handle form submission
  // Update the handleSubmit function
  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${config.apiUrl}/api/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: values.question,
          category: values.category, // Ensure this is the category ID
          answer: text,
          status: values.status ? true : false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create FAQ");
      }

      setMessage("FAQ created successfully!");
    } catch (error) {
      console.error("Error creating FAQ:", error);
      setMessage("Failed to create FAQ");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="h-auto w-full">
      <div className="px-4 pt-4">
        <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
          {/* Back Button */}
          <button
            className="flex items-center text-blue-500 hover:text-blue-700 font-semibold"
            onClick={() => navigate(-1)} // Navigates back to the previous page
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <div className="text-2xl font-bold">Add FAQ</div>
          <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-14 w-full h-auto">
            <Formik initialValues={{ question: "", category: "", status: true }} onSubmit={handleSubmit}>
              {({ values, setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="flex flex-col gap-4">
                    {/* Question and Category Fields */}
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="question" className="text-sm font-bold">
                          Question<span className="text-red-500">*</span>
                        </label>
                        <Field
                          type="text"
                          name="question"
                          className="w-[35rem] border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="category" className="text-sm font-bold">
                          Category<span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="category"
                          className="w-[35rem] border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">Status</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={values.status}
                          onChange={() => setFieldValue("status", !values.status)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium">{values.status ? "Active" : "Inactive"}</span>
                      </label>
                    </div>

                    {/* Answer Field */}
<div className="flex flex-col gap-1 h-52">
  <label htmlFor="answer" className="text-sm font-bold">
    Answer<span className="text-red-500">*</span>
  </label>
  <textarea
    className="w-full p-2 border rounded-md resize-y min-h-[12rem]"
    value={text}
    onChange={(e) => setText(e.target.value)}
    wrap="soft"
  />
</div>

                  </div>

                  {/* Submit and Cancel Buttons */}
                  <div className="flex justify-end mt-14 gap-4">
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-600 text-white font-semibold h-10 px-4 rounded"
                      onClick={() => navigate(-1)} // Navigates back on cancel
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded disabled:opacity-50"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Saving..." : "Save FAQ"}
                    </button>
                  </div>

                  {/* Success/Error Message */}
                  {message && (
                    <div className={`mt-4 text-sm ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                      {message}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaq;
