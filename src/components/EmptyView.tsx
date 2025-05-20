import React from "react";

import image from "../assets/image.jpg";


const EmptyView=()  =>{

  return (
    <div className="w-[100%] flex  items-center flex-col justify-center">
        <img src="https://www.franticpro.com/resource/newHeader/images/backenddeveloperfrantic.png" alt="Background" className="w-[55%] h-[30rem] "/> 
        <div className="w-[40%] font-semibold text-5xl text-center mt-8 text-navy-blue">Coming Soon...</div>
    </div>
  )
}

export default EmptyView;
