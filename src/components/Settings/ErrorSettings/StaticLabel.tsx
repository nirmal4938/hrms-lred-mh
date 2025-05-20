import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const StaticLabel = () => {
    type Language = 'Hindi' | 'Urdu' | 'French';

    const [selectedLanguage, setSelectedLanguage] = useState<Language>('Hindi');
    const [selectedRow, setSelectedRow] = useState<string | null>(null);

    const translations: Record<Language, { [key: string]: string }> = {
        Hindi: {
            FIRST_NAME: 'प्रथम नाम',
            LAB_KEY: 'लेबल कुंजी',
            PIN_CODE: 'पिन कोड',
            LAST_NAME: 'अंतिम नाम',
            TEST_LABEL1: 'टैगलाइन',
            TEST_KEY: 'परीक्षण कुंजी',
            FMLT_KEY: 'ईमेल',
            NEW_KEY: 'नया कुंजी',
        },
        Urdu: {
            FIRST_NAME: 'پہلا نام',
            LAB_KEY: 'لیبل کلید',
            PIN_CODE: 'پوسٹ کوڈ',
            LAST_NAME: 'آخری نام',
            TEST_LABEL1: 'ٹیگ لائن',
            TEST_KEY: 'ٹیسٹ کلید',
            FMLT_KEY: 'ای میل',
            NEW_KEY: 'نئی کلید',
        },
        French: {
            FIRST_NAME: 'Prénom',
            LAB_KEY: 'Clé d’étiquette',
            PIN_CODE: 'Code postal',
            LAST_NAME: 'Nom de famille',
            TEST_LABEL1: 'Slogan',
            TEST_KEY: 'Clé de test',
            FMLT_KEY: 'Email',
            NEW_KEY: 'Nouvelle clé',
        },
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value as Language);
    };

    const handleRowClick = (key: string) => {
        setSelectedRow(key);
    };

    const rows = [
        { key: 'FIRST_NAME', english: 'FirstName' },
        { key: 'LAB_KEY', english: 'label' },
        { key: 'PIN_CODE', english: 'pincode' },
        { key: 'LAST_NAME', english: 'test' },
        { key: 'TEST_LABEL1', english: 'Tagline' },
        { key: 'TEST_KEY', english: 'Test key' },
        { key: 'FMLT_KEY', english: 'email' },
        { key: 'NEW_KEY', english: 'hindi' },
    ];

    return (
        <>
            <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
                <div className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        <AiOutlinePlus className="mr-2" />
                        Add Static Label
                    </button>
                </div>
                <hr />
                <div className='flex justify-between items-center'>
                    <div className='font-bold w-[6rem]'>
                        Key
                    </div>
                    <div className='font-bold w-[23rem] items-start flex'>
                        English
                    </div>
                    <div>
                        <label htmlFor="language" className="block font-bold mb-1 w-[23rem] items-start">Select Language</label>
                        <select
                            id="language"
                            className="border border-gray-300 p-1 rounded outline-none w-full"
                            value={selectedLanguage}
                            onChange={handleLanguageChange}
                        >
                            <option value="Hindi">Hindi</option>
                            <option value="Urdu">Urdu</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                </div>
                <hr />
                {rows.map((row) => (
                    <>
                        <div
                            key={row.key}
                            className={`flex justify-between cursor-pointer items-center ${
                                selectedRow === row.key ? 'bg-gray-200' : ''
                            }`}
                            onClick={() => handleRowClick(row.key)}
                            style={{
                                height: selectedRow === row.key ? '3rem' : '2.5rem',
                                position: 'relative',
                            }}
                        >
                            {selectedRow === row.key && (
                                <div
                                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-500"
                                  
                                />
                            )}
                            <div className="w-[6rem] pl-2">
                                {row.key}
                            </div>
                            <div className='border border-gray-300 w-[23rem] rounded-lg p-1 pl-5 py-2 focus:outline-none focus:border-blue-500'>
                                {row.english}
                            </div>
                            <div className='border border-gray-300 w-[23rem] rounded-lg p-1 pl-5 py-2 focus:outline-none focus:border-blue-500'>
                                {translations[selectedLanguage][row.key]}
                            </div>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </>
    );
};

export default StaticLabel;