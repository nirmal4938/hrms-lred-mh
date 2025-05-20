import React, { useState } from "react";
import OtpInput from "react-otp-input";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";

const OtpVerify: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  const navigateToDashboard = () => {
    navigate("/bloglist");
  };


  const renderInput = (inputProps: React.InputHTMLAttributes<HTMLInputElement>, index: number) => {
    return (
      <input
        {...inputProps}
        key={index}
        className="border border-gray-300 h-10 rounded-md px-2 text-center"
        style={{ width: "40px" }}
      />
    );
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-2xl">OTP Verification !</div>
          <div className="font-semibold">
            Please enter the 6-digit OTP that you have received on your
            registered phone.
          </div>
        </div>
        <div>
          <OtpInput
            containerStyle={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            inputStyle={{
              display: "inline-flex",
              flex: 1,
            }}
            value={otp}
            onChange={(otp: string) => setOtp(otp)}
            numInputs={6}

            renderInput={renderInput}
          />
        </div>
        <div className="flex justify-between items-center">
          <div>
            Resend OTP in <span className="text-[#0070F4]">39</span> sec
          </div>
          <div className="flex self-end">
            <button
              type="button"
              className="bg-[#0070F4] text-white font-semibold px-4 py-2 rounded"
              onClick={navigateToDashboard}
            >
              Verify
            </button>
          </div>
        </div>
        <div className="flex self-center gap-1 font-bold">
          Back to
          <span
            onClick={handleLoginClick}
            className="text-[#0070F4] cursor-pointer font-bold"
          >
            Login
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default OtpVerify;
