
import { Formik, Form, Field } from "formik";
import { Checkbox } from "antd";


const AddRole = () => {


  return (
    <>
      <div className="h-auto w-full">
  
          <hr />
          <div className='px-4 pt-4'>
          <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
            <div className="text-2xl font-bold">Add Role</div>

            <Formik
              initialValues={{
                roleName: "",
                description: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
              }}
            >
              <Form className="flex flex-col gap-3">
                <div className="flex flex-col border border-gray-300 rounded-xl p-3 w-full h-auto gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="roleName" className="text-sm font-bold">
                      Role Name<span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="roleName"
                      className="border rounded-md py-2 pl-5 pr-5 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="text-sm font-bold">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      className="border rounded-md h-20 pl-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col border border-gray-300 rounded-xl p-3 w-full h-auto gap-3">
                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Admin User</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Delete
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Download
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Change Status admin user
                        </Checkbox>
                      </div>
                    </div>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Blog</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Delete
                        </Checkbox>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">FAQs</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Delete
                        </Checkbox>
                      </div>
                    </div>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Profile</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Read Profile
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit Profile
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create Profile
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Role</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Delete
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Change Permission
                        </Checkbox>
                      </div>
                    </div>
            
                  </div>
                  <div className="flex justify-between gap-5">
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Support</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Change Status
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Send Message
                        </Checkbox>
                      </div>
                    </div>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3  h-auto gap-2 w-1/2">
                      <div className="font-bold ">Blog</div>
                      <div className="flex gap-4 flex-wrap">
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Create
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Edit
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          View
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Delete
                        </Checkbox>
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Download
                        </Checkbox>{" "}
                        <Checkbox className="bg-blue-100 p-1 rounded-md text-blue-500">
                          Change Status user
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold h-10 px-4 rounded"
                    >
                      Cancel{" "}
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded"
                    >
                      Save Role{" "}
                    </button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        </div>
    
    </>
  );
};

export default AddRole;
