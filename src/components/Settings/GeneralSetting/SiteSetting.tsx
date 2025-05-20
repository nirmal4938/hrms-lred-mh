import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
const SiteSetting = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English(India)");

  const handleLanguageChange = (event: any) => {
    setSelectedLanguage(event.target.value);
  };

  const initialValues = {
    siteName: "",
    siteFavicon: "",
    siteLogoSmall: "",
    siteLogoLarge: "",
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <AiOutlineSetting />
          <div className="font-bold">Site Setting</div>
        </div>
        <div className="flex px-2 py-2 border border-r-2 border-gray-300 rounded">
          <div style={{ borderRight: "1px solid #ccc", paddingRight: "8px" }}>
            Lang
          </div>
          <select
            className="outline-none"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="English(India)">English(India)</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="w-full flex flex-col gap-3">
            <div >
              <label htmlFor="siteName" className="block font-medium">
                Site Name:
              </label>
              <Field
                type="text"
                id="siteName"
                name="siteName"
                className="w-full border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
              />
            </div>
           
              <div className="relative">
                <label htmlFor="siteFavicon" className="block font-medium">
                  Site Favicon:
                </label>
                <div className="relative">
                  <Field
                    type="text"
                    id="siteFavicon"
                    name="siteFavicon"
                    className="w-full border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bottom-0 h-full bg-blue-500 text-white px-2 flex items-center justify-center w-10"
                  >
                    <FaPlus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            
            <div >
                <img  className ="bg-blue-200 p-1.5" src="https://images.unsplash.com/photo-1504060765228-f97d1772ff9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={70} width={70}/>
            </div>

            <div className="relative">
              <label htmlFor="siteLogoSmall" className="block font-medium">
                Site Logo (small):
              </label>
              <div className="relative">
                <Field
                  type="text"
                  id="siteLogoSmall"
                  name="siteLogoSmall"
                  className="w-full border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bottom-0 h-full bg-blue-500 text-white px-2 flex items-center justify-center w-10"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div >
                <img  className ="bg-blue-200 p-1.5" src="https://images.unsplash.com/photo-1504060765228-f97d1772ff9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={70} width={70}/>
            </div>
            <div className=" relative">
              <label htmlFor="siteLogoLarge" className="block font-medium">
                Site Logo (Large):
              </label>
              <div className="relative">
                <Field
                  type="text"
                  id="siteLogoLarge"
                  name="siteLogoLarge"
                  className="w-full border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bottom-0 h-full bg-blue-500 text-white px-2 flex items-center justify-center w-10"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div >
                <img  className ="bg-blue-200 p-1.5" src="https://images.unsplash.com/photo-1504060765228-f97d1772ff9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={70} width={70}/>
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
  );
};

export default SiteSetting;
