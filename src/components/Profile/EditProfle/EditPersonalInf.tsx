import React from 'react';
import { Formik, Field, Form } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';

interface CustomDatePickerInputProps {
    value: any;
    onClick: () => void;
}

const CustomDatePickerInput: React.FC<CustomDatePickerInputProps> = ({ value, onClick }) => (
    <div className="relative">
        <input
            type="text"
            value={value}
            onClick={onClick}
            placeholder="Select Date"
            className="border border-gray-300 p-1 pl-5 rounded outline-none"
            readOnly
        />
        <div className="absolute top-0 right-0 h-full flex items-center px-2 pointer-events-none">
            <AiOutlineCalendar className="h-6 w-6 text-gray-400 cursor-pointer" onClick={onClick} />
        </div>
    </div>
);

const EditPersonalInf = () => {
    return (
        <Formik
            initialValues={{
                dateOfBirth: new Date(),
                gender: 'male',
                website: 'https://example.com',
                address: '123 Main St, City, Country'
            }}
            onSubmit={(values, actions) => {
                console.log(values);
            }}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-2">
                        <div className='text-xl font-bold'>
                            Personal Info
                        </div>
                         <div className='flex flex-wrap justify-between w-full'>
                        
                        <div className="flex flex-col w-[17rem] gap-2 relative">
                            <label htmlFor="dateOfBirth" className='text-sm font-bold'>Date of Birth</label>
                            <div className="flex items-center">
                                <DatePicker
                                    selected={values.dateOfBirth}
                                    onChange={(date) => setFieldValue('dateOfBirth', date)}
                                    className="border border-gray-200 rounded px-2 py-1 flex-1" 
                                    customInput={<CustomDatePickerInput value={values.dateOfBirth} onClick={() => {}} />}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-[17rem] gap-2">
                            <label className='text-sm font-bold'>Gender</label>
                            <div className="flex gap-4">
                                <label className='flex items-center gap-1'>
                                    <Field type="radio" name="gender" value="male" className="mt-0.5 text-sm font-bold" />
                                    Male
                                </label>
                                <label className='flex items-center gap-1'>
                                    <Field type="radio" name="gender" value="female" className="mt-0.5 text-sm font-bold" />
                                    Female
                                </label>
                                <label className='flex items-center gap-1'>
                                    <Field type="radio" name="gender" value="other" className="mt-0.5 text-sm font-bold" />
                                    Other
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col w-[17rem] gap-2">
                            <label htmlFor="website"  className='text-sm font-bold'>Website</label>
                            <Field type="text" name="website" className="border border-gray-200 rounded px-2 py-1" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address"className='text-sm font-bold'>Address</label>
                            <Field type="text" name="address" className="border border-gray-200 rounded px-2 py-1" />
                        </div>
                    </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EditPersonalInf;
