
import SiteSetting from "./SiteSetting";
import SiteUnderMaintainence from "./SiteUnderMaintainence";
import DateAndTimeSetting from "./DateAndTimeSetting";
import GlobalData from "./GlobalData";


const GeneralSettings = () => {
 
  return (
    <>
      <div className="w-full h-auto">
      
          <hr />
          <div className='px-4 pt-4'>
            <div className="flex flex-col w-full gap-3 bg-white rounded-lg p-5">
            <div className='text-2xl font-bold'>
                       General Settings
                    </div>
           
          <div className="flex justify-between gap-4">
         
            <div className="flex flex-col gap-4 w-1/2">
            
              <div>
                <SiteSetting />
              </div>
              <div>
                <DateAndTimeSetting />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <div>
                <SiteUnderMaintainence />
              </div>
              <div>
                <GlobalData />
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
     
    </>
  );
};

export default GeneralSettings;
