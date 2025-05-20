import React, { ReactNode } from "react";




interface AuthLayoutProps {
  children: ReactNode;
}


const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="bg-red-50 w-[60%] flex justify-center items-center">
        <img src="https://www.lred.com/wp-content/uploads/2020/05/lred-main-logo-1823x654-1.png" alt="Background" height={500} width={500}  />
      </div>
      <div className="bg-red-100 w-[40%] flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
       
          <div className="bg-white rounded-lg p-4 shadow-md w-[30rem] border-2 border-red-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AuthLayout;



