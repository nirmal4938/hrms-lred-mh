import React from 'react';
import { Formik, Field, Form } from 'formik';

const EditInfo = () => {
    return (
        <Formik
            initialValues={{
                firstName: 'Admin',
                lastName: 'Admin',
                phoneNumber: '+91-1234567890',
                email: 'admin@gmail.com',
                role: ' Super Admin'
            }}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
        >
            <Form>
                <div className="flex flex-col border border-gray-300 rounded-xl p-3">
                    <div className='flex items-center gap-4 '>
                        <img
                            alt="admin"
                            className="rounded-md"
                            src="https://images.unsplash.com/photo-1668508119269-e8b6169c446a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            height={50}
                            width={80}
                        />
                        <div className='flex gap-3 flex-wrap w-full'>
                            <div className='flex justify-between w-full'>

                           
                            <div className="flex flex-col w-[20.5rem] gap-2">
                                <label htmlFor="firstName" className='text-sm font-bold'>First Name<span className='text-red-500'>*</span></label>
                                <Field type="text" name="firstName" className="border border-gray-200 rounded px-2 py-1" />
                            </div>
                            <div className="flex flex-col w-[20.5rem] gap-2">
                                <label htmlFor="lastName" className='text-sm font-bold'>Last Name<span className='text-red-500'>*</span></label>
                                <Field type="text" name="lastName" className="border border-gray-200 rounded px-2 py-1" />
                            </div>
                            <div className="flex flex-col w-[20.5rem] gap-2">
                                <label htmlFor="phoneNumber" className='text-sm font-bold'>Phone Number<span className='text-red-500'>*</span></label>
                                
                                    <Field type="text" name="phoneNumber" className="border border-gray-200 rounded px-2 py-1 " />
                              
                            </div>
                            </div>
                            <div className='flex gap-12'>

                            
                            <div className="flex flex-col w-[20.5rem] gap-2">
                                <label htmlFor="email" className='text-sm font-bold'>Email<span className='text-red-500'>*</span></label>
                                <Field type="email" name="email" className="border border-gray-200 rounded px-2 py-1" disabled />
                            </div>
                            <div className="flex flex-col w-[20.5rem] gap-2">
                                <label htmlFor="role" className='text-sm font-bold'>Role</label>
                                <Field type="text" name="role" className="border border-gray-200 rounded px-2 py-1" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default EditInfo;
