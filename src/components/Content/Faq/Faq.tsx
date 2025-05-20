
import FaqTable from './FaqTable';


const Faq = () => {

    return (
        <>
        <div className="w-full h-auto">
       
                    <hr />
                    <div className='px-4 pt-4'>
                    <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
                    <div className='text-2xl font-bold'>
                      Faq's
                    </div>
                   <FaqTable/>
                   </div>
                    </div>
                    </div>
                 
            
        </>
    );
};

export default Faq;
