
import SdkDetails from './SdkDetails';
import SocialLinks from './SocialLinks';
const SocialMediaSettings = () => {
   
    return (
        <div className="w-full h-auto">
           
                <hr />
                <div className='px-4 pt-4'>

              
                <div className='px-4 flex flex-col bg-white rounded-lg p-4 gap-3'>
                  
                    <div className='text-2xl font-bold'>
                       Social Media Settings
                   
                    </div>
                <div className='flex gap-6 justify-between'>
                    <div className='w-1/2'>
                        <SdkDetails />
                    </div>
                    <div className='w-1/2'>
                        <SocialLinks />
                    </div>
                </div>
                </div>
                </div>
            </div>
    );
};

export default SocialMediaSettings;
