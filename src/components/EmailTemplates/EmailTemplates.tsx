
import EmailTemplateTable from './Components/EmailTemplateTable';

const EmailTemplates = () => {

    return (
        <>
             <div className=" h-auto w-full">
            
                    <hr />
                    <div className='px-4 pt-4'>
                    <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
                    <div className='text-2xl font-bold'>
                        Email Templates
                    </div>
                    <EmailTemplateTable/>
                    </div>
                    </div>
                    </div>
            
        </>
    );
};

export default EmailTemplates;
