import React from 'react';
import { Formik, Field, Form } from 'formik';

const EditSettings = () => {
    return (
        <Formik
            initialValues={{
                timezone: 'GMT',
                dateFormat: 'MM/DD/YYYY',
                timeFormat: '12-hour',
                currency: 'USD'
            }}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
        >
            <Form>
                <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-2">
                    <div className='text-xl font-bold'>
                        Settings
                    </div>
                    <div className='flex flex-wrap justify-between w-full'>
                    <div className="flex flex-col w-[16rem] gap-2">
                        <label htmlFor="timezone" className='text-sm font-bold'>Timezone</label>
                        <Field as="select" name="timezone" className="border border-gray-200 rounded px-2 py-1">
                            <option value="GMT">GMT</option>
                            <option value="UTC">UTC</option>
                            <option value="EST">EST</option>
                          
                        </Field>
                    </div>
                    <div className="flex flex-col w-[16rem] gap-2">
                        <label htmlFor="dateFormat" className='text-sm font-bold'>Date Format</label>
                        <Field as="select" name="dateFormat" className="border border-gray-200 rounded px-2 py-1">
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                         
                        </Field>
                    </div>
                    <div className="flex flex-col w-[16rem] gap-2">
                        <label htmlFor="timeFormat" className='text-sm font-bold'>Time Format</label>
                        <Field as="select" name="timeFormat" className="border border-gray-200 rounded px-2 py-1">
                            <option value="12-hour">12-hour</option>
                            <option value="24-hour">24-hour</option>
                          
                        </Field>
                    </div>
                    <div className="flex flex-col w-[16rem] gap-2">
                        <label htmlFor="currency" className='text-sm font-bold'>Currency</label>
                        <Field as="select" name="currency" className="border border-gray-200 rounded px-2 py-1">
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                          
                        </Field>
                    </div>
                    </div>
                </div>
              
            </Form>
        </Formik>
    );
};

export default EditSettings;
